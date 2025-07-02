import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/home/Home";
import Login from "./component/auth/Login";
import { RootLayout } from "./component/layout/RootLayout";
import ProtectedRoute from "./component/auth/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Applications from "./component/application/Applications";
import AddApplication from "./component/application/AddApplication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />

          <Route path="/add-application" element={<AddApplication />} />
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
