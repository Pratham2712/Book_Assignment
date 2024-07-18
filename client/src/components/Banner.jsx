import { Box } from "@mui/material";
import React from "react";

const Banner = () => {
  return (
    <Box>
      <Box
        component="img"
        src="https://dollarsprout.com/wp-content/uploads/2023/09/best-place-to-sell-textbooks.jpg"
        sx={{
          width: "-webkit-fill-available",
          padding: "0rem 2rem",
          borderTopLeftRadius: "50px",
          height: "300px",
          paddingTop: "6rem",
          objectFit: "cover",
        }}
      ></Box>
    </Box>
  );
};

export default Banner;
