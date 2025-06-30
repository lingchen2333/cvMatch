import React from "react";

const TableTextButton = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} font-medium transition-all hover:underline`}
    >
      {children}
    </button>
  );
};

export default TableTextButton;
