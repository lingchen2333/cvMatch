import React from "react";
import SidebarNavLink from "./SideBarNavLink";
import {
  HiOutlineCollection,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineUpload,
  HiOutlinePlus,
} from "react-icons/hi";

const SideBar = () => {
  return (
    <aside className="sticky top-0 hidden h-screen w-1/4 flex-col lg:flex xl:w-1/5">
      <div className="flex h-full flex-col justify-between bg-white px-12">
        <div className="mt-20 flex flex-col items-center justify-center space-y-10 capitalize">
          <SidebarNavLink id={1} to="/" text="home" icon={<HiOutlineHome />} />
          <SidebarNavLink
            id={2}
            to="/applications"
            text="applications"
            icon={<HiOutlineCollection />}
          />
          <SidebarNavLink
            id={3}
            to="/add-application"
            text="add application"
            icon={<HiOutlinePlus />}
          />

          <SidebarNavLink
            id={4}
            to="/upload-cv"
            text="upload CV"
            icon={<HiOutlineUpload />}
          />
          <SidebarNavLink
            id={5}
            to="/profile"
            text="profile"
            icon={<HiOutlineUser />}
          />
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
