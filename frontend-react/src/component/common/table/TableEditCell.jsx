import { TableCell } from "flowbite-react";
import React, { useEffect, useRef } from "react";

const TableEditCell = ({ name, value, type, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);
  return (
    <TableCell className="bg-white px-6 py-4">
      {type == "textArea" ? (
        <textarea
          ref={textareaRef}
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e);

            // Dynamically resize height
            e.target.style.height = "auto"; // reset height
            e.target.style.height = `${e.target.scrollHeight}px`; // set to scroll height
          }}
          className="min-h-[2rem] w-full resize-none rounded-md border border-slate-200 bg-gray-100 p-1 focus:border-blue-500 focus:outline-none"
          rows={1}
        />
      ) : (
        <input
          name={name}
          value={value}
          type={type}
          onChange={onChange}
          className="min-h-[2rem] w-full resize-none rounded-md border border-slate-200 bg-gray-100 p-1 focus:border-blue-500 focus:outline-none"
          rows={1}
        />
      )}
    </TableCell>
  );
};

export default TableEditCell;
