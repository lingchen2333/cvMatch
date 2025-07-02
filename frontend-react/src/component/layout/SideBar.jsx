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
    <aside className="hidden h-full shrink-0 flex-col border-r border-slate-200 bg-white pt-8 shadow-md lg:flex xl:w-1/6">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col items-center justify-center space-y-8 capitalize">
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
