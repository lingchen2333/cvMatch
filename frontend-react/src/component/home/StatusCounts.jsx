import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationCountsByStatus } from "../../store/features/applicationSlice";

import { FcPlanner, FcDisclaimer, FcBriefcase, FcOk } from "react-icons/fc";

const StatusCounts = () => {
  const dispatch = useDispatch();
  const statusCounts = useSelector((state) => state.application.statusCounts);

  useEffect(() => {
    dispatch(getApplicationCountsByStatus());
  }, [dispatch]);

  const statusItems = [
    {
      label: "Pending Applications",
      icon: <FcBriefcase className="h-8 w-8" />,
      count: statusCounts.applied,
    },
    {
      label: "Interviews scheduled",
      icon: <FcPlanner className="h-8 w-8" />,
      count: statusCounts.interviewing,
    },
    {
      label: "Rejected",
      icon: <FcDisclaimer className="h-8 w-8" />,
      count: statusCounts["rejected (no interview)"] + statusCounts.rejected,
    },
    {
      label: "Offer",
      icon: <FcOk className="h-8 w-8" />,
      count: statusCounts.offer,
    },
  ];

  return (
    <div className="my-10 mb-28 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
      {statusItems?.map((item) => (
        <article
          key={item.label}
          className="rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-700 to-blue-800/90 text-white shadow-xl shadow-blue-500/40"
        >
          <div className="flex flex-row items-center justify-center space-x-6 px-5 py-4">
            <p className="rounded-lg outline-2 outline-offset-4 outline-blue-500 transition-all duration-300 ease-in outline-dashed hover:scale-110">
              {item.icon}
            </p>
            <p className="w-1/2 font-medium text-gray-300 capitalize xl:text-xl">
              {item.label}
            </p>
            <p className="text-5xl font-bold opacity-30 xl:text-7xl">
              {item.count || 0}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default StatusCounts;
