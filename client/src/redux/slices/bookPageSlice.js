import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BASE_URL,
  ERROR,
  FULFILLED,
  IDLE,
  SUCCESS,
} from "../../constants/constants";
import axios from "axios";

axios.defaults.withCredentials = true;

export const getBookDetailThunk = createAsyncThunk(
  "/book/getBookDetail",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/book/getBookDetail`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const commentThunk = createAsyncThunk("/book/comment", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/book/comment`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const checkCommentThunk = createAsyncThunk(
  "/book/checkComment",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/book/checkComment`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const initialState = {
  loading: false,
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
  data: {
    detail: {},
    comment: {},
  },
  status: {
    getBookDetailThunk: IDLE,
    commentThunk: IDLE,
    checkCommentThunk: IDLE,
  },
};

const bookPageSlice = createSlice({
  name: "bookPageSlice",
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getBookDetailThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getBookDetailThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.detail = payload.data;
            state.loading = false;
            state.status.getBookDetailThunk = FULFILLED;
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
      .addCase(getBookDetailThunk.rejected, (state, action) => {
        state.status.getBookDetailThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //comentThunk===========================================================================================================================
      .addCase(commentThunk.pending, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(commentThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.status.commentThunk = FULFILLED;
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
      .addCase(commentThunk.rejected, (state, action) => {
        state.status.commentThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //checkCommentThunk===============================================================================================================
      .addCase(checkCommentThunk.pending, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(checkCommentThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.data.comment = payload.data;
            state.status.commentThunk = FULFILLED;
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
      .addCase(checkCommentThunk.rejected, (state, action) => {
        state.status.checkCommentThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default bookPageSlice.reducer;
export const { clearErrorSlice } = bookPageSlice.actions;
