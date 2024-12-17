import { useState } from "react";
import SplashScreen from "./components/Splash/SplashScreen";
import MainPage from "./pages/MainPage";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
// import './App.css'

const App = () => {
  const [showMainPage, setShowMainPage] = useState(false);

  const handleButtonClick = () => {
    setShowMainPage(true); // Transition to the main page
  };

  return (
    <TonConnectUIProvider
      manifestUrl="https://click-drink-front.netlify.app/manifest.json"
      uiPreferences={{ theme: THEME.DARK }}
      // walletsListConfiguration={{
      //   includeWallets: [
      //     {
      //       appName: "telegram-wallet",
      //       name: "Wallet",
      //       imageUrl: "https://wallet.tg/images/logo-288.png",
      //       aboutUrl: "https://wallet.tg/",
      //       universalLink: "https://t.me/wallet?attach=wallet",
      //       bridgeUrl: "https://bridge.ton.space/bridge",
      //       platforms: ["ios", "android", "macos", "windows", "linux"],
      //     },
      //   ],
      // }}
    >
      <div>
        {showMainPage ? (
          <MainPage />
        ) : (
          <SplashScreen onButtonClick={handleButtonClick} />
        )}
      </div>
    </TonConnectUIProvider>
  );
};

export default App;
