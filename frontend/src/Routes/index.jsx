import { Routes, Route } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import { CreateNFTS } from "../pages/CreateNft";
import { CreateSingleNFT } from "../pages/CreateSingleNft";

export const ReactRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<HeroSection/>}/>
            <Route path="/create" element={<CreateNFTS/>}/>
            <Route path="/create/single" element={<CreateSingleNFT/>}/>
        </Routes>
    )
}