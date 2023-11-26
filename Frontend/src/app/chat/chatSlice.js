import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userToken =
  localStorage.getItem("token") && localStorage.getItem("token");

const initialState = {
  loading: false,
  error: null,
  chats: [],
};

export const createChat = createAsyncThunk(
  "chat/create",
  async (participants, token) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/chat/new-chat",
        {
          participants,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken || token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchChats = createAsyncThunk(
  "chat/fetch",
  async (participantId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/chat/all-chats",
        {
          id: participantId,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.status === 200) return response.data.chats;
    } catch (error) {
      console.error(error);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(createChat.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      });
  },
});

export default chatSlice.reducer;
