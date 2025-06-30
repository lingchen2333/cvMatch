import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplicationsByUserId,
  setApplications,
  updateApplicationById,
} from "../../store/features/applicationSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import TableEditCell from "../common/table/TableEditCell";
import TableTextButton from "../common/table/TableTextButton";

const Applications = () => {
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");
  const {
    applications,
    pageNumber,
    pageSize,
    totalApplications,
    totalPages,
    lastPage,
  } = useSelector((state) => state.application);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    dispatch(getApplicationsByUserId(userId));
  }, [dispatch, userId]);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditValues(applications[index]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (editingApplicationId, index) => {
    const promise = dispatch(
      updateApplicationById({
        id: editingApplicationId,
        application: editValues,
      }),
    );

    toast.promise(promise, {
      loading: "Updating",
      success: "Change saved",
      error: "Change can't be saved",
    });

    const updatedApplications = applications.map((app, i) =>
      i === index ? { ...app, ...editValues } : app,
    );
    dispatch(setApplications(updatedApplications));
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditValues({});
  };

  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="ms-5 text-xl font-medium">All Applications</h1>

      <div className="overflow-x-auto">
        {applications?.length > 0 ? (
          <Table hoverable>
            <TableHead>
              <TableRow>
                <TableHeadCell className="w-[10%]">Company</TableHeadCell>
                <TableHeadCell className="w-[10%]">Title</TableHeadCell>
                <TableHeadCell className="w-[10%]">Date Applied</TableHeadCell>
                <TableHeadCell className="w-[15%]">Status</TableHeadCell>
                <TableHeadCell className="w-[35%]">url</TableHeadCell>
                <TableHeadCell className="w-[10%]">
                  <span className="sr-only">Edit</span>
                </TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {applications.map((application, index) => (
                <TableRow
                  key={index}
                  className="relative border-slate-300 bg-white"
                >
                  {editingIndex === index ? (
                    <>
                      <TableEditCell
                        name="companyName"
                        value={editValues.companyName}
                        onChange={handleInputChange}
                      />
                      <TableEditCell
                        name="jobTitle"
                        value={editValues.jobTitle}
                        onChange={handleInputChange}
                      />

                      <TableEditCell
                        name="dateApplied"
                        value={editValues.dateApplied}
                        onChange={handleInputChange}
                      />

                      <TableEditCell
                        name="status"
                        value={editValues.status}
                        onChange={handleInputChange}
                      />

                      <TableEditCell
                        name="jobUrl"
                        value={editValues.jobUrl}
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
                          onClick={handleCancel}
                          className="absolute top-2 right-2 text-lg text-red-700 hover:text-red-500"
                        >
                          <FaTimes />
                        </TableTextButton>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                        {application.companyName}
                      </TableCell>
                      <TableCell>{application.jobTitle}</TableCell>
                      <TableCell>{application.dateApplied}</TableCell>
                      <TableCell>{application.status}</TableCell>
                      <TableCell>{application.jobUrl}</TableCell>
                      <TableCell>
                        <TableTextButton
                          onClick={() => handleEditClick(index)}
                          className="text-blue-700 hover:text-blue-500"
                        >
                          Edit
                        </TableTextButton>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <>
            <h3 className="mt-2 text-sm font-medium text-blue-700">
              No applications found
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default Applications;
