import React from "react";
import logo from "../../assets/images/logo.webp";

const Logo = ({ className }) => {
  return (
    <div>
      <img src={logo} alt="logo" className={className} />
    </div>
  );
};

export default Logo;
