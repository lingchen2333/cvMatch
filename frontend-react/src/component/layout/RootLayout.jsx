import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../layout/NavBar";
import Footer from "./Footer";

export const RootLayout = () => {
  return (
    <main className="grid h-dvh grid-rows-[auto_1fr_auto]">
      <NavBar />
      <div className="overflow-scroll">
        <main className="mx-auto my-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </main>
  );
};
