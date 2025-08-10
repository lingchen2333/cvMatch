import React, { useState, useEffect } from "react";

const AnalyzeButton = ({ uploadStatus, onClick, disabled }) => {
  const [funTextIndex, setFunTextIndex] = useState(0);

  const funTexts = [
    "Reading between the lines...",
    "Decoding CV hieroglyphics...",
    "Consulting the career crystal ball...",
    "Summoning the job market spirits...",
    "Brewing the perfect career potion...",
    "Channeling your inner professional...",
    "Unleashing the CV analysis magic...",
    "Scanning for hidden talents...",
    "Connecting the career dots...",
    "Unlocking your professional potential...",
    "Decrypting the CV matrix...",
    "Summoning career wisdom...",
    "Analyzing with AI superpowers...",
    "Finding your career supernova...",
    "Unveiling the professional prophecy...",
  ];

  useEffect(() => {
    let interval;
    if (uploadStatus === "uploading") {
      interval = setInterval(() => {
        setFunTextIndex((prev) => (prev + 1) % funTexts.length);
      }, 3000); // Change text every 3 seconds
    } else {
      setFunTextIndex(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [uploadStatus]);

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

      {uploadStatus === "uploading" && (
        <div className="mt-3 animate-pulse text-sm text-gray-600">
          {funTexts[funTextIndex]}
        </div>
      )}
    </div>
  );
};

export default AnalyzeButton;
