import { Link } from "react-router-dom";

const Button = ({ children, disabled, to, style, className, type }) => {
  const base =
    " justify-center rounded-full border border-transparent  px-4 py-2 text-sm font-medium  shadow-sm transition-colors duration-200  ";

  const styles = {
    blue:
      base + " bg-blue-700 text-white hover:bg-blue-500 focus:ring-blue-700",

    red: base + " bg-red-700 text-white hover:bg-red-500 focus:ring-red-700 ",
    gray:
      base + " bg-gray-200 text-white hover:bg-gray-300 focus:ring-gray-700",
  };

  if (to)
    return (
      <Link to={to} className={styles[style]}>
        {children}
      </Link>
    );

  return (
    <button
      disabled={disabled}
      type={type}
      className={` ${styles[style]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
