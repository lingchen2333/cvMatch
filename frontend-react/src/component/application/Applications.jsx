import React from "react";
import StatusButtonGroup from "../common/StatusButtonGroup";
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
