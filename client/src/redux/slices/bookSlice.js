import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, ERROR, FULFILLED, IDLE, SUCCESS } from "../../constants/constants";
import axios from "axios";

axios.defaults.withCredentials = true;

export const getBooksThunk = createAsyncThunk(
    "/book/getBook",
    async (data) => {
      try {
        const res = await axios.post(`${BASE_URL}/book/getBook`,data);
        return res.data;
      } catch (error) {
        return error.response.data;
      }
    }
  );

export const getFilterThunk = createAsyncThunk(
    "/book/getFilter",
    async () => {
      try {
        const res = await axios.get(`${BASE_URL}/book/getFilter`);
        return res.data;
      } catch (error) {
        return error.response.data;
      }
    }
  );
 
  const initialState = {
    loading : false,
    updateDone: false,
    errorData: {
        message: "",
        type: "",
        errors: [],
      },
      successData: {
        message: "",
      },
      isError: false,
      data:{
        book:[],
        total:0,
        filter:[],
      },
      status:{
        getBooksThunk:IDLE
      }
  }

  const bookSlice = createSlice({
    name :"bookSlice",
    initialState:initialState,
    reducers:{
        clearErrorSlice: (state, action) => {
            state.isError = false;
            state.errorData = {};
          },
    },
    extraReducers:(builders) => {
        builders
      .addCase(getBooksThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getBooksThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.book = payload.data;
            state.data.total = payload.total;
            state.loading = false;
            state.status.getBooksThunk = FULFILLED;
            break;
          default:
            state.loading = false;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(getBooksThunk.rejected, (state, action) => {
        state.status.getBooksThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getFilterThunk=======================================================================================================
      .addCase(getFilterThunk.pending, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getFilterThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.filter = payload.data;
            state.loading = false;
            state.status.getFilterThunk = FULFILLED;
            break;
          default:
            state.loading = false;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(getFilterThunk.rejected, (state, action) => {
        state.status.getFilterThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
  
}
})

  export default bookSlice.reducer;
export const { clearErrorSlice } = bookSlice.actions;