import React from "react";

const AnalyzeButton = ({ uploadStatus, onClick, disabled }) => {
  return (
    <div className="text-center">
      <button
        className={`inline-flex min-w-[150px] cursor-pointer items-center justify-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold transition-all duration-300 ${
          uploadStatus === "uploading"
            ? "cursor-not-allowed bg-gray-500 text-white opacity-70"
            : "bg-green-500 text-white hover:-translate-y-1 hover:bg-green-600 hover:shadow-lg hover:shadow-green-300"
        }`}
        onClick={onClick}
        disabled={disabled}
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
  );
};

export default AnalyzeButton;
