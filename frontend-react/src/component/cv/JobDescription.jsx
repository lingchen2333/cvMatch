import React from "react";

const JobDescription = ({ value, onChange, disabled }) => (
  <div className="mb-6">
    <label
      className="mb-2 block text-lg font-medium text-gray-700"
      htmlFor="job-description"
    >
      Paste Job Description
    </label>
    <textarea
      id="job-description"
      className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
      rows={6}
      value={value}
      onChange={onChange}
      placeholder="Paste the job description here..."
      disabled={disabled}
    />
  </div>
);

export default JobDescription;
