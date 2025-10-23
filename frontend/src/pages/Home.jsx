import React from "react";
import { Link } from "react-router-dom";
import "@fontsource/sour-gummy/800.css";

const Home = () => {
  return (
    <div className="relative flex w-screen h-screen">
      {/* Background image with opacity */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('./stadium.jpg')", opacity: 0.4 }}
      ></div>

      {/* Title */}
      <p
        style={{ fontFamily: "Sour Gummy, sans-serif", fontWeight: 300 }}
        className="relative mt-24 ml-[150px] text-4xl z-10 text-white"
      >
        Upcoming Events
      </p>

      {/* Event Image Link */}
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLScMLWWUCdK3xzY4JL4RKEpRZxpTAkByMeQ2i9KEeY4WhinnTQ/viewform"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="rounded-2xl p-1 bg-black border-black transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(255,255,255,0.8)] w-[250px] h-[180px] top-[200px] left-[530px] absolute z-10">
          <img src="./coordInduct.jpeg" className="w-full h-full rounded-2xl" />
        </div>
      </a>

      {/* Results Section */}
      <div className="absolute bottom-[100px] left-[530px] flex flex-col gap-4 z-10">
        <Link
          to="/coordinatorResults"
          className="px-6 py-3 bg-white/10 hover:bg-white/30 text-white font-bold rounded-2xl border border-white/30 backdrop-blur-md transition-all duration-300 text-center w-[250px]"
        >
          Coordinator Results
        </Link>

        <Link
          to="/VolunteerResults"
          className="px-6 py-3 bg-white/10 hover:bg-white/30 text-white font-bold rounded-2xl border border-white/30 backdrop-blur-md transition-all duration-300 text-center w-[250px]"
        >
          Volunteer Results
        </Link>
      </div>
    </div>
  );
};

export default Home;
