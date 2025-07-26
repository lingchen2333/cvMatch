import React, { useState, useRef, useCallback } from "react";
import { analyzeCVWithJob } from "../../service/langchainService";

const CV = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success, error
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = useCallback((file) => {
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      setUploadStatus("success");
    } else {
      setUploadStatus("error");
      alert("Please select a PDF file.");
    }
  }, []);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragOver(false);

      const files = event.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect],
  );

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadStatus("idle");
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!uploadedFile) {
      alert("Please upload a file first.");
      return;
    }
    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    setUploadStatus("uploading");
    setResult(null);
    try {
      const res = await analyzeCVWithJob({
        cvFile: uploadedFile,
        jobDescription,
      });
      setResult(res);
      setUploadStatus("success");
    } catch (error) {
      setUploadStatus("error");
      alert("Analysis failed. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-8 font-sans">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          Upload Your CV
        </h1>
        <p className="text-lg text-gray-600">
          Upload your CV in PDF and paste a job description to get a match
          analysis
        </p>
      </div>

      <div className="mb-8">
        {!uploadedFile ? (
          <div
            className={`relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed p-12 text-center transition-all duration-300 ease-in-out ${
              isDragOver
                ? "scale-105 border-blue-500 bg-blue-50 shadow-lg shadow-blue-200"
                : "border-gray-300 bg-gray-50 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <div className="mb-4 text-gray-500 transition-colors duration-300 group-hover:text-blue-500">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mx-auto"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-gray-700">
              Drag and drop your CV here
            </h3>
            <p className="mb-4 text-gray-500">or</p>
            <button className="my-4 cursor-pointer rounded-lg border-none bg-blue-500 px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-300">
              Browse Files
            </button>
            <p className="mt-4 text-sm text-gray-400">Supported formats: PDF</p>
          </div>
        ) : (
          <div className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 text-blue-500">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="mb-1 text-lg font-semibold break-all text-gray-800">
                  {uploadedFile.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                className="flex-shrink-0 cursor-pointer rounded-md border-none bg-transparent p-2 text-red-500 transition-all duration-200 hover:scale-110 hover:bg-red-50"
                onClick={handleRemoveFile}
                type="button"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {uploadedFile && (
        <>
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
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              disabled={uploadStatus === "uploading"}
            />
          </div>
          <div className="text-center">
            <button
              className={`inline-flex min-w-[150px] cursor-pointer items-center justify-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold transition-all duration-300 ${
                uploadStatus === "uploading"
                  ? "cursor-not-allowed bg-gray-500 text-white opacity-70"
                  : "bg-green-500 text-white hover:-translate-y-1 hover:bg-green-600 hover:shadow-lg hover:shadow-green-300"
              }`}
              onClick={handleSubmit}
              disabled={uploadStatus === "uploading"}
              type="button"
            >
              {uploadStatus === "uploading" ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-white"></div>
                  Analyzing...
                </>
              ) : (
                "Analyze CV"
              )}
            </button>
          </div>
        </>
      )}

      {uploadStatus === "error" && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-center">
          <p className="font-medium text-red-600">
            Upload or analysis failed. Please try again with a valid file and
            job description.
          </p>
        </div>
      )}

      {result && (
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
            Match Analysis Result
          </h2>
          <div className="mb-4 flex flex-wrap justify-center gap-4">
            <div className="rounded-lg bg-green-50 px-4 py-2 font-semibold text-green-700">
              Score: <span className="text-2xl">{result.score}</span> / 100
            </div>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              Highlighted Matches
            </h3>
            <ul className="list-disc pl-6">
              {result.highlighted_matches.map((item, idx) => (
                <li key={idx} className="font-medium text-green-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              Missing Areas
            </h3>
            <ul className="list-disc pl-6">
              {result.missing_areas.map((item, idx) => (
                <li key={idx} className="font-medium text-red-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">
              Suggestions to Improve Your CV
            </h3>
            <ul className="list-disc pl-6">
              {result.improvement_suggestions.map((item, idx) => (
                <li key={idx} className="text-blue-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CV;
