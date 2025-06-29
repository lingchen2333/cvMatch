import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await authApi.post("/auth/login", { email, password });
    return response.data;
  },
);

const initialState = {
  isAuthenticated: !!localStorage.getItem("accessToken"),
  accessToken: localStorage.getItem("accessToken") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const decodedToken = jwtDecode(action.payload.accessToken);
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("userId", decodedToken.id);
    });
  },
});

export default authSlice.reducer;
