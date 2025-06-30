import { NavLink } from "react-router-dom";

const SidebarNavLink = ({ id, to, text, icon }) => {
  return (
    <NavLink
      key={id}
      to={to}
      end
      className={({ isActive }) => {
        return isActive
          ? "flex w-full items-center space-x-6 rounded-md bg-gray-100 px-4 py-2 text-lg font-medium text-blue-700 capitalize transition-all duration-200 ease-out"
          : "flex w-full items-center space-x-6 rounded-md px-4 py-2 text-lg font-medium text-gray-500 capitalize transition-all duration-300 ease-out hover:bg-gray-100";
      }}
    >
      <span className="h-6 w-6"> {icon}</span>
      <span>{text} </span>
    </NavLink>
  );
};
export default SidebarNavLink;
