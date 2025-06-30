import Logo from "../assets/Logo.webp";

const Logo = ({ className }) => {
  return (
    <>
      <img
        src={Logo}
        alt="logo"
        className={` ${className} object-cover mix-blend-multiply`}
      />
    </>
  );
};

export default Logo;
