import { Badge } from "flowbite-react";
import React from "react";

const StatusTag = ({ children }) => {
  if (children == "applied") {
    return <Badge color="info">{children}</Badge>;
  }

  if (children == "interviewing") {
    return <Badge color="warning">{children}</Badge>;
  }

  if (children == "offer") {
    return <Badge color="success">{children}</Badge>;
  }

  if (children == "rejected") {
    return <Badge color="gray">{children}</Badge>;
  }

  return <Badge color="indigo">{children}</Badge>;
};

export default StatusTag;
