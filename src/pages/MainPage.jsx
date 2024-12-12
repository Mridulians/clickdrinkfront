import { useState, useEffect } from "react";
import DollarCoin from "../assets/DollorIcon.png";
import Logo from "../assets/ClickDrinkLogo.png";
import Ellipse from "../assets/Ellipse.png";
import "./MainPage.css";
import Task from "../components/task/Task";
import axios from "axios";

const MainPage = () => {
  // Constants
  const CLICKS_PER_DOLLAR = 4800;

  const [count, setCount] = useState(6000);
  const [dollars, setDollars] = useState(1.25);
  const [showPlusOne, setShowPlusOne] = useState(false);

  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(true); // Controls the popup visibility

  useEffect(() => {
    // Extract the username from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const usernameFromUrl = urlParams.get("username");

    if (usernameFromUrl) {
      setUsername(usernameFromUrl);  // If username is in the URL, set it
      setShowModal(false);  // Hide the popup if username exists in URL
    }
  }, []);

  // Update dollars whenever count changes
  useEffect(() => {
    const newDollars = count / CLICKS_PER_DOLLAR;
    setDollars(newDollars.toFixed(2)); // Keep dollars up to 2 decimal places
  }, [count]);

  const saveDataToBackend = async (clicks, dollars) => {
    try {
      await axios.post("http://localhost:4000/api/clicks/save", {
        clicks,
        dollars,
      });
      console.log("Data sent to backend successfully!");
    } catch (error) {
      console.error("Error sending data to backend", error);
    }
  };

  const countIncrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      const newDollars = (newCount / CLICKS_PER_DOLLAR).toFixed(2); // Calculate updated dollars

      // Send data to backend
      saveDataToBackend(newCount, newDollars);

      return newCount;
    });

    // Show the +1 animation
    setShowPlusOne(true);
    setTimeout(() => setShowPlusOne(false), 800); // Hide after animation duration
  };

  const updateCountFromTask = (bonus) => {
    setCount((prevCount) => {
      const newCount = prevCount + bonus;
      const newDollars = (newCount / CLICKS_PER_DOLLAR).toFixed(2); // Calculate updated dollars

      // Send data to backend
      saveDataToBackend(newCount, newDollars);

      return newCount;
    });
  };

  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    if (username) {
      setShowModal(false); // Hide modal after username is entered
    }
  };

  return (
    <div>
      {/* Modal for Username Input */}
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

      {/* Main Content */}
      {!showModal && (
        <div className={`bg-Img w-full h-full py-[4rem]`}>
          <div className="flex flex-row justify-start gap-[10px] items-center bg-gradient-to-r from-customStart to-customEnd w-[90%] md:w-[40%] m-auto rounded-[24px] py-[24px] px-[48px]">
            <h2 className="text-[#FFFFFF] text-[32px] sm:text-[48px] font-bold leading-[52px]">
              {dollars}$
            </h2>
            <img src={DollarCoin} alt="" className="w-[40px] h-[40px]" />
          </div>

          {/* Show username if available */}
          {username && (
            <p className="text-white font-sans font-bold text-[20px]">
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
              alt=""
              className="animationEffect w-[184px] h-[184px]"
              onClick={countIncrement}
            />
            <img
              src={Ellipse}
              alt=""
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
