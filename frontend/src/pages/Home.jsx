import React from "react";
import "@fontsource/sour-gummy/800.css";

const Home = () => {
  return (
    <div className="relative flex items-center justify-center w-screen h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('./stadium.jpg')", opacity: 0.4 }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-white">
        {/* Title */}
        <p
          style={{ fontFamily: "Sour Gummy, sans-serif", fontWeight: 300 }}
          className="text-3xl text-center md:text-5xl"
        >
          Upcoming Events
        </p>

        {/* Event Poster */}
        <a
          href="https://unstop.com/o/ESWv6RZ?utm_medium=Share&utm_source=logged_out_user&utm_campaign=Cultural"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(255,255,255,0.8)] w-[260px] h-[350px] md:w-[300px] md:h-[420px]">
            <img
              src="./tournament.jpeg"
              className="object-cover w-full h-full"
              alt="Tennis Tournament"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
