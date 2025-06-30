import React from "react";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./component/home/Home";
import Login from "./component/auth/Login";
import { RootLayout } from "./component/layout/RootLayout";

import { Toaster } from "react-hot-toast";
import Applications from "./component/application/Applications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/add-application" element={<Home />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/upload-cv" element={<Home />} />
          <Route path="/profile" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
