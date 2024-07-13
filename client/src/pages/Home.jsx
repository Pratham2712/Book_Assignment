import React from "react";
import Navbar from "../components/Navbar";
import Books from "../components/Books";
import { Box } from "@mui/material";

const Home = () => {
    return (
        <>
        <Box>
            <Navbar/>
            <Books/>
            </Box>
        </>
    )
}

export default Home;