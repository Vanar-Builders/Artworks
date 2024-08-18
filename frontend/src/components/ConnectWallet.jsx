import React, { useEffect, useState, createContext, useContext } from 'react';
import Web3 from 'web3';
import NFTMarketplaceABI from '../contracts/NftMarketplace.json';
import ArtworksRegistryABI from '../contracts/ArtworksRegistry.json';
import { useDispatch } from "react-redux";
import { changeAddress, removeAddress, changeName } from "../features/authentication";

// Create a context for Web3
const Web3Context = createContext();

// Custom hook to use the Web3 context
export const useWeb3 = () => useContext(Web3Context);

export function ConnectWallet({ children }) {
  const dispatch = useDispatch();
  const [web3js, setWeb3] = useState(null);
  const [signer, setSigner] = useState(null);
  const [artworksRegistryContract, setArtworksRegistryContract] = useState(null);
  const [marketplaceContract, setMarketplaceContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);

  const marketplaceAddress = import.meta.env.VITE_APP_MARKETPLACE_CONTRACT_ADDRESS;
  const RegistryAddress = import.meta.env.VITE_APP_REGISTRY_CONTRACT_ADDRESS;

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
        dispatch(changeAddress(account))
        const marketplaceContract = new web3js.eth.Contract(NFTMarketplaceABI.abi, marketplaceAddress);
        const registryContract = new web3js.eth.Contract(ArtworksRegistryABI.abi, RegistryAddress);
        const artistName = await registryContract.methods.getArtist(account).call();
        dispatch(changeName(artistName))
        setArtworksRegistryContract(registryContract);
        setMarketplaceContract(marketplaceContract);
        setAccount(account);
        setConnected(true);
        // Set default account 
        marketplaceContract.options.from = account;
        registryContract.options.from = account;
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
    dispatch(removeAddress())

    window.localStorage.removeItem('connectedAccount');
    window.localStorage.removeItem('walletConnected');
    window.location.reload();
  };

  return (
    <Web3Context.Provider value={{ web3js, account, disconnectWallet, connectWallet, connected, artworksRegistryContract, marketplaceContract }}>
      <div>
        {children}
      </div>
    </Web3Context.Provider>
  );
}
