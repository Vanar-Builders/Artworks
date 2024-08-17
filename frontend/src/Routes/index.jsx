import { Routes, Route } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import { CreateNFTS } from "../pages/CreateNft";
import { CreateSingleNFT } from "../pages/CreateSingleNft";
import { CreateCollection } from "../pages/CreateCollection";
import NamePopUpDialog from "../components/NameDialog";
import { useSelector } from "react-redux";
import { useState } from "react";

export const ReactRoutes = () => {
    const {address, name} = useSelector(state=>state.auth)
    const [open, setOpen] = useState(address ? name ? false : true : false)
    return (
        <>
            <Routes>
                <Route path="/" element={<HeroSection />} />
                <Route path="/create" element={<CreateNFTS />} />
                <Route path="/create/single" element={<CreateSingleNFT />} />
                <Route path="/create/collection" element={<CreateCollection />} />
            </Routes>
            {open && <NamePopUpDialog open={open} setOpen={setOpen}/>}
        </>
    )
}