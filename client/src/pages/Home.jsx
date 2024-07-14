import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Books from "../components/Books";
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { getFilterThunk } from "../redux/slices/bookSlice";
import Filter from "../components/Filter";

const Home = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    
    //function
  const toggleDrawer = (newOpen) => () => {
    if(newOpen === true){
        dispatch(getFilterThunk());
    }
    setOpen(newOpen);
  };

    return (
        <>
        <Box>
            <Navbar/>
            <div style={{paddingTop:"6rem",marginLeft:"7rem"}}>
      <Button onClick={toggleDrawer(true)} variant="outlined" sx={{
        color: "#000814",
        border: "2px solid #000814",
        fontWeight:"bold",
        '&:hover': {
          backgroundColor: "#000814",
          color: "#ffffff",
          border: "2px solid #000814",
        }
      }} >Filter</Button>
      
      <Filter open={open} toggleDrawer={toggleDrawer}/>
    </div>
            <Books/>
            </Box>
        </>
    )
}

export default Home;