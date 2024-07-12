import React from "react";
import { Route, Routes } from "react-router-dom";
import { USER_Root } from "./constants/links";
import Home from "./pages/Home";

const Routess = () => {
    return (
      <Routes>
        <Route path={USER_Root} element={<Home/>}></Route>
      </Routes>
    );
  };
  
  export default Routess;