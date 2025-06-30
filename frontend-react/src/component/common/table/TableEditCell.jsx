import { TableCell } from "flowbite-react";
import React from "react";

const TableEditCell = ({ name, value, onChange }) => {
  return (
    <TableCell className="bg-white px-6 py-4">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="min-h-[2rem] w-full resize-none rounded-md border border-slate-200 bg-white p-1 focus:border-blue-500"
        rows={2}
      />
    </TableCell>
  );
};

export default TableEditCell;
