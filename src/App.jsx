import { useState } from "react";
import SplashScreen from "./components/Splash/SplashScreen";
import MainPage from "./pages/MainPage";

const App = () => {
  const [showMainPage, setShowMainPage] = useState(false);

  const handleButtonClick = () => {
    setShowMainPage(true); // Transition to the main page
  };

  return (
    <div>
      {showMainPage ? <MainPage /> : <SplashScreen onButtonClick={handleButtonClick} />}
    </div>
  );
};

export default App;













// 8121303592:AAHSDLvE1aODSy1f9IyzqhnvYa3Se9oCrmY