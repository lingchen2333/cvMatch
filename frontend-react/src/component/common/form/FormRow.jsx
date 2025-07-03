import React from "react";

const FormRow = ({
  name,
  labelText,
  type,
  placeholder,
  value,
  required,
  handleChange,
  className,
}) => {
  return (
    <div className="flex w-full flex-col space-y-2">
      <label htmlFor={name} className="text-gray-500 capitalize">
        {labelText || name}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`block w-full rounded-md border border-gray-300 bg-white py-3 pr-3 pl-2 focus:border-blue-500 focus:outline-none md:py-4 ${className} `}
        required={required}
      />
    </div>
  );
};

export default FormRow;
