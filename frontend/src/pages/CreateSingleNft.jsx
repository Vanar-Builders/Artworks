import { useState } from "react";
import { useIPFS } from '../components/UploadIPFS';
import { useWeb3 } from '../components/ConnectWallet';

export const CreateSingleNFT = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [supply, setSupply] = useState('');
    const { uploadImageAndMetadata, isUploading, error } = useIPFS();
    const { marketplaceContract, account, connected } = useWeb3(); // Access Web3 context
    const [message, setMessage] = useState('');
    const [collections, setCollections] = useState('');

    const handleDivClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const handleMint = async () => {
        if (!selectedFile || !title || !description || !supply) {
            alert("Please fill in all fields and upload an image.");
            return;
        }

        if (!connected) {
            alert("Please connect your wallet first.");
            return;
        }

        setMessage('');
        try {
            const metadataURI = await uploadImageAndMetadata(selectedFile, title, description);
            console.log("Metadata URI:", metadataURI);
            
            // Assume ERC721 (single NFT) minting
            const isERC721 = supply === '1';
            const data = "0x"; // Placeholder for additional data if needed

            // Call the mintNFT function from the marketplace contract
            await marketplaceContract.methods.mintNFT(
                title,        // collectionName
                metadataURI,  // tokenURI
                supply,       // amount
                data,
                isERC721
            ).send({ from: account });

            setMessage('NFT minted successfully!');
        } catch (err) {
            console.error("Error minting NFT:", err);
            setMessage('Error minting NFT. Please check the console for details.');
        }
    };

    return (
        <div className="bg-[linear-gradient(0deg,#1E1E1E_70%,#282637_100%,#282637_100%)] pb-20 min-h-screen">
            <div className="md:mx-10 md:pt-7">
                <h1 className="text-5xl font-bold text-white font-sans">Create New NFT</h1>
                <div className="flex flex-wrap md:flex-nowrap w-full gap-10 mt-10">
                    <div className="max-w-[300px] w-full">
                        <h1 className="text-white font-bold text-lg font-sans">Upload file</h1>
                        <div>
                            <div
                                className="flex-1 bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] shadow-2xl rounded-2xl h-[300px] w-full flex flex-col justify-center items-center cursor-pointer hover:opacity-65 mt-2"
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
                    <div className="max-w-[600px] w-full">
                        <h1 className="text-white font-bold text-lg font-sans mb-2">Choose Collection</h1>
                        <label className="text-sm text-gray-400 font-sans" htmlFor="">This is the collection where your item will appear.</label>
                        <select className="w-full bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] h-[50px] mt-3 px-2 text-[14px] rounded-lg text-white" name="" id="">
                            <option className="h-[40px] text-black" selected disabled value="">Select Collection</option>
                        </select>
                        {
                            !collections.length && <p className="text-red-400 mt-2">You first need a collection. <span style={{ textDecoration: "underline", cursor: "pointer" }}>Click here</span>  to create one</p>
                        }
                                                <h1 className="text-white font-bold text-lg font-sans mt-3 mb-2">Title</h1>
                        <input 
                            type="text" 
                            className="w-full bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] h-[50px] px-2 text-[14px] rounded-lg text-white" 
                            placeholder="Title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <h1 className="text-white font-bold text-lg font-sans mt-3 mb-2">Description</h1>
                        <textarea 
                            rows="10" 
                            className="w-full bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] px-2 py-2 text-[14px] rounded-lg text-white" 
                            placeholder="Description"
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <h1 className="text-white font-bold text-lg font-sans mt-3 mb-2">Supply</h1>
                        <input 
                            type="text" 
                            className="w-full bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] h-[50px] px-2 text-[14px] rounded-lg text-white" 
                            placeholder="Supply"
                            value={supply}
                            onChange={(e) => setSupply(e.target.value)}
                        />

                        <button 
                            onClick={handleMint}
                            style={{background: 'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)'}} 
                            className="justify-center px-8 py-3.5 rounded-2xl max-md:px-5 cursor-pointer w-[140px] mt-5 hover:opacity-55"
                            disabled={isUploading}
                        >
                            {isUploading ? "Minting..." : "MINT"}
                        </button>
                        {error && <p className="text-red-400 mt-2">{error}</p>}
                    </div>
                    <div className="max-w-[370px] w-full">
                        <h1 className="text-white font-bold text-lg font-sans">Preview</h1>
                        <div className="flex-1 bg-[linear-gradient(0deg,#1E1E1E_0%,#282637_0%,#282637_100%)] h-auto pb-4 w-full flex rounded-3xl flex-col mt-3 pt-5 cursor-pointer">
                            <img className="px-3 rounded-3xl" src={selectedFile ? URL.createObjectURL(selectedFile) : "/assets/template.png"} alt="" />
                            <div className="mx-5 mt-4">
                                <div className="flex justify-between w-full">
                                    <div>
                                        <p className="text-gray-400 font-thin">Floor</p>
                                        <h1 className="text-white">100 VANRY</h1>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 font-thin">24h Volume</p>
                                        <h1 className="text-white font-thin">10 VANRY</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

