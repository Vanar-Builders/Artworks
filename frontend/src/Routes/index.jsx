import { Routes, Route } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import { CreateNFTS } from "../pages/CreateNft";

export const ReactRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<HeroSection/>}/>
            <Route path="/create" element={<CreateNFTS/>}/>
        </Routes>
    )
}