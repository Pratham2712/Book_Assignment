import { Box, Grid, LinearProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksThunk } from "../redux/slices/bookSlice";
import BookCard from "./BookCard";
import { useSearchParams } from "react-router-dom";

const Books = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    //use effect
    useEffect(() => {
        if(searchParams.get("query") == ""){
            dispatch(getBooksThunk());
        }
    },[])
    //useSelector
    const books = useSelector(
        (state) => state.rootReducer.bookSlice.data.book
    );
    const loading = useSelector((state) => state.rootReducer.bookSlice.loading);

    return (
        <Box sx={{paddingTop:"7rem"}}>
            {loading ? (<Box sx={{ width: "100%", height: "100vh", position: "absolute" }}>
      <LinearProgress
      color="inherit"
        sx={{ top: "30%", zIndex: "100", width: "30%", left: "35%"  }}
      />
    </Box>):
                
             (   <Grid container spacing={{ xs: 1, md: 3 }}  sx={{justifyContent:"center"}} >
                {
                    books.map((data,index) => {
                        return (
                            <Grid item  key={index}>
                            <BookCard data={data}/>
                            </Grid>
                        )
                    })
                }
            </Grid>)}
        </Box>
    )
}

export default Books;