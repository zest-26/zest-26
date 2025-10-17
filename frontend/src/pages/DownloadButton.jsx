import React, { useState, useEffect } from 'react';

const DownloadButton = ({ onClick, disabled }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // This effect listens for the download to start.
  // After 4 seconds (when animation is finished), it marks the process as "complete".
  useEffect(() => {
    if (isDownloading) {
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, 4000); // Animation sequence finishes around 3.9s

      return () => clearTimeout(timer);
    }
  }, [isDownloading]);


  const handleClick = (e) => {
    // If the animation is complete, reload the page.
    if (isComplete) {
      window.location.reload();
      return;
    }

    // Prevent clicking if disabled or already downloading.
    if (disabled || isDownloading) {
      e.preventDefault();
      return;
    }
    
    setIsDownloading(true);
    onClick(e); // Call the parent's submit handler
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled} // Disabled prop now only prevents the initial click
      className="flex justify-center group disabled:cursor-not-allowed"
      aria-live="polite"
    >
      <div
        className={`relative flex items-center p-1.5 cursor-pointer rounded-full transition-all duration-400 ease-in-out
          ${isDownloading
            ? "w-[57px] animate-[installed_0.4s_ease_3.5s_forwards] border-green-600"
            : "w-40 border-2 border-blue-500"
          }`}
      >
        {/* Animated dot for rotation effect */}
        <div
          className={`absolute inset-0 bg-white w-2 h-2 rounded-full m-auto transition-all duration-400 ease-in-out 
            ${isDownloading
              ? "animate-[rotate_3s_ease-in-out_0.4s_forwards]"
              : "opacity-0 invisible"
            }`}
        ></div>

        {/* The main blue circle */}
        <span
          className={`relative flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-full bg-blue-500 transition-all duration-400 ease-in-out
            ${isDownloading ? "animate-[pulse_1s_forwards,circleDelete_0.2s_ease_3.5s_forwards] rotate-180" : ""
            }`}
        >
          {/* Filling background for progress effect */}
          <span
            className={`absolute top-0 left-0 h-0 w-full bg-blue-800 transition-all duration-400 ease-in-out 
              ${isDownloading ? "animate-[installing_3s_ease-in-out_forwards]" : ""
              }`}
          ></span>

          {/* Download Arrow Icon */}
          <svg
            className={`absolute top-1/2 left-1/2 w-[30px] -translate-x-1/2 -translate-y-1/2 text-white transition-all duration-400 ease-in-out 
              ${isDownloading ? "opacity-0 invisible" : ""}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 19V5m0 14-4-4m4 4 4-4"
            ></path>
          </svg>

          {/* Square that appears after download */}
          <div
            className={`absolute top-1/2 left-1/2 aspect-square w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white transition-all duration-400 ease-in-out 
              ${isDownloading ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
          ></div>
        </span>

        {/* Text: "Download" */}
        <p
          className={`absolute right-[18px] text-lg text-white transition-all duration-400 ease-in-out 
            ${isDownloading ? "opacity-0 invisible" : ""}`}
        >
          Download
        </p>

        {/* Text: "Open" */}
        <p
          className={`absolute text-center text-lg text-white transition-all duration-400 ease-in-out opacity-0 invisible 
            ${isDownloading ? "animate-[showInstalledMessage_0.4s_ease_3.5s_forwards]" : ""
            }`}
        >
          Open
        </p>
      </div>
    </button>
  );
};

export default DownloadButton;