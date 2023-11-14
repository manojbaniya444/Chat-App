import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserThunk } from "./userAPI";

const initialState = {
  loading: false,
  authData: null,
  error: null,
  token: null,
  success: false,
};

// reducers function
export const createUser = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    const response = await createUserThunk(userData);
    // if the status code is 200 then the user data will be returned to the fulfilled section of the thunk
    if (response?.status === 200) {
      return response.data;
    }
    // otherwise rejected section payload value will be the error response message from the server
    return rejectWithValue(response?.response.data.message);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      //---> User register reducer
      .addCase(createUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        // here response.data.newUser which contain the userformdata
      })
      .addCase(createUser.rejected, (state, action) => {
        // action.payload = response.data here
        state.error = action.payload;
        state.loading = false;
        // Here use the error message from the response
        // error.response?.data.message
      });
  },
});

export default userSlice.reducer;
