import React, { useEffect, useState } from "react";
import {
  addApplication,
  getApplicationCountsByStatus,
} from "../../store/features/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import FormRow from "../common/form/FormRow";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { getAllStatuses } from "../../store/features/statusSlice";

const AddApplication = () => {
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];
  const [application, setApplication] = useState({
    companyName: "",
    jobTitle: "",
    dateApplied: today,
    statusName: "applied",
    jobUrl: "",
    notes: "",
  });

  const statuses = useSelector((state) => state.status.statuses);

  useEffect(() => {
    dispatch(getAllStatuses());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promise = dispatch(addApplication(application));
    console.log("adding application", application);

    toast.promise(promise, {
      loading: "Saving application",
      success: "Application added",
      error: "Application can't be added",
    });

    try {
      await promise;
      // Refresh status counts after successful addition
      dispatch(getApplicationCountsByStatus());
    } catch (error) {
      // Error is already handled by toast.promise
    }
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-y-5 p-8 font-sans">
      <h1 className="ms-5 text-xl font-medium">Add Application</h1>

      <form
        className="space-y-6 rounded-2xl p-4 md:w-3xl"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-28">
          <FormRow
            name="companyName"
            labelText="Company Name"
            type="text"
            placeholder="Enter company name"
            value={application.companyName}
            required={true}
            handleChange={handleInputChange}
          />

          <FormRow
            name="jobTitle"
            labelText="Job Title"
            type="text"
            placeholder="Enter job title"
            value={application.jobTitle}
            required={true}
            handleChange={handleInputChange}
          />

          <FormRow
            name="dateApplied"
            labelText="Date Applied"
            type="date"
            placeholder="Enter a date"
            value={application.dateApplied}
            required={true}
            handleChange={handleInputChange}
          />

          <div className="flex w-full flex-col space-y-2">
            <label htmlFor="statusName" className="text-gray-500 capitalize">
              status
            </label>
            <select
              name="statusName"
              id="statusName"
              value={application.statusName}
              onChange={handleInputChange}
              className="block w-full rounded-md border border-gray-300 bg-white py-3 pr-3 pl-2 focus:border-blue-500 focus:outline-none md:py-4"
            >
              {statuses?.length > 0 ? (
                statuses.map((status, index) => (
                  <option value={status} key={index}>
                    {status}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
          </div>
        </div>

        <div className="grid gap-y-8 md:col-span-2">
          <FormRow
            name="jobUrl"
            labelText="job URL"
            type="string"
            placeholder="Enter job url"
            value={application.jobUrl}
            required={true}
            handleChange={handleInputChange}
          />
          <FormRow
            name="notes"
            labelText="notes"
            type="string"
            placeholder="Enter notes"
            value={application.notes}
            required={false}
            handleChange={handleInputChange}
          />
        </div>

        <Button className="ms-auto mt-10 flex w-3xs" type="submit" style="blue">
          + Add Application
        </Button>
      </form>
    </div>
  );
};

export default AddApplication;
