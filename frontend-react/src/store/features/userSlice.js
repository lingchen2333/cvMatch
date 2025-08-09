import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../service/api";

export const getAuthenticatedUser = createAsyncThunk(
  "app/getAuthenticatedUser",
  async () => {
    const response = await authApi.get(`/users`);
    console.log("getAuthenticatedUser:", response.data);
    return response.data;
  },
);

export const registerUser = createAsyncThunk(
  "app/registerUser",
  async ({ firstName, lastName, email, password }) => {
    const response = await authApi.post(`/users`, {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  },
);

export const updateAuthenticatedUser = createAsyncThunk(
  "app/updateAuthenticatedUser",
  async (updateUserRequest) => {
    const response = await authApi.put(`/users`, updateUserRequest);
    console.log("updateUserRequest:", response.data);
    return response.data;
  },
);

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthenticatedUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });
  },
});

export default userSlice.reducer;
