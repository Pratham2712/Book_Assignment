import React, { useEffect } from "react";
import { getBookDetailThunk } from "../redux/slices/bookPageSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  LinearProgress,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";

const BookPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  //useSelector
  const loading = useSelector(
    (state) => state.rootReducer.bookPageSlice.loading
  );
  const data = useSelector(
    (state) => state.rootReducer.bookPageSlice.data.detail
  );
  const date = new Date(data.publishedDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //useEffect
  useEffect(() => {
    const data = {
      book_id: id,
    };
    dispatch(getBookDetailThunk(data));
  }, []);
  return (
    <Box sx={{ paddingTop: "2rem" }}>
      <Navbar />
      {loading ? (
        <Box sx={{ width: "100%", height: "100vh", position: "absolute" }}>
          <LinearProgress
            color="inherit"
            sx={{ top: "30%", zIndex: "100", width: "30%", left: "35%" }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "0rem 3rem",
            height: "100vh",
          }}
        >
          <Box sx={{ marginRight: "2rem" }}>
            <img
              style={{ width: "400px", height: "500px", paddingTop: "3rem" }}
              src={data?.cover?.[0]}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              paddingTop: "2rem",
            }}
          >
            <Typography variant="h4">{data?.title}</Typography>
            <Typography>{data?.description}</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6">Published Date : </Typography>
                <Typography sx={{ paddingTop: "0.2rem" }}>
                  {formattedDate}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6">Language : </Typography>
                <Typography sx={{ paddingTop: "0.2rem" }}>
                  {data?.language}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box>
                <Typography>Review</Typography>
                <span>
                  <Rating name="half-rating" size="large" />
                </span>
              </Box>
              <Box>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Comment"
                  multiline
                  rows={4}
                  size="large"
                  sx={{ width: "50%" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BookPage;
