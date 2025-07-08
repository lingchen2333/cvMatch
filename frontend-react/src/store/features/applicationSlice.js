import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../service/api";

export const getUserApplications = createAsyncThunk(
  "app/getUserApplications",
  async ({
    pageNumber = 0,
    status = null,
    sortBy = null,
    sortOrder = null,
  }) => {
    let url = `/applications?pageNumber=${pageNumber}`;
    if (status) {
      url += `&status=${status}`;
    }

    if (sortBy) {
      url += `&sortBy=${sortBy}`;
    }

    if (sortOrder) {
      url += `&sortOrder=${sortOrder}`;
    }

    const response = await authApi.get(url);
    // console.log("get user applications:", response.data);
    return response.data;
  },
);

export const updateApplicationById = createAsyncThunk(
  "app/updateApplicationById",
  async ({ id, application }) => {
    const response = await authApi.put(`/applications/${id}`, application);
    // console.log("update applications by id:", response.data);
    return response.data;
  },
);

export const addApplication = createAsyncThunk(
  "app/addApplication",
  async (application) => {
    const response = await authApi.post(`/applications`, application);
    // console.log("add application:", response.data);
    return response.data;
  },
);

export const deleteApplication = createAsyncThunk(
  "app/deleteApplication",
  async (applicationId) => {
    const response = await authApi.delete(`/applications/${applicationId}`);
    // console.log("delete application:", response.data);
    return response.data;
  },
);

export const getApplicationCountsByStatus = createAsyncThunk(
  "app/getApplicationCountsByStatus",
  async () => {
    const response = await authApi.get(`/applications/counts-by-status`);
    // console.log("getApplicationCountsByStatus:", response.data);
    return response.data;
  },
);

export const getMonthlyApplicationCounts = createAsyncThunk(
  "app/getMonthlyApplicationCounts",
  async () => {
    const response = await authApi.get(`/applications/monthly-count`);
    // console.log("getMonthlyApplicationCounts:", response.data);
    return response.data;
  },
);

export const getSankeyData = createAsyncThunk("app/getSankeyData", async () => {
  const response = await authApi.get(`/applications/sankey-data`);
  // console.log("getMonthlyApplicationCounts:", response.data);
  return response.data;
});

const initialState = {
  applications: [],
  pageNumber: 0,
  pageSize: 0,
  totalApplications: 0,
  totalPages: 0,
  lastPage: false,
  statusCounts: {},
  monthlyApplicaitons: [],
  sankeyData: { nodes: [], links: [] },
};

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    setPageNumer: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserApplications.fulfilled, (state, action) => {
        state.applications = action.payload.data.content;
        state.pageNumber = action.payload.data.pageNumber;
        state.pageSize = action.payload.data.pageSize;
        state.totalApplications = action.payload.data.totalElements;
        state.totalPages = action.payload.data.totalPages;
        state.lastPage = action.payload.data.lastPage;
      })
      .addCase(getApplicationCountsByStatus.fulfilled, (state, action) => {
        state.statusCounts = action.payload;
        console.log("state.statusCounts:", state.statusCounts);
      })
      .addCase(getMonthlyApplicationCounts.fulfilled, (state, action) => {
        state.monthlyApplicaitons = action.payload;
        // console.log("state.monthlyApplicaitons:", state.monthlyApplicaitons);
      })
      .addCase(getSankeyData.fulfilled, (state, action) => {
        state.sankeyData = action.payload;
        console.log("state.sankeyData:", state.sankeyData);
      });
  },
});

export const { setApplications, setPageNumer } = applicationSlice.actions;

export default applicationSlice.reducer;
