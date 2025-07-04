import { Badge } from "flowbite-react";
import React from "react";

const StatusTag = ({ children }) => {
  var color;
  if (children == "applied") {
    color = "info";
  }

  if (children == "interviewing") {
    color = "warning";
  }

  if (children == "offer") {
    color = "success";
  }

  if (children == "rejected") {
    color = "gray";
  }

  return (
    <Badge color={`${color}`} className="rounded-xl">
      {children}
    </Badge>
  );
};

export default StatusTag;
