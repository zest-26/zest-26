import React, { useState } from "react";
import axios from "axios";

const CycloCertificate = () => {
  const [bibId, setBibId] = useState("");
  const [loading, setLoading] = useState(false);

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
        "http://localhost:5000/api/cycloCertificate/generateCycloCertificate",
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Generate Your E-Certificate
        </h2>

        <form onSubmit={handleGenerate} className="space-y-5">
          <div>
            <label
              htmlFor="bibId"
              className="block text-gray-700 font-medium mb-2"
            >
              Enter Your BIB ID
            </label>
            <input
              type="text"
              id="bibId"
              value={bibId}
              onChange={(e) => setBibId(e.target.value)}
              placeholder="e.g., BIB123"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
