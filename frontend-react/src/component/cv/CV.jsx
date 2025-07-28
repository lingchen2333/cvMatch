import React, { useState, useRef, useCallback } from "react";
import { analyzeCVWithJob } from "../../service/langchainService";
import UploadCV from "./UploadCV";
import JobDescription from "./JobDescription";
import AnalyzeButton from "./AnalyzeButton";
import AnalysisResult from "./AnalysisResult";

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

      <UploadCV
        uploadedFile={uploadedFile}
        isDragOver={isDragOver}
        onFileSelect={handleFileSelect}
        onRemoveFile={handleRemoveFile}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onUploadClick={handleUploadClick}
        fileInputRef={fileInputRef}
      />

      {uploadedFile && (
        <>
          <JobDescription
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            disabled={uploadStatus === "uploading"}
          />
          <AnalyzeButton
            uploadStatus={uploadStatus}
            onClick={handleSubmit}
            disabled={uploadStatus === "uploading"}
          />
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

      {result && <AnalysisResult result={result} />}
    </div>
  );
};

export default CV;
