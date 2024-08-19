import { Routes, Route, Navigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import { CreateNFTS } from "../pages/CreateNft";
import { CreateSingleNFT } from "../pages/CreateSingleNft";
import { CreateCollection } from "../pages/CreateCollection";
import NamePopUpDialog from "../components/NameDialog";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const ReactRoutes = () => {
    const name = useSelector(state=>state.auth.name)
    const address = useSelector(state=>state.auth.address)
    const [open, setOpen] = useState(address ? name ? false : true : false)
    const [collectionName, setCollectionName] = useState([]);

    useEffect(() => {
        setOpen(address ? name ? false : true : false)
    }, [address, name])
    return (
        <>
            <Routes>
                <Route path="/" element={<HeroSection />} />
                <Route path="/create" element={name && address ? <CreateNFTS /> : <Navigate to="/"/>} />
                <Route path="/create/single" element={<CreateSingleNFT collectionName={collectionName} />} />
                <Route path="/create/collection" element={<CreateCollection collectionName={collectionName} setCollectionName={setCollectionName} />} />
            </Routes>
            {open && <NamePopUpDialog open={open} setOpen={setOpen}/>}
        </>
    )
}