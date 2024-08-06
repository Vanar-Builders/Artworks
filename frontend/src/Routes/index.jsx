import { Routes, Route } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import { CreateNFTS } from "../pages/CreateNft";
import { CreateSingleNFT } from "../pages/CreateSingleNft";
import { CreateCollection } from "../pages/CreateCollection";

export const ReactRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<HeroSection/>}/>
            <Route path="/create" element={<CreateNFTS/>}/>
            <Route path="/create/single" element={<CreateSingleNFT/>}/>
            <Route path="/create/collection" element={<CreateCollection/>}/>
        </Routes>
    )
}