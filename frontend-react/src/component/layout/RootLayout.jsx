import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../layout/NavBar";
import SideBar from "./SideBar";

export const RootLayout = () => {
  return (
    <main className="font-poppins h-dvh overflow-hidden bg-gray-100">
      <NavBar />

      <div className="flex h-dvh">
        <SideBar />
        <div className="flex-1 overflow-auto p-10">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
