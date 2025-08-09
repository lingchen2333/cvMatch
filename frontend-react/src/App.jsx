import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/home/Home";
import Login from "./component/auth/Login";
import { RootLayout } from "./component/layout/RootLayout";
import ProtectedRoute from "./component/auth/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Applications from "./component/application/Applications";
import AddApplication from "./component/application/AddApplication";
import Profile from "./component/profile/Profile";
import CV from "./component/cv/CV";
import Register from "./component/registration/Register";

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
          <Route path="/cv" element={<CV />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
