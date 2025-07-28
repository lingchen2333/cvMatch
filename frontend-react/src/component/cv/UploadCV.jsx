import React from "react";

const UploadCV = ({
  uploadedFile,
  isDragOver,
  onFileSelect,
  onRemoveFile,
  onDragOver,
  onDragLeave,
  onDrop,
  onUploadClick,
  fileInputRef,
}) => {
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="mb-8">
      {!uploadedFile ? (
        <div
          className={`relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed p-12 text-center transition-all duration-300 ease-in-out ${
            isDragOver
              ? "scale-105 border-blue-500 bg-blue-50 shadow-lg shadow-blue-200"
              : "border-gray-300 bg-gray-50 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={onUploadClick}
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
          <p className="mt-4 text-sm text-gray-400">Supported format: PDF</p>
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
              onClick={onRemoveFile}
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
  );
};

export default UploadCV;
