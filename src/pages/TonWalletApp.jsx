import { useState } from "react";
import { TonConnect } from "@tonconnect/sdk";

const TonWalletApp = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletInfo, setWalletInfo] = useState(null);

  // Initialize TonConnect
  const tonConnect = new TonConnect();

  const connectWallet = async () => {
    try {
      // Open the TON Wallet Connect modal
      await tonConnect.connectWallet();

      // Wait for the user to approve the connection
      tonConnect.onStatusChange((wallet) => {
        if (wallet) {
          setWalletAddress(wallet.account.address);
          setWalletInfo(wallet);
        } else {
          console.error("No wallet connected.");
        }
      });
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
    }
  };

  const disconnectWallet = () => {
    tonConnect.disconnect(); // Disconnect the wallet session
    setWalletAddress(null);
    setWalletInfo(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>TON Wallet Integration</h1>
      {walletAddress ? (
        <div>
          <p><strong>Wallet Address:</strong> {walletAddress}</p>
          <p><strong>Wallet Info:</strong> {JSON.stringify(walletInfo, null, 2)}</p>
          <button
            onClick={disconnectWallet}
            style={{
              padding: "10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            padding: "10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Connect TON Wallet
        </button>
      )}
    </div>
  );
};

export default TonWalletApp;
