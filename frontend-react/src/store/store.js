import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import applicationReducer from "./features/applicationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    application: applicationReducer,
  },
});
