import React, { useEffect, useState } from "react";
import { getBookDetailThunk } from "../redux/slices/bookPageSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import {
  Box,
  Button,
  LinearProgress,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Login from "./Login";

const BookPage = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  //useSelector
  const loading = useSelector(
    (state) => state.rootReducer.bookPageSlice.loading
  );
  const data = useSelector(
    (state) => state.rootReducer.bookPageSlice.data.detail
  );
  const isLogin = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isLogin
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

  //schema
  const schema = yup.object().shape({
    comment: yup
      .string()
      .min(5, "comment must contain 3 letters")
      .max(50, "comment cannot exceed 50 letters"),
    rating: yup.number(),
  });

  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  //function
  const handleBlur = async (e) => {
    await trigger(e.target.name);
  };
  const handleUsernameChange = (event, name) => {
    setValue(name, event.target.value); // Update the value of the username field
    trigger(name); // Trigger validation when the username value changes
  };

  const onSubmit = (data) => {
    if (!isLogin) {
      return setLoginOpen(!loginOpen);
    } else {
    }
  };
  return (
    <Box sx={{ paddingTop: "2rem", overflowY: "auto" }}>
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
              <Box sx={{ marginBottom: "0.5rem" }}>
                <Typography>Review</Typography>
                <span>
                  <Rating
                    name="rating"
                    size="large"
                    {...register("rating")}
                    onBlur={handleBlur}
                    onChange={(event, newValue) => {
                      setValue("rating", newValue);
                      trigger("rating");
                    }}
                  />
                </span>
              </Box>
              <Box>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Comment"
                  name="comment"
                  multiline
                  rows={4}
                  size="large"
                  sx={{ width: "50%" }}
                  {...register("comment")}
                  onBlur={handleBlur}
                  //onChange={(e) => handleUsernameChange(e, "comment")}
                />
                <Typography sx={{ height: "1.5rem", fontSize: "0.8rem" }}>
                  <ErrorMessage
                    errors={errors}
                    name="comment"
                    render={({ message }) => (
                      <span style={{ color: "maroon" }}>{message}</span>
                    )}
                  />
                </Typography>
              </Box>
              <Button
                sx={{
                  background: "#000814",
                  border: "2px solid #000814",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#000814",
                    border: "2px solid #000814",
                  },
                }}
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Post
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen}></Login>
    </Box>
  );
};

export default BookPage;
