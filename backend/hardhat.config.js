require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

const dotenv = require("dotenv");
dotenv.config();

function privateKey() {
  return process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];
}

module.exports = {
  defaultNetwork: "vanar_testnet",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai-pokt.nodies.app",
      accounts: privateKey(),
    },
    sepolia: {
      url: "https://eth-sepolia.public.blastapi.io",
      accounts: privateKey(),
    },
    arbitrum_sepolia: {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: privateKey(),
    },
    vanar_testnet: {
      url: "https://rpc-vanguard.vanarchain.com",
      accounts: privateKey(),
    },
    amoy: {
      url: "https://rpc.ankr.com/polygon_amoy",
      accounts: privateKey(),
    },
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};