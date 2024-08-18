import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import ArtworksRegistryABI from '../contracts/ArtworksRegistry.json';
import Web3 from 'web3';
import { changeName } from '../features/authentication';
import { useDispatch } from 'react-redux';

export default function NamePopUpDialog({ open, setOpen }) {
    const [name, setName] = React.useState('');
    const address = useSelector(state => state.auth.address);
    const RegistryAddress = import.meta.env.VITE_APP_REGISTRY_CONTRACT_ADDRESS;
    const [web3js, setWeb3] = React.useState(null);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
        }
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async () => {
        try {
            const registryContract = new web3js.eth.Contract(ArtworksRegistryABI.abi, RegistryAddress);
            if (registryContract && name && address) {
                const gasPrice = await web3js.eth.getGasPrice();
                const gasEstimate = await registryContract.methods.registerArtist(name, address).estimateGas({ from: address });
                await registryContract.methods.registerArtist(name, address).send({
                    from: address,
                    gas: gasEstimate,
                    gasPrice: gasPrice
                });
                dispatch(changeName(name))
                alert("Artist registered successfully!");
                handleClose();
            } else {
                console.log("artworksRegistryContract:", registryContract);
                alert("Contract not loaded yet, please try again later.");
            }
        } catch (error) {
            console.error("Error registering artist:", error);
            alert("Failed to register artist.");
        }
    };
    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
            </Button>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        handleClose();
                    }
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '& .MuiDialog-paper': {
                        background: 'linear-gradient(15deg, #13547a 10%, #80d0c7 100%)',
                        color: 'white',
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Artwork Registration"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        For security purposes, we need your details before setting up your dashboard.
                        <div>
                            <h3 className='mt-5 font-semibold font-sans'>Enter your Name: </h3>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className='border-2 rounded-md bg-transparent border-[#80d0c7] h-[35px] mt-2 md:w-[60%] px-2 font-semibold placeholder-slate-100'
                                type="text"
                                placeholder='Name'
                            />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className='border-2 text-white' disabled={name == ""} onClick={handleSubmit} autoFocus>
                        <h1 className='text-white border-2 px-5 py-2 rounded-full hover:opacity-75 transition-all cursor-pointer'>
                            Register
                        </h1>
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
