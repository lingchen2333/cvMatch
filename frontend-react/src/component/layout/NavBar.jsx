import React from "react";
import { useNavigate } from "react-router-dom";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Logo from "../common/Logo";
import { logout } from "../../service/authService";
import Icon from "../common/Icon";
import { useSelector } from "react-redux";

const NavBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    logout();
    console.log("logging out");
    // Navigate to login page after logout
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-20 flex justify-between border-b border-b-slate-200 bg-white px-4 py-4 shadow md:px-10">
      <div className="flex items-center">
        <Logo className="h-7 md:h-10" />
        <h2 to="/" className="font-bold tracking-widest md:text-2xl">
          cvMatch
        </h2>
      </div>

      {isAuthenticated ? (
        <Icon icon={faArrowRightFromBracket} onClick={handleLogout} />
      ) : (
        <Icon icon={faArrowRightToBracket} to="/login" />
      )}
    </nav>
  );
};

export default NavBar;
