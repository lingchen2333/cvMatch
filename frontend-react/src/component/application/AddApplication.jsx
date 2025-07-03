import React, { useState } from "react";
import { addApplication } from "../../store/features/applicationSlice";
import { useDispatch } from "react-redux";
import FormRow from "../common/form/FormRow";
import Button from "../common/Button";
import toast from "react-hot-toast";

const AddApplication = () => {
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];
  const [application, setApplication] = useState({
    companyName: "",
    jobTitle: "",
    dateApplied: today,
    statusName: "",
    jobUrl: "",
    notes: "",
  });

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

    toast.promise(promise, {
      loading: "Saving application",
      success: "Application added",
      error: "Application can't be added",
    });
  };

  return (
    <div className="flex flex-col gap-y-5">
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

          <FormRow
            name="statusName"
            labelText="status"
            type="string"
            placeholder="Enter application status"
            value={application.statusName}
            required={true}
            handleChange={handleInputChange}
          />

          <FormRow
            name="jobUrl"
            labelText="job URL"
            type="string"
            placeholder="Enter job url"
            value={application.jobUrl}
            required={true}
            handleChange={handleInputChange}
          />
        </div>

        <div className="md:col-span-2">
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
