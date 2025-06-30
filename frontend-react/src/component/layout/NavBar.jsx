import React from "react";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Logo from "../common/Logo";
import { logout } from "../../service/authService";
import Icon from "../common/Icon";

const handleLogout = () => {
  logout();
  console.log("logging out");
};

const NavBar = () => {
  const userId = localStorage.getItem("userId");
  return (
    <nav className="sticky flex justify-between border-b border-b-slate-200 px-4 py-4 shadow md:px-10">
      <div className="flex items-center">
        <Logo className="h-7 md:h-10" />
        <h2 to="/" className="font-bold tracking-widest md:text-2xl">
          cvMatch
        </h2>
      </div>

      {userId ? (
        <Icon icon={faArrowRightFromBracket} onClick={handleLogout} />
      ) : (
        <Icon icon={faArrowRightToBracket} to="/login" />
      )}
    </nav>
  );
};

export default NavBar;
