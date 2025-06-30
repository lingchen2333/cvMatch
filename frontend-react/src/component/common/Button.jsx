import { Link } from "react-router-dom";

function Button({ children, disabled, to, style, className, type }) {
  const base =
    " justify-center rounded-full border border-transparent  px-4 py-2 text-sm font-medium  shadow-sm transition-colors duration-200  ";

  const styles = {
    blue:
      base + " bg-blue-700 text-white hover:bg-blue-500 focus:ring-blue-700",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800  disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
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
}

export default Button;
