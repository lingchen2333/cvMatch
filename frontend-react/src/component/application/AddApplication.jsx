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
    status: "",
    jobUrl: "",
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
        className="space-y-6 rounded-2xl p-4 md:w-2xl"
        onSubmit={handleSubmit}
      >
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
          name="status"
          labelText="status"
          type="string"
          placeholder="Enter application status"
          value={application.status}
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

        <Button className="ms-auto mt-10 flex w-3xs" type="submit" style="blue">
          + Add Application
        </Button>
      </form>
    </div>
  );
};

export default AddApplication;
