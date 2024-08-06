// src/WalletConnection.js

import React, { useState } from 'react';

const WalletConnection = ({ onWalletConnect, onWalletDisconnect }) => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // Simulate wallet connection
    setIsConnected(true);
    onWalletConnect();
  };

  const handleDisconnect = () => {
    // Simulate wallet disconnection
    setIsConnected(false);
    onWalletDisconnect();
  };

  return (
    <div>
      {isConnected ? (
        <button onClick={handleDisconnect}>Disconnect Wallet</button>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnection;
