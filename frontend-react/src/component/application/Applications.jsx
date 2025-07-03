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
  Dropdown,
  DropdownItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Pagination,
} from "flowbite-react";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import TableEditCell from "../common/table/TableEditCell";
import TableTextButton from "../common/table/TableTextButton";
import { HiOutlineLink } from "react-icons/hi";

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
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getUserApplications({ userId, pageNumber }));
  }, [dispatch, userId, pageNumber]);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditValues(applications[index]);
  };

  const handleDelete = async (applicationId, index) => {
    const previousApplications = [...applications];
    const newApplications = applications.filter((app, i) => i != index);
    dispatch(setApplications(newApplications));

    try {
      const response = await dispatch(
        deleteApplication(applicationId),
      ).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error("Application can't be deleted");
      dispatch(setApplications(previousApplications));
    }
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

  const onPageChange = (page) => {
    console.log("page:", page);
    dispatch(setPageNumer(page - 1));
  };

  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="ms-5 text-xl font-medium">All Applications</h1>

      <div className="overflow-x-auto">
        {applications?.length > 0 ? (
          <>
            <Table hoverable>
              <TableHead>
                <TableRow>
                  <TableHeadCell className="w-[10%]">Company</TableHeadCell>
                  <TableHeadCell className="w-[15%]">Title</TableHeadCell>
                  <TableHeadCell className="w-[15%]">
                    Date Applied
                  </TableHeadCell>
                  <TableHeadCell className="w-[15%]">Status</TableHeadCell>
                  <TableHeadCell className="w-[10%]">url</TableHeadCell>
                  <TableHeadCell className="w-[10%]">notes</TableHeadCell>
                  <TableHeadCell className="w-[5%]">
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
                      // edit the row
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
                          name="notes"
                          value={editValues.notes}
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
                      // display the row
                      <>
                        <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                          {application.companyName}
                        </TableCell>
                        <TableCell>{application.jobTitle}</TableCell>
                        <TableCell>{application.dateApplied}</TableCell>
                        <TableCell>{application.status.name}</TableCell>
                        <TableCell>
                          <a href={`${application.jobUrl}`} target="_blank">
                            <HiOutlineLink />
                          </a>
                        </TableCell>
                        <TableCell>{application.notes}</TableCell>
                        <TableCell className=" ">
                          <Dropdown
                            label={<span className="text-2xl"></span>}
                            inline
                          >
                            <DropdownItem
                              onClick={() => handleEditClick(index)}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => {
                                setDeleteIndex(index);
                                setDeleteId(application.id);
                              }}
                            >
                              Delete
                            </DropdownItem>
                          </Dropdown>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-10 flex overflow-x-auto sm:justify-center">
              <Pagination
                currentPage={pageNumber + 1}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
          </>
        ) : (
          <>
            <h3 className="mt-2 text-sm font-medium text-blue-700">
              No applications found
            </h3>
          </>
        )}
      </div>

      {deleteIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Delete Application</h2>
            <p className="mb-6">
              Are you sure you want to delete this application?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
                onClick={() => {
                  setDeleteIndex(null);
                  setDeleteId(null);
                }}
              >
                Cancel
              </button>

              <button
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                onClick={() => {
                  handleDelete(deleteId, deleteIndex);
                  setDeleteIndex(null);
                  setDeleteId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
