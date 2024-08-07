import React, { useEffect, useState, createContext, useContext } from 'react';
import Web3 from 'web3';
import NFTMarketplaceABI from '../contracts/NftMarketplace.json';
import ArtworksRegistryABI from '../contracts/ArtworksRegistry.json';

// Create a context for Web3
const Web3Context = createContext();

// Custom hook to use the Web3 context
export const useWeb3 = () => useContext(Web3Context);

export function ConnectWallet({ children }) {
  const [web3js, setWeb3] = useState(null);
  const [signer, setSigner] = useState(null);
  const [artworksRegistryContract, setArtworksRegistryContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [marketplaceContract, setMarketplaceContract] = useState(null);
  const [connected, setConnected] = useState(false);

  const marketplaceAddress = "0x675651F49D85d78cC45e2915bf7061C6f908Ef71";
  const RegistryAddress = "0xb3d3F57272F3bF36d12f632220b5fc37C526805F";

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const connectWallet = async () => {
    if (web3js) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3js.eth.getAccounts();
        const account = accounts[0];
        const currentChainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        if (currentChainId != 78600) {
          alert("Connect to Vanguard Testnet")
        }
        console.log(account);
        const marketplaceContract = new web3js.eth.Contract(NFTMarketplaceABI.abi, marketplaceAddress);
        const registryContract = new web3js.eth.Contract(ArtworksRegistryABI.abi, RegistryAddress);
        setArtworksRegistryContract(registryContract);
        setMarketplaceContract(marketplaceContract);
        setAccount(account);
        setConnected(true);
        // Set default account 
        marketplaceContract.options.from = account;
        artworksRegistryContract.options.from = account;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setMarketplaceContract(null);
    setArtworksRegistryContract(null);
    setConnected(false);
  };

  return (
    <Web3Context.Provider value={{ web3js, account, disconnectWallet, connectWallet, connected, artworksRegistryContract, marketplaceContract }}>
      <div>
        {children}
      </div>
    </Web3Context.Provider>
  );
};

// export default ConnectWallet;














//--------
// import React, { useEffect, useState, createContext, useContext } from 'react';
// import Web3 from 'web3';
// import nftABI from '../contracts/NftMarketplace.json'

// // Create a context for Web3
// const Web3Context = createContext();

// // Custom hook to use the Web3 context
// export const useWeb3 = () => useContext(Web3Context);

// export function ConnectWallet({ children }) {
//   const [web3, setWeb3] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const [nftcontract, setNftcontract] = useState(null);

//   useEffect(() => {
//     if (window.ethereum) {
//       const web3Instance = new Web3(window.ethereum);
//       setWeb3(web3Instance);
//     }
//   }, []);

//   const nftContractAddress = process.env.MARKETPLACE_CONTRACT_ADDRESS;


//   const connectWallet = async () => {
//       try {
//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         const accounts = await web3.eth.getAccounts();
//         const account = accounts[0];
//         const currentChainId = await window.ethereum.request({
//           method: 'eth_chainId',
//         });
//         if (currentChainId !== '0x66eee') { // '0x66eee' is the chain ID for Arbitrum Sepolia Testnet
//           alert("Connect to Arbitrum Sepolia Testnet");
//           return;
//         }
//         const instance = new web3.eth.Contract(nftABI.abi, nftContractAddress);
//         setNftcontract(instance);
//         console.log(account);
//         setAccount(account);
//         setConnected(true);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//   const disconnectWallet = () => {
//     setAccount(null);
//     setConnected(false);
//     setNftcontract(null);
//   };

//   return (
//     <Web3Context.Provider value={{ web3, account, disconnectWallet, connectWallet, connected, nftcontract }}>
//       <div>
//         {children}
//       </div>
//     </Web3Context.Provider>
//   );
// }

