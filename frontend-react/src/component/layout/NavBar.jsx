import React from "react";
import { Link } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Logo from "../common/Logo";

const NavBar = () => {
  const userId = localStorage.getItem("userId");
  return (
    <nav className="sticky flex items-center justify-between border-b border-b-slate-200 p-4 shadow">
      <div className="flex items-center">
        <Logo className="h-7" />
        <Link to="/" className="font-bold tracking-wide">
          cvMatch
        </Link>
      </div>
      {userId ? (
        <Link to="/logout" className="my-auto">
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </Link>
      ) : (
        <Link to="/login">
          <FontAwesomeIcon icon={faArrowRightToBracket} />
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
