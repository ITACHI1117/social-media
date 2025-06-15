import React from "react";

const LoadingSpinner = ({ isVisible = true, message = "Loading..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4 shadow-xl">
        {/* Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
        </div>

        {/* Loading Message */}
        <p className="text-gray-700 font-medium text-sm">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
