import React, { useState } from "react";
import axios from "axios";

const CycloCertificate = () => {
  const [bibId, setBibId] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!bibId.trim()) {
      alert("Please enter your BIB ID");
      return;
    }

    try {
      setLoading(true);

      // Call backend API
      const response = await axios.post(
        `${API_BASE_URL}/api/cycloCertificate/generateCycloCertificate`,
        { BIB_ID: bibId },
        { responseType: "blob" } // important for downloading binary file
      );

      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificate_${bibId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      console.log("✅ Certificate downloaded successfully");
    } catch (error) {
      console.error("❌ Error generating certificate:", error);
      alert(
        error.response?.data?.message ||
          "Error generating certificate. Please check your BIB ID."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-15 justify-center min-h-screen bg-gradient-to-br from-orange-300 via-orange-600 to-red-500 p-4">
      <div className="text-[clamp(20px,6vw,40px)] font-semibold">Your E-Certificate is ready</div>
      <div className="bg-orange-400 shadow-[0_14px_15px_rgba(355,355,355,0.9)]  rounded-2xl p-8 w-full max-w-md sm:transform sm:transition-transform sm:duration-500 sm:hover:scale-105 sm:hover:shadow-[0_18px_20px_rgba(255,255,255,1)]">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Generate Your E-Certificate
        </h2>

        <form onSubmit={handleGenerate} className="space-y-5">
          <div>
            <label
              htmlFor="bibId"
              className="block text-white font-medium mb-2"
            >
              Enter Your BIB ID
            </label>
            <input
              type="text"
              id="bibId"
              value={bibId}
              onChange={(e) => setBibId(e.target.value)}
              placeholder="e.g., BIB123"
              className="w-full px-4 py-2 border text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold py-2.5 rounded-lg transition duration-200`}
          >
            {loading ? "Generating..." : "Generate E-Certificate"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CycloCertificate;
