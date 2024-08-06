// src/NavBar.js

import React, { useState } from 'react';
import WalletConnection from './WalletConnection';

const NavBar = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
  };

  const handleWalletDisconnect = () => {
    setIsWalletConnected(false);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.title}>My App</div>
      <div style={styles.buttons}>
        {isWalletConnected ? (
          <>
            <button style={styles.button}>Profile</button>
            <button style={styles.button}>Create</button>
          </>
        ) : (
          <WalletConnection
            onWalletConnect={handleWalletConnect}
            onWalletDisconnect={handleWalletDisconnect}
          />
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff'
  },
  title: {
    fontSize: '24px'
  },
  buttons: {
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    marginLeft: '10px',
    padding: '8px 16px',
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default NavBar;
