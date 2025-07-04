import React from "react";
import TableEditCell from "./TableEditCell";
import { TableCell } from "flowbite-react";
import TableTextButton from "./TableTextButton";
import { FaTimes } from "react-icons/fa";

const EditTableRow = ({
  index,
  editValues,
  statuses,
  application,
  handleInputChange,
  handleSave,
  handleCancelEdit,
}) => {
  return (
    <>
      <TableEditCell
        name="companyName"
        type="text"
        value={editValues.companyName}
        onChange={handleInputChange}
      />
      <TableEditCell
        name="jobTitle"
        type="text"
        value={editValues.jobTitle}
        onChange={handleInputChange}
      />

      <TableEditCell
        name="dateApplied"
        type="date"
        value={editValues.dateApplied}
        onChange={handleInputChange}
      />

      <TableCell className="bg-white px-6 py-4">
        <select
          name="statusName"
          id="statusName"
          value={editValues.statusName}
          onChange={handleInputChange}
          className="min-h-[2rem] w-full resize-none rounded-md border border-slate-200 bg-gray-100 p-1 focus:border-blue-500 focus:outline-none"
        >
          {statuses?.length > 0 ? (
            statuses.map((status, index) => (
              <option value={status} key={index}>
                {status}
              </option>
            ))
          ) : (
            <></>
          )}
        </select>
      </TableCell>

      <TableEditCell
        name="jobUrl"
        type="textArea"
        value={editValues.jobUrl}
        onChange={handleInputChange}
      />

      <TableEditCell
        name="notes"
        type="textArea"
        value={editValues.notes}
        onChange={handleInputChange}
      />

      <TableCell className="bg-white px-6 py-4">
        <TableTextButton
          onClick={() => handleSave(application.id, index)}
          className="text-green-700 hover:text-green-500"
        >
          Save
        </TableTextButton>

        <TableTextButton
          onClick={handleCancelEdit}
          className="absolute top-2 right-2 text-lg text-red-700 hover:text-red-500"
        >
          <FaTimes />
        </TableTextButton>
      </TableCell>
    </>
  );
};

export default EditTableRow;
