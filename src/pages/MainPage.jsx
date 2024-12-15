import { useState, useEffect } from "react";
import DollarCoin from "../assets/DollorIcon.png";
import Logo from "../assets/ClickDrinkLogoNew.png";
import Ellipse from "../assets/Ellipse.png";
import "./MainPage.css";
import Task from "../components/task/Task";
import axios from "axios";
// import { useTonConnectUI } from "@tonconnect/ui-react";

const MainPage = () => {
  const CLICKS_PER_DOLLAR = 4800;

  // State Variables
  const [count, setCount] = useState(6000);
  const [dollars, setDollars] = useState(1.25);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0); // State to store total users
  // const [tonWalletAddress, setTonWalletAddress] = useState(null);

  // const [tonConnectUI] = useTonConnectUI();

  // Fetch user data based on username
  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(
        `https://click-drink-back.onrender.com/api/clicks/getdata/${username}`
      );
      if (response.status === 200) {
        const { clicks, dollars } = response.data;
        setCount(clicks);
        setDollars(dollars);
        // setTonWalletAddress(tonWalletAddress)
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Save click data to backend
  const saveDataToBackend = async (clicks, dollars) => {
    try {
      const response = await axios.post(
        "https://click-drink-back.onrender.com/api/clicks/save",
        {
          username,
          clicks,
          dollars,
          // tonWalletAddress
        }
      );

      if (response.status === 200) {
        // console.log("User data updated successfully!");
      } else if (response.status === 201) {
        console.log("New user created!");
      }
    } catch (error) {
      console.error("Error sending data to backend", error);
    }
  };

  const getTotalNumberOfUsers = async () => {
    const url = "https://click-drink-back.onrender.com/api/clicks/getdata";

    try {
      const response = await axios.get(url);

      // Assuming response.data is an array of users
      if (response.data && Array.isArray(response.data)) {
        setTotalUsers(response.data.length); // Update state with total users
      } else {
        console.log("Unexpected data format:", response.data);
        setTotalUsers(0); // Reset to 0 if data format is unexpected
      }
    } catch (error) {
      console.error("An error occurred while fetching the user data:", error);
      setTotalUsers(0); // Reset to 0 in case of an error
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getTotalNumberOfUsers();
  }, [count]);

  // Handle wallet connection and disconnection
  // const handleWalletConnection = useCallback((address) => {
  //   setTonWalletAddress(address);
  //   console.log("Wallet connected successfully");
  // }, []);

  // const handleWalletDisconnection = useCallback(() => {
  //   setTonWalletAddress(null);
  //   console.log("Wallet disconnected successfully");
  // }, []);

  // // Check wallet connection and handle status changes
  // useEffect(() => {
  //   const checkWalletConnection = async () => {
  //     if (tonConnectUI.account?.address) {
  //       handleWalletConnection(tonConnectUI.account?.address);
  //     } else {
  //       handleWalletDisconnection();
  //     }
  //   };

  //   checkWalletConnection();

  //   const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
  //     if (wallet) {
  //       handleWalletConnection(wallet.account.address);
  //     } else {
  //       handleWalletDisconnection();
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  // // Wallet action handler
  // const handleWalletAction = async () => {
  //   if (tonConnectUI.connected) {
  //     await tonConnectUI.disconnect();
  //   } else {
  //     await tonConnectUI.openModal();
  //   }
  // };

  function triggerHapticFeedback() {
    // Method 1: Telegram WebApp Haptic Feedback
    // This checks if we're in Telegram's WebApp environment and uses their native haptic feedback
    if (
      window.Telegram &&
      window.Telegram.WebApp &&
      window.Telegram.WebApp.HapticFeedback
    ) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    // Method 2: Web Vibration API
    // This uses the standard web vibration API supported by most modern mobile browsers
    if ("vibrate" in navigator) {
      navigator.vibrate(50); // Vibrate for 50 milliseconds
    }

    // Method 3: Android Bridge
    // This checks for a custom Android bridge implementation
    // Useful when the app is wrapped in a WebView in an Android native app
    if (window.Android && typeof window.Android.vibrate === "function") {
      window.Android.vibrate(50);
    }
  }

  // Increment click count
  const countIncrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      const newDollars = (newCount / CLICKS_PER_DOLLAR).toFixed(2);
      saveDataToBackend(newCount, newDollars);
      return newCount;
    });

    setShowPlusOne(true);
    setTimeout(() => setShowPlusOne(false), 800);

    triggerHapticFeedback();
    // console.log("Heptic funv runs")
  };

  // Update count from task completion
  const updateCountFromTask = (bonus) => {
    setCount((prevCount) => {
      const newCount = prevCount + bonus;
      const newDollars = (newCount / CLICKS_PER_DOLLAR).toFixed(2);
      saveDataToBackend(newCount, newDollars);
      return newCount;
    });
  };

  // Handle username submission
  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    if (username) {
      setShowModal(false);
      saveDataToBackend(count, dollars);
    }
  };

  // Format wallet address
  // const formatAddress = (address) => {
  //   return `${address.slice(0, 4)}...${address.slice(-4)}`;
  // };

  // Fetch user data on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const usernameFromUrl = urlParams.get("username");

    if (usernameFromUrl) {
      setUsername(usernameFromUrl);
      setShowModal(false);
      fetchUserData(usernameFromUrl);
    }
  }, []);

  // Update dollars when count changes
  useEffect(() => {
    const newDollars = count / CLICKS_PER_DOLLAR;
    setDollars(newDollars.toFixed(2));
  }, [count]);

  // Copy wallet address to clipboard
  // const copyToClipboard = (text) => {
  //   navigator.clipboard
  //     .writeText(text)
  //     .then(() => {
  //       alert("Wallet address copied to clipboard!");
  //     })
  //     .catch((error) => {
  //       console.error("Failed to copy text: ", error);
  //     });
  // };
    
  
  // console.log(totalUsers)

  return (
    <div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-white">Enter your Telegram username</h2>
            <form onSubmit={handleUsernameSubmit}>
              <input
                type="text"
                className="mt-[1rem] p-[10px] rounded-lg border-2 border-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Telegram Username"
              />
              <button
                type="submit"
                className="mt-[1rem] bg-blue-500 text-white p-[10px] rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {!showModal && (
        <div className={`bg-Img w-full h-full py-[2rem]`}>
          {/* {tonWalletAddress ? (
            <div className="flex justify-center items-center gap-[20px] mt-[10px] mb-[20px]">
              <p
                onClick={() => copyToClipboard(tonWalletAddress)}
                className="cursor-pointer text-white"
              >
                Connected: {formatAddress(tonWalletAddress)}
              </p>
              <button onClick={handleWalletAction}>Disconnect</button>
            </div>
          ) : (
            <button
              onClick={handleWalletAction}
              className="flex mx-auto mt-[10px] mb-[20px] rounded-[20px]"
            >
              Connect wallet
            </button>
          )} */}

          <p className="text-white font-[700] mx-auto mb-[10px] w-fit">Total Active Users : {totalUsers}</p>

          <div className="flex flex-row justify-start gap-[10px] items-center bg-gradient-to-r from-customStart to-customEnd w-[90%] md:w-[40%] m-auto rounded-[24px] py-[24px] px-[48px]">
            <h2 className="text-[#FFFFFF] text-[32px] sm:text-[48px] font-bold leading-[52px]">
              {dollars}$
            </h2>
            <img
              src={DollarCoin}
              alt="Dollar Icon"
              className="w-[40px] h-[40px]"
            />
          </div>

          {username && (
            <p className="text-white font-sans font-[800] text-[26px] w-fit m-auto mt-[1rem]">
              Hello, {username}!
            </p>
          )}
          <div className="text-white text-[32px] leading-[35px] font-bold w-fit mx-auto mt-[4rem]">
            {count}
          </div>
          <div className="relative w-fit mx-auto mt-[2rem]">
            {showPlusOne && <div className="plus-one-animation">+1</div>}
            <img
              src={Logo}
              alt="Logo"
              className="animationEffect w-[184px] h-[184px]"
              onClick={countIncrement}
            />
            <img
              src={Ellipse}
              alt="Ellipse"
              className="w-[200px] h-[57px] absolute top-[150px]"
            />
          </div>
          <Task onTaskComplete={updateCountFromTask} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
