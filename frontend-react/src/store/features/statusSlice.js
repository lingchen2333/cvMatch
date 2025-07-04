import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../service/api";

export const getAllStatuses = createAsyncThunk(
  "app/getAllStatuses",
  async () => {
    const response = await authApi.get(`/statuses`);
    // console.log(
    //   "get all statuses:",
    //   response.data.data.map((s) => s.name),
    // );
    return response.data;
  },
);

const initialState = {
  statuses: [],
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStatuses.fulfilled, (state, action) => {
      state.statuses = action.payload.data.map((s) => s.name);
      //   console.log("statuses:", state.statuses);
    });
  },
});

export default statusSlice.reducer;
