import React from "react";
import Tabs from "../components/resultsTab";
const CoordinatorResults = () => {
  return (
    <div className="relative h-[1490px] flex items-center justify-center bg-gradient-to-b from-black to-[#0a1936]">
      <div
        className=" w-[1200px] h-[1460px] top-[10px] bg-cover bg-center absolute rounded-2xl shadow-lg"
        style={{ backgroundImage: "url('/bg2.avif')" }} // put bg2.avif in /public folder
      >
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

        {/* Content goes on top of image */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          {/* Logo at top */}
          <div className="absolute top-[35px] w-[230px] h-[70px] sm:w-[270px] sm:h-[100px] overflow-hidden z-10">
            <img src="/ZEST-26.png" alt="Logo" className="w-full h-full object-contain" />
          </div>

          <h1 className="absolute sm:top-[135px] text-4xl font-bold ">Coordinator Results</h1>
          <div className="absolute  top-[345px] w-[700px] h-[520px] rounded-2xl  backdrop-blur-xs shadow-md">
            <Tabs />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CoordinatorResults;
