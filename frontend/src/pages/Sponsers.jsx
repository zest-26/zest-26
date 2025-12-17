import React, { useEffect } from "react";

export default function Sponsors() {
  useEffect(() => {
    const curs = document.querySelector('.cursor');

    const handleMouseMove = (e) => {
      curs.style.left = `${e.pageX - curs.offsetWidth / 2}px`;
      curs.style.top = `${e.pageY - curs.offsetHeight / 2}px`;
      curs.style.opacity = "1";
    };

    document.addEventListener("mousemove", handleMouseMove);

    function createHexagons() {
      const bg = document.querySelector(".background");
      document.querySelectorAll(".hexagon").forEach((h) => h.remove());

      const hexSize = window.innerWidth * 0.06;
      const hexHeight = hexSize * 0.5774 * 2;
      const hexWidth = hexSize * 1.1;
      const vertDist = hexHeight * 0.8;

      const rows = Math.ceil(window.innerHeight / vertDist) + 2;
      const cols = Math.ceil(window.innerWidth / hexWidth) + 4;

      for (let r = 0; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const hex = document.createElement("div");
          hex.className = "hexagon";
          const x = c * hexWidth + (r % 2 === 0 ? 0 : hexWidth / 2);
          const y = r * vertDist;
          hex.style.left = `${x}px`;
          hex.style.top = `${y}px`;
          bg.appendChild(hex);
        }
      }
    }

    window.addEventListener("resize", createHexagons);
    window.addEventListener("load", createHexagons);
    createHexagons();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", createHexagons);
      window.removeEventListener("load", createHexagons);
    };
  }, []);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background: #2e3340;
          font-family: system-ui, sans-serif;
          overflow-x: hidden;
          min-height: 100vh;
          color: #d1d5db;
        }
        .background {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .hexagon {
          position: absolute;
          width: 6vw;
          height: calc(6vw * 0.5774);
          background-color: #1f2430;
        }
        .hexagon::after,
        .hexagon::before {
          content: "";
          position: absolute;
          width: 0;
          border-left: 3vw solid transparent;
          border-right: 3vw solid transparent;
        }
        .hexagon::after {
          top: 100%;
          border-top: calc(3vw * 0.5774) solid #1f2430;
        }
        .hexagon::before {
          bottom: 100%;
          border-bottom: calc(3vw * 0.5774) solid #1f2430;
        }
        .cursor {
          width: 25vw;
          height: 25vw;
          border-radius: 100%;
          position: absolute;
          box-shadow: 0 0 40px rgba(255, 140, 0, 0.15);
          z-index: 0;
          opacity: 0;
          background: linear-gradient(45deg, #b36b00, #cc8400, #ff9c00, #ffb733);
          background-size: 400%;
          animation: glower 20s linear infinite;
          filter: blur(50px);
          pointer-events: none;
        }
        @keyframes glower {
          0% { background-position: 0 0; }
          50% { background-position: 400% 0; }
          100% { background-position: 0 0; }
        }
        .card-shadow {
          box-shadow: 0 10px 15px -3px rgba(255, 174, 66, 0.3),
            0 4px 6px -2px rgba(255, 174, 66, 0.2);
        }
        .overlay-container {
          position: relative;
          z-index: 2;
          padding: 2.5rem 1rem 4rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        header {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
          z-index: 10;
          user-select: none;
        }
        header h1,
        header p {
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          margin: 0;
          user-select: none;
          background: linear-gradient(90deg, #f5f7fa, #dcdcdc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }
        header h1 {
          font-size: 3rem;
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }
        header p {
          font-size: 1.125rem;
          opacity: 0.85;
        }
        .sponsor-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          transition: all 0.3s ease;
          padding: 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          user-select: none;
        }
        .sponsor-card:hover {
          background-color: #3b2c1a;
          box-shadow: 0 10px 15px -3px rgba(255, 132, 0, 0.4),
            0 4px 6px -2px rgba(255, 132, 0, 0.3);
          transform: scale(1.05);
        }
        .company-name {
          color: white;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        h2.uppercase {
          font-weight: 600;
          font-size: 1.25rem;
          background: linear-gradient(90deg, #ea580c, #facc15);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.75rem;
        }
        .sponsor-card p {
          color: #fbbf24;
          margin-bottom: 1rem;
        }
        .visit-btn {
          position: relative;
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          color: white;
          background-color: rgba(255, 255, 255, 0.08);
          border: 2px solid transparent;
          text-decoration: none;
          font-weight: 500;
          transition: border 0.3s ease, background-color 0.3s ease;
        }
        #sponsors {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          #sponsors {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>

      <div className="background">
        <div className="cursor"></div>
      </div>

      <div className="overlay-container">
        <header>
          <h1 className="font-semibold">Our Amazing Sponsors</h1>
          <p className="font-medium">
            We proudly partner with these innovative organizations.
          </p>
        </header>

        <div id="sponsors" role="list">
          {/* --- Card 1 --- */}
          <article className="sponsor-card" role="listitem" tabIndex="0">
            <h3 className="company-name">JavaScript Inc.</h3>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
              alt="JavaScript logo"
              className="w-24 h-24 object-contain mb-4"
              loading="lazy"
            />
            <h2 className="uppercase">The Chief Sponsor</h2>
            <p>Leading the way in tech innovation.</p>
            <a href="https://example.com" target="_blank" rel="noopener" className="visit-btn">
              Visit Website
            </a>
          </article>

          {/* --- Card 2 --- */}
          <article className="sponsor-card" role="listitem" tabIndex="0">
            <h3 className="company-name">Google LLC</h3>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google logo"
              className="w-24 h-24 object-contain mb-4"
              loading="lazy"
            />
            <h2 className="uppercase">Sustainability Partner</h2>
            <p>Committed to sustainable future solutions.</p>
            <a href="https://example.com" target="_blank" rel="noopener" className="visit-btn">
              Visit Website
            </a>
          </article>

          {/* --- Card 3 --- */}
          <article className="sponsor-card" role="listitem" tabIndex="0">
            <h3 className="company-name">Netflix</h3>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix logo"
              className="w-24 h-24 object-contain mb-4 bg-white rounded p-2"
              loading="lazy"
            />
            <h2 className="uppercase">Entertainment Pioneer</h2>
            <p>Streaming innovation and global content leader.</p>
            <a href="https://www.netflix.com" target="_blank" rel="noopener" className="visit-btn">
              Visit Website
            </a>
          </article>
        </div>
      </div>
    </>
  );
}
