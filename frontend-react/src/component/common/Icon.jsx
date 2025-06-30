import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

const Icon = ({ to, icon, onClick }) => {
  const className =
    " my-auto text-blue-700 transition-colors duration-200   hover:bg-slate-100 rounded-sm p-2";

  if (to)
    return (
      <Link to={to} className={className}>
        <FontAwesomeIcon icon={icon} />
      </Link>
    );

  return (
    <button onClick={onClick} className={className}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default Icon;
