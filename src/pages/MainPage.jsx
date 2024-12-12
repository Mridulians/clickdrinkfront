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

  const [count, setCount] = useState(0);
  const [dollars, setDollars] = useState(0);
  const [showPlusOne, setShowPlusOne] = useState(false);

  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const usernameFromUrl = urlParams.get("username");

    if (usernameFromUrl) {
      setUsername(usernameFromUrl);
      setShowModal(false);
      fetchUserData(usernameFromUrl);
    }
  }, []);

  useEffect(() => {
    const newDollars = count / CLICKS_PER_DOLLAR;
    setDollars(newDollars.toFixed(2));
  }, [count]);

  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(
        `https://click-drink-back.onrender.com/api/clicks/getdata/${username}`
      );
      if (response.status === 200) {
        const { clicks, dollars } = response.data;
        setCount(clicks);
        setDollars(dollars);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const saveDataToBackend = async (clicks, dollars) => {
    try {
      const response = await axios.post(
        "https://click-drink-back.onrender.com/api/clicks/save",
        {
          username,
          clicks,
          dollars,
        }
      );

      if (response.status === 200) {
        console.log("User data updated successfully!");
      } else if (response.status === 201) {
        console.log("New user created!");
      }
    } catch (error) {
      console.error("Error sending data to backend", error);
    }
  };

  const countIncrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      const newDollars = (newCount / CLICKS_PER_DOLLAR).toFixed(2);
      saveDataToBackend(newCount, newDollars);
      return newCount;
    });

    setShowPlusOne(true);
    setTimeout(() => setShowPlusOne(false), 800);
  };

  const updateCountFromTask = (bonus) => {
    setCount((prevCount) => {
      const newCount = prevCount + bonus;
      const newDollars = (newCount / CLICKS_PER_DOLLAR).toFixed(2);
      saveDataToBackend(newCount, newDollars);
      return newCount;
    });
  };

  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    if (username) {
      setShowModal(false);
      saveDataToBackend(count, dollars);
    }
  };

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
        <div className={`bg-Img w-full h-full py-[4rem]`}>
          <div className="flex flex-row justify-start gap-[10px] items-center bg-gradient-to-r from-customStart to-customEnd w-[90%] md:w-[40%] m-auto rounded-[24px] py-[24px] px-[48px]">
            <h2 className="text-[#FFFFFF] text-[32px] sm:text-[48px] font-bold leading-[52px]">
              {dollars}$
            </h2>
            <img src={DollarCoin} alt="" className="w-[40px] h-[40px]" />
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
