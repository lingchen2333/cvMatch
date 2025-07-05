import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteApplication,
  getUserApplications,
  setApplications,
  setPageNumer,
  updateApplicationById,
} from "../../store/features/applicationSlice";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  Pagination,
} from "flowbite-react";
import toast from "react-hot-toast";
import { getAllStatuses } from "../../store/features/statusSlice";
import DisplayTableRow from "../common/table/DisplayTableRow";
import EditTableRow from "../common/table/EditTableRow";
import DeleteApplicationModal from "../common/DeleteApplicationModal";
import StatusButtonGroup from "../common/StatusButtonGroup";
import { useSearchParams } from "react-router";
import SortBy from "../common/SortBy";
import ApplicationsTable from "../common/table/ApplicationsTable";

const Applications = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-row justify-between">
        <h1 className="ms-5 text-xl font-medium">All Applications</h1>
        <div className="grid flex-col justify-items-end gap-4">
          <StatusButtonGroup />
          <SortBy className="justify-self-end" />
        </div>
      </div>

      <ApplicationsTable />
    </div>
  );
};

export default Applications;
