import React, { useEffect } from "react";
import { Button, ButtonGroup } from "flowbite-react";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllStatuses } from "../../store/features/statusSlice";

const StatusButtonGroup = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const statuses = useSelector((state) => state.status.statuses);

  useEffect(() => {
    dispatch(getAllStatuses());
  }, [dispatch]);

  function handleStatusChange(status) {
    if (status === "all") {
      searchParams.delete("status");
    } else {
      searchParams.set("status", status);
    }
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  const currentStatus = searchParams.get("status");
  const buttonClass = (status) => {
    const isActive =
      currentStatus === status || (!currentStatus && status === "all");
    return `focus:ring-0 capitalize ${
      isActive
        ? "bg-blue-800 text-white hover:bg-blue-800"
        : "focus:bg-blue-800 focus:text-white"
    }`;
  };

  return (
    <ButtonGroup outline>
      <Button
        className={buttonClass("all")}
        onClick={() => handleStatusChange("all")}
      >
        All
      </Button>
      {statuses.map((status) => (
        <Button
          key={status}
          className={buttonClass(status)}
          //   className={buttonClass}
          onClick={() => handleStatusChange(status)}
        >
          {status}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default StatusButtonGroup;
