/* eslint-disable react/prop-types */
// components/SplashScreen.js
// import React from "react";
import './Splash.css'
import SplashLogo from '../../assets/LogoForSpalsh.png'

const SplashScreen = ({ onButtonClick }) => {
  return (
    <div
      className="bg_img h-screen flex flex-col justify-center items-center bg-cover bg-center text-white"
    >
      
      <img src={SplashLogo} alt="" className='w-[300px]'/>
      <p className="mt-4 text-lg">Click Drink: One tap, Endless Cheers.</p>
      <button
        onClick={onButtonClick}
        className="mt-6 px-6 py-3 rounded-[10px] bg-orange-500 text-white font-bold hover:bg-orange-600 text-[20px]"
      >
        Get a Free Drink
      </button>
    </div>
  );
};

export default SplashScreen;
