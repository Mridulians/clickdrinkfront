/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const [referralCode, setReferralCode] = useState("");

  // Function to generate random referral codes
  const generateReferralCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setReferralCode(code); // Update the state with the new code
    console.log(code, "Generated Referral Code"); // Log the generated code
    return code; // Return the generated code
  };

  console.log(referralCode , "hello i am context")

const contextValue = {
    referralCode,
    generateReferralCode,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider