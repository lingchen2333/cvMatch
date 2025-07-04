import { Dropdown, DropdownItem, TableCell } from "flowbite-react";
import React from "react";
import { HiOutlineLink } from "react-icons/hi";
import StatusTag from "../StatusTag";

const DisplayTableRow = ({
  application,
  index,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <>
      <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
        {application.companyName}
      </TableCell>
      <TableCell>{application.jobTitle}</TableCell>
      <TableCell>{application.dateApplied}</TableCell>
      <TableCell className="flex">
        <StatusTag>{application.statusName}</StatusTag>
      </TableCell>
      <TableCell>
        <a href={`${application.jobUrl}`} target="_blank">
          <HiOutlineLink />
        </a>
      </TableCell>
      <TableCell>{application.notes}</TableCell>
      <TableCell className=" ">
        <Dropdown label={<span className="text-2xl"></span>} inline>
          <DropdownItem onClick={() => handleEditClick(index)}>
            Edit
          </DropdownItem>
          <DropdownItem
            onClick={() => handleDeleteClick(index, application.id)}
          >
            Delete
          </DropdownItem>
        </Dropdown>
      </TableCell>
    </>
  );
};

export default DisplayTableRow;
