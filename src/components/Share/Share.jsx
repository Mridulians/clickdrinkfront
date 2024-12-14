/* eslint-disable react/prop-types */
// import React from 'react'

import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaFacebook, FaRegCopy } from "react-icons/fa";

const Share = ({ isOpen, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);
  const shareLink = "https://t.me/ClickDrinkBot"; // Replace with your app's actual URL

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset the message after 2 seconds
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-[#2B2B2F] w-[90%] md:w-[40%] rounded-lg p-6 relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold bg-transparent"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">
          Share with Friends
        </h2>

        {/* Share Options */}
        <div className="flex flex-col gap-5">
          {/* WhatsApp */}
          <a
            href="https://wa.me/?text=Check%20out%20this%20awesome%20app!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#25D366] text-white py-3 px-4 rounded-lg hover:bg-[#1EBB50] transition-all"
          >
            <FaWhatsapp size={24} />
            <span className="text-lg font-medium">Share on WhatsApp</span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-3 px-4 rounded-lg hover:opacity-90 transition-all"
          >
            <FaInstagram size={24} />
            <span className="text-lg font-medium">Share on Instagram</span>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#1877F2] text-white py-3 px-4 rounded-lg hover:bg-[#145DBE] transition-all"
          >
            <FaFacebook size={24} />
            <span className="text-lg font-medium">Share on Facebook</span>
          </a>
        </div>

        {/* Copy Link */}
        <div className="flex items-center justify-between gap-4 mt-6 p-4 bg-[#3B3B40] rounded-lg">
          <div className="text-white text-lg">Copy the App Link:</div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          >
            <FaRegCopy size={18} />
            <span>Copy Link</span>
          </button>
        </div>
        {isCopied && (
          <p className="mt-2 text-green-400 text-sm text-center">
            Link copied to clipboard!
          </p>
        )}
      </div>
    </div>
  );
};

export default Share;
