import { Box, Card, CardContent, createTheme, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { bookPage } from "../constants/links.js";

const BookCard = ({ data }) => {
  const navigate = useNavigate();
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
  return (
    <Box>
      <Card
        sx={{
          width: 250,
          height: 275,
          maxHeight: 350,
          padding: "0.5rem 0.5rem",
          borderRadius: "0.3rem",
          margin: "0.2rem",
          marginBottom: "3rem",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          position: "relative",
          cursor: "pointer",
          [theme.breakpoints?.down("570")]: {
            width: 150,
            height: 210,
            maxHeight: 350,
            marginBottom: "1rem",
          },
        }}
        onClick={(e) => {
          e.stopPropagation();
          navigate(bookPage(data?._id));
        }}
      >
        <Box
          component="img"
          sx={{
            maxHeight: "200px",
            width: "100%",
            objectFit: "contain",
            [theme.breakpoints.down("570")]: {
              width: "150px",
              height: "170px",
            },
          }}
          src={data?.cover?.[0]}
          alt="Cover"
        />
        <CardContent
          sx={{
            [theme.breakpoints?.down("570")]: {
              padding: "0",
              paddingLeft: "0.5rem",
            },
          }}
        >
          <Typography
            gutterBottom
            sx={{
              lineHeight: 1.1,
              fontSize: "1rem",
              height: "1rem",
              marginTop: "1.2rem",
              fontWeight: "bold",
              [theme.breakpoints?.down("570")]: {
                fontSize: "0.7rem",
                height: "0.7rem",
                marginTop: "0.5rem",
                fontWeight: "bold",
                padding: "0",
              },
            }}
          >
            {data?.title?.slice(0, 25)}...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookCard;
