import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { ReferralProvider } from "./context/Referral.jsx";
import StoreContextProvider from "./context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <StoreContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </StoreContextProvider>
);
