/* eslint-disable react/prop-types */
import "./Task.css";
import Friends from "../../assets/shareWithFriends.png";
import Twitter from "../../assets/TwitterDrink.png";
import Insta from "../../assets/InstagramDrink.png";
import LinkedIn from "../../assets/LinkedinDrink.png";
import Telegram from '../../assets/TwiiterIcon.png'
import Plus from "../../assets/PlusDrink.png";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Share from "../Share/Share";

const Task = ({ onTaskComplete }) => {
  const [taskStatus, setTaskStatus] = useState({
    friends: { isLoading: false, completed: false },
    twitter: { isLoading: false, completed: false },
    instagram: { isLoading: false, completed: false },
    linkedin: { isLoading: false, completed: false },
    telegram: { isLoading: false, completed: false },
    isModalOpen: false, // Added for share popup
  });

  const handleAddClick = (taskKey, reward) => {
    if (taskStatus[taskKey].completed) return; // If task is already completed, do nothing.

    if (taskKey === "friends") {
      // Open share modal for "Share with Friends"
      setTaskStatus((prev) => ({ ...prev, isModalOpen: true}));
      return;
    }

    // Show loader
    setTaskStatus((prev) => ({
      ...prev,
      [taskKey]: { ...prev[taskKey], isLoading: true },
    }));

    // Simulate loader delay
    setTimeout(() => {
      setTaskStatus((prev) => ({
        ...prev,
        [taskKey]: { isLoading: false, completed: true },
      }));
      onTaskComplete(reward); // Update the clicks count in the main page
    }, 4000);
  };

   // Handle modal close and task completion for 'Share with Friends'
   const handleModalClose = () => {
    setTaskStatus((prev) => ({
      ...prev,
      isModalOpen: false,
      friends: { ...prev.friends, completed: true }, // Mark as completed
    }));
    onTaskComplete(8000); // Add 8000 points for the 'Share with Friends' task
  };

  return (
    <div className="flex flex-col gap-[10px] mt-[4rem]">
      {/* Share with friends */}
      <div className="tasks w-[90%] md:w-[40%] m-auto h-[100px] py-[24px] px-[32px] rounded-[8px] flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-[10px]">
          <img src={Friends} alt="" className="w-[40px] h-[40px]" />
          <div>
            <p className="text-[20px] text-[#FEEFE6] leading-[24px]">
              Share with friends
            </p>
            <p className="text-[16px] leading-[24px] text-[#FCF0E9] opacity-[0.6]">
              +8000 CD&apos;s
            </p>
          </div>
        </div>
        {taskStatus.friends.completed ? (
          <FaCheckCircle className="text-green-500 w-[32px] h-[32px]" />
        ) : (
          <img
            src={Plus}
            alt=""
            className="w-[32px] h-[32px] cursor-pointer"
            onClick={() => handleAddClick("friends", 8000)}
          />
        )}
      </div>

      {/* Follow on Twitter */}
      <div className="tasks w-[90%] md:w-[40%] m-auto h-[100px] py-[24px] px-[32px] rounded-[8px] flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-[10px]">
          <img src={Twitter} alt="" className="w-[40px] h-[40px]" />
          <div>
            <p className="text-[20px] text-[#FEEFE6] leading-[24px]">
              Follow ClickDrink on Twitter.
            </p>
            <p className="text-[16px] leading-[24px] text-[#FCF0E9] opacity-[0.6]">
              +5000 CD&apos;s
            </p>
          </div>
        </div>
        {taskStatus.twitter.completed ? (
          <FaCheckCircle className="text-green-500 w-[32px] h-[32px]" />
        ) : (
          <a
            href="https://x.com/Clickdrinkworld"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[32px] h-[32px]"
          >
            <img
              src={Plus}
              alt=""
              onClick={() => handleAddClick("twitter", 5000)}
            />
          </a>
        )}
      </div>

      {/* Instagram Task */}
      <div className="tasks w-[90%] md:w-[40%] m-auto h-[100px] py-[24px] px-[32px] rounded-[8px] flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-[10px]">
          <img src={Insta} alt="" className="w-[40px] h-[40px]" />
          <div>
            <p className="text-[20px] text-[#FEEFE6] leading-[24px]">
              Follow ClickDrink on Instagram.
            </p>
            <p className="text-[16px] leading-[24px] text-[#FCF0E9] opacity-[0.6]">
              +4000 CD&apos;s
            </p>
          </div>
        </div>
        {taskStatus.instagram.completed ? (
          <FaCheckCircle className="text-green-500 w-[32px] h-[32px]" />
        ) : (
          <a
            href="https://www.instagram.com/clickdrinkworld/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[32px] h-[32px]"
          >
            <img
              src={Plus}
              alt=""
              onClick={() => handleAddClick("instagram", 4000)}
            />
          </a>
        )}
      </div>

       {/* Telegram Task */}
       <div className="tasks w-[90%] md:w-[40%] m-auto h-[100px] py-[24px] px-[32px] rounded-[8px] flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-[10px]">
          <img src={Telegram} alt="" className="w-[40px] h-[40px]" />
          <div>
            <p className="text-[20px] text-[#FEEFE6] leading-[24px]">
              Follow ClickDrink on Telegram.
            </p>
            <p className="text-[16px] leading-[24px] text-[#FCF0E9] opacity-[0.6]">
              +4000 CD&apos;s
            </p>
          </div>
        </div>
        {taskStatus.telegram.completed ? (
          <FaCheckCircle className="text-green-500 w-[32px] h-[32px]" />
        ) : (
          <a
            href="https://t.me/clickdrink"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[32px] h-[32px]"
          >
            <img
              src={Plus}
              alt=""
              onClick={() => handleAddClick("telegram", 4000)}
            />
          </a>
        )}
      </div>

      {/* LinkedIn Task */}
      <div className="tasks w-[90%] md:w-[40%] m-auto h-[100px] py-[24px] px-[32px] rounded-[8px] flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-[10px]">
          <img src={LinkedIn} alt="" className="w-[40px] h-[40px]" />
          <div>
            <p className="text-[20px] text-[#FEEFE6] leading-[24px]">
              Follow ClickDrink on LinkedIn.
            </p>
            <p className="text-[16px] leading-[24px] text-[#FCF0E9] opacity-[0.6]">
              +4000 CD&apos;s
            </p>
          </div>
        </div>
        {taskStatus.linkedin.completed ? (
          <FaCheckCircle className="text-green-500 w-[32px] h-[32px]" />
        ) : (
          <a
            href="https://www.linkedin.com/company/click-drink/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[32px] h-[32px]"
          >
            <img
              src={Plus}
              alt=""
              onClick={() => handleAddClick("linkedin", 4000)}
            />
          </a>
        )}
      </div>

      {/* Modal for Sharing */}
      {taskStatus.isModalOpen && (
        <Share
          isOpen={taskStatus.isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Task;
