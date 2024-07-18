import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Books from "../components/Books";
import { Box, createTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { getFilterThunk } from "../redux/slices/bookSlice";
import Filter from "../components/Filter";

const Home = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });

  //function
  const toggleDrawer = (newOpen) => () => {
    if (newOpen === true) {
      dispatch(getFilterThunk());
    }
    setOpen(newOpen);
  };

  return (
    <>
      <Box>
        <Navbar />
        <Box
          sx={{
            paddingTop: "6rem",
            marginLeft: "7rem",
            [theme.breakpoints?.down("780")]: {
              marginLeft: "2rem",
            },
          }}
        >
          <Button
            onClick={toggleDrawer(true)}
            variant="outlined"
            sx={{
              color: "#000814",
              border: "2px solid #000814",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#000814",
                color: "#ffffff",
                border: "2px solid #000814",
              },
            }}
          >
            Filter
          </Button>

          <Filter open={open} toggleDrawer={toggleDrawer} />
        </Box>
        <Books />
      </Box>
    </>
  );
};

export default Home;
