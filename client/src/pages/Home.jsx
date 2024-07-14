import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Books from "../components/Books";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch, useSelector } from "react-redux";
import { getFilterThunk } from "../redux/slices/bookSlice";

const Home = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    //useSelector
    const authors = useSelector(
        (state) => state.rootReducer.bookSlice.data.filter.uniqueAuthors
    );
    const languages = useSelector(
        (state) => state.rootReducer.bookSlice.data.filter.uniqueLanguages
    );
    //function
  const toggleDrawer = (newOpen) => () => {
    dispatch(getFilterThunk());
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" >
        <Typography variant="h6" sx={{paddingLeft:"2rem",paddingTop:"2rem"}}>Authors</Typography>
      <List sx={{padding:"0rem 0rem"}}  >
        {authors?.map((text, index) => (
          <ListItem key={text} disablePadding sx={{padding:"0rem 0rem"}} >
            <ListItemButton sx={{padding:"0rem 1rem"}}>
            <FormControlLabel
          value={text}
          control={<Checkbox />}
          label={text}
          labelPlacement="end"
        />
        </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography variant="h6" sx={{paddingLeft:"2rem"}}>Languages</Typography>
      <List sx={{padding:"0rem 0rem"}}>
        {languages?.map((text, index) => (
          <ListItem key={text} disablePadding sx={{padding:"0rem 0rem"}}>
            <ListItemButton sx={{padding:"0rem 1rem"}}>
            <FormControlLabel
          value={text}
          control={<Checkbox />}
          label={text}
          labelPlacement="end"
        />
        </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
    return (
        <>
        <Box>
            <Navbar/>
            <div style={{paddingTop:"6rem",marginLeft:"7rem"}}>
      <Button onClick={toggleDrawer(true)} variant="outlined" sx={{
        color: "#000814",
        border: "3px solid #000814",
        fontWeight:"bold",
        '&:hover': {
          backgroundColor: "#000814",
          color: "#ffffff",
          border: "3px solid #000814",
        }
      }} >Filter</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
            <Books/>
            </Box>
        </>
    )
}

export default Home;