import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserInfoSlice from "../slices/UserInfoSlice";
import bookSlice from "../slices/bookSlice";

const rootReducer = combineReducers({
  UserInfoSlice: UserInfoSlice,
  bookSlice:bookSlice
  });
  
  export default configureStore({
    reducer: {
      rootReducer: rootReducer,
    },
  });
  