import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../layout/NavBar";
import Footer from "./Footer";
import SideBar from "./SideBar";

export const RootLayout = () => {
  return (
    <main className="font-poppins">
      <NavBar />

      <div className="flex h-dvh overflow-hidden">
        <SideBar />
        <div className="mx-2 mt-5 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
