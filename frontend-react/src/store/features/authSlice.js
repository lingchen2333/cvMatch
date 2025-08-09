import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../service/api";
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
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const decodedToken = jwtDecode(action.payload.accessToken);
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;

        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("userId", decodedToken.id);
      })
      .addCase(login.rejected, (state) => {
        state.isAuthenticated = false;
        state.accessToken = null;

        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
      });
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;
