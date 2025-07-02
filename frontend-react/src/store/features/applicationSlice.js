import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../service/api";

export const getApplicationsByUserId = createAsyncThunk(
  "app/getApplicationsByUserId",
  async (userId) => {
    const response = await authApi.get(`/users/${userId}/applications`);
    return response.data;
  },
);

export const updateApplicationById = createAsyncThunk(
  "app/updateApplicationById",
  async ({ id, application }) => {
    const response = await authApi.put(`/applications/${id}`, {
      jobUrl: application.jobUrl,
      companyName: application.companyName,
      jobTitle: application.jobTitle,
      dateApplied: application.dateApplied,
      status: application.status,
    });
    console.log("update applications by id:", response.data);
    return response.data;
  },
);

export const addApplication = createAsyncThunk(
  "app/addApplication",
  async (application) => {
    const response = await authApi.post(`/applications`, application);
    console.log("add application:", response.data);
    return response.data;
  },
);

export const deleteApplication = createAsyncThunk(
  "app/deleteApplication",
  async (applicationId) => {
    const response = await authApi.delete(`/applications/${applicationId}`);
    console.log("delete application:", response.data);
    return response.data;
  },
);

const initialState = {
  applications: [],
  pageNumber: 0,
  pageSize: 0,
  totalApplications: 0,
  totalPages: 0,
  lastPage: false,
};

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getApplicationsByUserId.fulfilled, (state, action) => {
      state.applications = action.payload.data.content;
      state.pageNumber = action.payload.data.pageNumber;
      state.pageSize = action.payload.data.pageSize;
      state.totalApplications = action.payload.data.totalElements;
      state.totalPages = action.payload.data.totalPages;
      state.lastPage = action.payload.data.lastPage;
    });
  },
});

export const { setApplications } = applicationSlice.actions;

export default applicationSlice.reducer;
