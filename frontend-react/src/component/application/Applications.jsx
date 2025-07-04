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
  const statuses = useSelector((state) => state.status.statuses);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getUserApplications({ userId, pageNumber }));
    dispatch(getAllStatuses());
  }, [dispatch, userId, pageNumber]);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditValues(applications[index]);
  };

  const handleDeleteClick = (index, applicationId) => {
    setDeleteIndex(index);
    setDeleteId(applicationId);
    setOpenModal(true);
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

    setOpenModal(false);
  };

  const handleCancelDelete = () => {
    setOpenModal(false);
    setDeleteIndex(null);
    setDeleteId(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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

  const handleCancelEdit = () => {
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
                  <TableHeadCell className="w-[10%]">Status</TableHeadCell>
                  <TableHeadCell className="w-[15%]">url</TableHeadCell>
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
                      <EditTableRow
                        index={index}
                        editValues={editValues}
                        statuses={statuses}
                        application={application}
                        handleInputChange={handleInputChange}
                        handleSave={handleSave}
                        handleCancelEdit={handleCancelEdit}
                      />
                    ) : (
                      // display the row
                      <DisplayTableRow
                        application={application}
                        index={index}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
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

      <DeleteApplicationModal
        openModal={openModal}
        deleteId={deleteId}
        deleteIndex={deleteIndex}
        handleCloseModal={handleCloseModal}
        handleDelete={handleDelete}
        handleCancelDelete={handleCancelDelete}
      />
    </div>
  );
};

export default Applications;
