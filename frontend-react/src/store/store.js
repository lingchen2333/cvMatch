import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import applicationReducer from "./features/applicationSlice";
import statusReducer from "./features/statusSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    application: applicationReducer,
    status: statusReducer,
  },
});
