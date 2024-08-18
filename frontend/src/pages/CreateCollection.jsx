import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useIPFS } from "../components/UploadIPFS";
import { useSelector } from "react-redux";
import Web3 from 'web3';
import NFTMarketplaceABI from '../contracts/NftMarketplace.json';

export const CreateCollection = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selected, setSelected] = useState(1);
    const address = useSelector(state => state.auth.address);
    const marketplaceAddress = import.meta.env.VITE_APP_MARKETPLACE_CONTRACT_ADDRESS

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [symbol, setSymbol] = useState("");
    const [description, setDescription] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [web3js, setWeb3] = useState(null);

    const { uploadToIPFS, createFolder } = useIPFS();

    useEffect(() => {
        if (!address) {
            navigate('/'); // Redirect to connection page if not connected
        }
    }, [address]);

    const handleDivClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleDivClick1 = () => {
        document.getElementById('fileInput1').click();
    };

    const handleDivClick2 = () => {
        document.getElementById('fileInput2').click();
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileChange1 = (event) => {
        setSelectedFile1(event.target.files[0]);
    };

    const handleFileChange2 = (event) => {
        setSelectedFile2(event.target.files[0]);
    };

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
        }
    }, []);

    const handleSubmit = async () => {
        const marketplaceContract = new web3js.eth.Contract(NFTMarketplaceABI.abi, marketplaceAddress);
        if (!address || !marketplaceContract) {
            alert("Please connect your wallet first.");
            return;
        }

        const folderName = `${title}_${Date.now()}`;
        const folderCID = await createFolder(folderName);
        const folderUri = `ipfs://${folderCID}`;

        await uploadToIPFS(selectedFile, folderName, 'logo');
        await uploadToIPFS(selectedFile1, folderName, 'featured');
        await uploadToIPFS(selectedFile2, folderName, 'banner');

        setIsProcessing(true);

        try {
            const isERC721 = selected === 1;
            const gasPrice = await web3js.eth.getGasPrice();
            const gasEstimate = await marketplaceContract.methods.createCollection(
                title,
                symbol,
                folderUri,
                title,
                isERC721
            ).estimateGas({ from: address });
            
            const result = await marketplaceContract.methods.createCollection(
                title,
                symbol,
                folderUri,
                title,
                isERC721
            ).send({
                from: address,
                gas: gasEstimate,
                gasPrice: gasPrice
            });

            console.log("Collection created, transaction hash:", result.transactionHash);
            alert("Collection created successfully!");
        } catch (error) {
            console.error("Error creating collection:", error.message, error.stack);
            alert("Error creating collection. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-[linear-gradient(0deg,#1E1E1E_70%,#282637_100%,#282637_100%)] pb-20">
            <div className="md:mx-10 md:pt-7">
                <h1 className="text-3xl md:text-5xl font-bold text-white font-sans">Create New Collection
                </h1>
                <div className="flex w-full gap-10 mt-10">
                    <div className="w-full">
                        <div className="flex flex-wrap justify-center w-full">
                            <div className="max-w-[400px] w-full">
                                <h1 className="text-white font-bold text-lg font-sans">Logo Image*</h1>
                                <div>
                                    <div
                                        className="flex-1 bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] shadow-2xl rounded-2xl h-[400px] w-full flex flex-col justify-center items-center cursor-pointer hover:opacity-65 mt-2"
                                        onClick={handleDivClick}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="53" viewBox="0 0 56 53" fill="none">
                                            <path d="M56 42.7177V47.0079C56 50.368 52.7975 53 48.7091 53H7.29069C3.20232 53 0 50.368 0 47.0079V42.7177C0 41.3411 1.11129 40.225 2.48185 40.225C3.85263 40.225 4.96392 41.3411 4.96392 42.7177V47.0079C4.96392 47.2507 5.81466 48.0148 7.29069 48.0148H48.7091C50.1853 48.0148 51.0361 47.2507 51.0361 47.0079V42.7177C51.0361 41.3411 52.1474 40.225 53.5179 40.225C54.8887 40.225 56 41.3411 56 42.7177ZM17.8752 17.0744L25.518 8.82873V40.2649C25.518 41.6414 26.6293 42.7575 27.9999 42.7575C29.3707 42.7575 30.482 41.6414 30.482 40.2649V8.82884L38.1243 17.0744C38.6131 17.602 39.2765 17.8688 39.9415 17.8688C40.5469 17.8688 41.1538 17.6476 41.6319 17.2006C42.6354 16.2628 42.6917 14.6855 41.7577 13.6781L29.8167 0.794499C29.8071 0.784241 29.7951 0.777205 29.7855 0.767108C29.7117 0.690145 29.6289 0.623762 29.5459 0.556842C29.5001 0.519945 29.4584 0.477946 29.4105 0.444539C29.3112 0.375632 29.2034 0.320098 29.0947 0.266014C29.0562 0.246894 29.0209 0.221384 28.9813 0.204252C28.8451 0.145227 28.7013 0.101239 28.5537 0.0673495C28.5377 0.0636436 28.5229 0.0560721 28.5069 0.0526885C28.343 0.0185304 28.1738 0 27.9999 0C27.8262 0 27.6568 0.0185834 27.4931 0.0527414C27.4784 0.0558028 27.4649 0.0627317 27.4503 0.0660615C27.3012 0.100112 27.1562 0.144688 27.0184 0.204358C26.9799 0.221061 26.9457 0.245981 26.9081 0.264564C26.7981 0.319023 26.6894 0.375095 26.5895 0.444592C26.5416 0.477837 26.5001 0.519783 26.4546 0.556519C26.3714 0.623546 26.2886 0.689928 26.2148 0.766945C26.2049 0.777096 26.1929 0.784187 26.1833 0.794499L14.2421 13.6781C13.3079 14.6855 13.3642 16.2628 14.3679 17.2006C15.3709 18.1384 16.9419 18.0821 17.8752 17.0744Z" fill="#727273"></path>
                                        </svg>
                                        <div className="text-md mt-3 text-white">PNG, JPG </div>
                                        {selectedFile && <div className="text-md mt-3 text-white">Selected File: {selectedFile.name}</div>}
                                    </div>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                            <div className="max-w-[400px] md:max-w-[600px] mt-5 md:mt-0 md:ml-4 w-full">
                                <h1 className="text-white font-bold text-lg font-sans">Featured Image</h1>
                                <div>
                                    <div
                                        className="flex-1 bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] shadow-2xl rounded-2xl h-[400px] w-full flex flex-col justify-center items-center cursor-pointer hover:opacity-65 mt-2"
                                        onClick={handleDivClick1}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="53" viewBox="0 0 56 53" fill="none">
                                            <path d="M56 42.7177V47.0079C56 50.368 52.7975 53 48.7091 53H7.29069C3.20232 53 0 50.368 0 47.0079V42.7177C0 41.3411 1.11129 40.225 2.48185 40.225C3.85263 40.225 4.96392 41.3411 4.96392 42.7177V47.0079C4.96392 47.2507 5.81466 48.0148 7.29069 48.0148H48.7091C50.1853 48.0148 51.0361 47.2507 51.0361 47.0079V42.7177C51.0361 41.3411 52.1474 40.225 53.5179 40.225C54.8887 40.225 56 41.3411 56 42.7177ZM17.8752 17.0744L25.518 8.82873V40.2649C25.518 41.6414 26.6293 42.7575 27.9999 42.7575C29.3707 42.7575 30.482 41.6414 30.482 40.2649V8.82884L38.1243 17.0744C38.6131 17.602 39.2765 17.8688 39.9415 17.8688C40.5469 17.8688 41.1538 17.6476 41.6319 17.2006C42.6354 16.2628 42.6917 14.6855 41.7577 13.6781L29.8167 0.794499C29.8071 0.784241 29.7951 0.777205 29.7855 0.767108C29.7117 0.690145 29.6289 0.623762 29.5459 0.556842C29.5001 0.519945 29.4584 0.477946 29.4105 0.444539C29.3112 0.375632 29.2034 0.320098 29.0947 0.266014C29.0562 0.246894 29.0209 0.221384 28.9813 0.204252C28.8451 0.145227 28.7013 0.101239 28.5537 0.0673495C28.5377 0.0636436 28.5229 0.0560721 28.5069 0.0526885C28.343 0.0185304 28.1738 0 27.9999 0C27.8262 0 27.6568 0.0185834 27.4931 0.0527414C27.4784 0.0558028 27.4649 0.0627317 27.4503 0.0660615C27.3012 0.100112 27.1562 0.144688 27.0184 0.204358C26.9799 0.221061 26.9457 0.245981 26.9081 0.264564C26.7981 0.319023 26.6894 0.375095 26.5895 0.444592C26.5416 0.477837 26.5001 0.519783 26.4546 0.556519C26.3714 0.623546 26.2886 0.689928 26.2148 0.766945C26.2049 0.777096 26.1929 0.784187 26.1833 0.794499L14.2421 13.6781C13.3079 14.6855 13.3642 16.2628 14.3679 17.2006C15.3709 18.1384 16.9419 18.0821 17.8752 17.0744Z" fill="#727273"></path>
                                        </svg>
                                        <div className="text-md mt-3 text-white">PNG, JPG </div>
                                        {selectedFile1 && <div className="text-md mt-3 text-white">Selected File: {selectedFile1.name}</div>}
                                    </div>
                                    <input
                                        type="file"
                                        id="fileInput1"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange1}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col max-w-[400px] md:max-w-[1020px] w-full mt-10 mx-auto">
                            <h1 className="text-white font-bold text-lg font-sans">Banner Image</h1>
                            <div className="">
                                <div
                                    className="flex-1 bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] shadow-2xl rounded-2xl h-[400px] w-full flex flex-col justify-center items-center cursor-pointer hover:opacity-65 mt-2"
                                    onClick={handleDivClick2}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="53" viewBox="0 0 56 53" fill="none">
                                        <path d="M56 42.7177V47.0079C56 50.368 52.7975 53 48.7091 53H7.29069C3.20232 53 0 50.368 0 47.0079V42.7177C0 41.3411 1.11129 40.225 2.48185 40.225C3.85263 40.225 4.96392 41.3411 4.96392 42.7177V47.0079C4.96392 47.2507 5.81466 48.0148 7.29069 48.0148H48.7091C50.1853 48.0148 51.0361 47.2507 51.0361 47.0079V42.7177C51.0361 41.3411 52.1474 40.225 53.5179 40.225C54.8887 40.225 56 41.3411 56 42.7177ZM17.8752 17.0744L25.518 8.82873V40.2649C25.518 41.6414 26.6293 42.7575 27.9999 42.7575C29.3707 42.7575 30.482 41.6414 30.482 40.2649V8.82884L38.1243 17.0744C38.6131 17.602 39.2765 17.8688 39.9415 17.8688C40.5469 17.8688 41.1538 17.6476 41.6319 17.2006C42.6354 16.2628 42.6917 14.6855 41.7577 13.6781L29.8167 0.794499C29.8071 0.784241 29.7951 0.777205 29.7855 0.767108C29.7117 0.690145 29.6289 0.623762 29.5459 0.556842C29.5001 0.519945 29.4584 0.477946 29.4105 0.444539C29.3112 0.375632 29.2034 0.320098 29.0947 0.266014C29.0562 0.246894 29.0209 0.221384 28.9813 0.204252C28.8451 0.145227 28.7013 0.101239 28.5537 0.0673495C28.5377 0.0636436 28.5229 0.0560721 28.5069 0.0526885C28.343 0.0185304 28.1738 0 27.9999 0C27.8262 0 27.6568 0.0185834 27.4931 0.0527414C27.4784 0.0558028 27.4649 0.0627317 27.4503 0.0660615C27.3012 0.100112 27.1562 0.144688 27.0184 0.204358C26.9799 0.221061 26.9457 0.245981 26.9081 0.264564C26.7981 0.319023 26.6894 0.375095 26.5895 0.444592C26.5416 0.477837 26.5001 0.519783 26.4546 0.556519C26.3714 0.623546 26.2886 0.689928 26.2148 0.766945C26.2049 0.777096 26.1929 0.784187 26.1833 0.794499L14.2421 13.6781C13.3079 14.6855 13.3642 16.2628 14.3679 17.2006C15.3709 18.1384 16.9419 18.0821 17.8752 17.0744Z" fill="#727273"></path>
                                    </svg>
                                    <div className="text-md mt-3 text-white">PNG, JPG </div>
                                    {selectedFile2 && <div className="text-md mt-3 text-white">Selected File: {selectedFile2.name}</div>}
                                </div>
                                <input
                                    type="file"
                                    id="fileInput2"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange2}
                                />
                            </div>
                            <div className="flex justify-between w-full mt-7">
                                <div className="w-full mr-4">
                                    <h1 className="text-white font-bold text-lg font-sans mt-3 mb-2">Title</h1>
                                    <input
                                        type="text"
                                        className="w-full bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] h-[50px] px-2 text-[14px] rounded-lg text-white"
                                        placeholder="Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="w-full">
                                    <h1 className="text-white font-bold text-lg font-sans mt-3 mb-2">Symbol</h1>
                                    <input
                                        type="text"
                                        className="w-full bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] h-[50px] px-2 text-[14px] rounded-lg text-white"
                                        placeholder="Symbol"
                                        value={symbol}
                                        onChange={(e) => setSymbol(e.target.value)}
                                    />
                                </div>
                            </div>
                            <h1 className="text-white font-bold text-lg font-sans mt-3 mb-2">Description</h1>
                            <textarea
                                rows="7"
                                type="text"
                                className="w-full bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] px-2 py-2 text-[14px] rounded-lg text-white"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            <div>
                                <h1 className="text-white font-bold text-lg font-sans mt-4">Customize your Contract App</h1>
                                <div className="flex flex-wrap md:flex-nowrap gap-10 w-full mt-4">
                                    <div onClick={() => { setSelected(1) }} className={`md:flex-1 px-3 py-2 rounded-2xl cursor-pointer h-[150px] ${selected === 1 && 'bg-[linear-gradient(0deg,#4C4430_0%,#4B3B48_0%,#4C4430_100%)]'}`} style={{ border: `${selected === 1 ? '2px solid #F35BF2' : '1px solid #cccc'} ` }}>
                                        <h1 className="text-white font-sans font-bold mt-4">ERC 721</h1>
                                        <p className="text-gray-400 mt-4 pr-4">Deploy a contract for creating unique ERC-721 non-fungible tokens</p>
                                    </div>
                                    <div onClick={() => { setSelected(2) }} className={`md:flex-1 px-3 py-2 rounded-2xl cursor-pointer h-[150px] ${selected === 2 && 'bg-[linear-gradient(0deg,#4C4430_0%,#4B3B48_0%,#4C4430_100%)]'}`} style={{ border: `${selected === 2 ? '2px solid #F35BF2' : '1px solid #cccc'} ` }}>
                                        <h1 className="text-white font-sans font-bold mt-4">ERC 1155</h1>
                                        <p className="text-gray-400 mt-4 pr-4">Deploy a contract for creating flexible ERC-1155 semi-fungible tokens</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <div className="w-full flex-1 mr-4">
                                    <h1 className="text-white font-bold text-lg font-sans mt-3 mb-2">Payment Token</h1>
                                    <input type="text" className="w-full bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] h-[50px] px-2 text-[14px] rounded-lg text-white" disabled placeholder="Vanry" />
                                </div>
                                <div className="w-full flex justify-end flex-1">
                                    <button
                                        style={{ background: 'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)' }}
                                        className="justify-center px-8 py-3.5 rounded-2xl max-md:px-5 cursor-pointer w-[140px] mt-5 hover:opacity-55"
                                        onClick={handleSubmit}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? "Processing..." : "Submit"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}