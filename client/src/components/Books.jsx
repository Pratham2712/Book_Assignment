import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksThunk } from "../redux/slices/bookSlice";
import BookCard from "./BookCard";

const Books = () => {
    const dispatch = useDispatch();
    //use effect
    useEffect(() => {
        dispatch(getBooksThunk());
    },[])
    //useSelector
    const books = useSelector(
        (state) => state.rootReducer.bookSlice.data.book
      );
    return (
        <Box sx={{paddingTop:"7rem"}}>
            <Grid container spacing={{ xs: 1, md: 3 }}  sx={{justifyContent:"center"}} >
                {
                    books.map((data,index) => {
                        return (
                            <Grid item  key={index}>
                            <BookCard data={data}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default Books;