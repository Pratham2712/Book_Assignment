import React, {  useCallback, useMemo } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import {  useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";

const Filter = ({open , toggleDrawer}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    //useEffect
    
    //useSelector
    const authors = useSelector(
        (state) => state.rootReducer.bookSlice.data.filter.uniqueAuthors
    );
    const languages = useSelector(
        (state) => state.rootReducer.bookSlice.data.filter.uniqueLanguages
    );
    const addFilter = (str, data) => {
        if (!searchParams.get(str)?.split(",")?.includes(data)) {
          if (searchParams.get(str)) {
            const params = Object.fromEntries(searchParams);
            params[str] = searchParams.get(str) + "," + data;
            setSearchParams(createSearchParams(params));
          } else {
            const params = Object.fromEntries(searchParams);
            params[str] = data;
            setSearchParams(createSearchParams(params));
          }
        } 
        else {
          const updatedValues = searchParams
            .get(str)
            .split(",")
            .filter((value) => value !== data);
          searchParams.set(str, updatedValues);
          setSearchParams(createSearchParams(searchParams));
        }
      }

      const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" >
            <Typography variant="h6" sx={{paddingLeft:"2rem",paddingTop:"2rem"}}>Authors</Typography>
          <List sx={{padding:"0rem 0rem"}}  >
            {authors?.map((text, index) => (
              <ListItem key={text} disablePadding sx={{padding:"0rem 0rem"}}  >
                <ListItemButton sx={{padding:"0rem 1rem"}}>
                <FormControlLabel 
              value={text}
              control={<Checkbox onClick={() => addFilter("author",text)} checked={searchParams
                .get("author")
                ?.split(",")
                ?.includes(text)} />}
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
              control={<Checkbox onClick={ () => addFilter("language",text)} checked={searchParams
                .get("language")
                ?.split(",")
                ?.includes(text)} />}
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
        <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    )
}

export default Filter;