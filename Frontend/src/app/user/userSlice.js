import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserThunk, fetchUsersThunk, loginUserThunk } from "./userAPI";

const userToken = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
const userData = localStorage.getItem("user")
  ? localStorage.getItem("user")
  : null;

export const initialState = {
  loading: false,
  authData: JSON.parse(userData),
  error: null,
  token: userToken,
  loginSuccess: false,
  signupSuccess: false,
  users: null,
};

// reducers function
//--->Signup function
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

//--->Login Function
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    const response = await loginUserThunk(userData);

    if (response.status === 200) {
      return response.data;
    }
    return rejectWithValue(response?.response.data.message);
  }
);

//---> Get all user Function
export const fetchUsers = createAsyncThunk("user/fetch", async () => {
  try {
    const response = await fetchUsersThunk(initialState.token);
    if (response.status === 200) {
      return response.data.users;
    }
  } catch (error) {
    console.log("Error fetching users");
  }
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.token = null;
      state.authData = null;
      state.loginSuccess = false;
      state.signupSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //---> User register reducer
      .addCase(createUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.signupSuccess = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.signupSuccess = true;
        // here response.data.newUser which contain the userformdata
      })
      .addCase(createUser.rejected, (state, action) => {
        // action.payload = response.data here
        state.error = action.payload;
        state.loading = false;
        // Here use the error message from the response
        // error.response?.data.message
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.loginSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.loginSuccess = true;
        state.authData = action.payload.registeredUser;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loginSuccess = false;
      })
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
