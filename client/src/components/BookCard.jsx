import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const BookCard = ({data}) => {
    console.log(data);
    return (
        <Box>
            <Card  sx={{
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
      }}>
            <img
          src={data?.cover?.[0]}
          alt=""
          style={{
            maxHeight: "200px",
            width: "100%",
            objectFit: "contain",
          }}
        />
      <CardContent>
        <Typography gutterBottom sx={{ lineHeight: 1.1, fontSize: "1rem", height: "1rem",marginTop:"1.2rem",fontWeight:"bold" }} >
        {data?.title?.slice(0, 25)}...
        </Typography>
      </CardContent>
      
        
    </Card>
        </Box>
    )
}

export default BookCard;