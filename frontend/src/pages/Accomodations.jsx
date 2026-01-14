import { useEffect } from "react";
import * as THREE from "three";

const Accomodations = () => {
  useEffect(() => {
    // --- THREE.JS BACKGROUND ANIMATION ---
    let scene, camera, renderer, ball, group;
    let mouseX = 0,
      mouseY = 0,
      targetX = 0,
      targetY = 0,
      scrollY = 0;

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      const container = document.getElementById("canvas-container");
      if (container) container.appendChild(renderer.domElement);

      group = new THREE.Group();
      scene.add(group);

      const geometry = new THREE.IcosahedronGeometry(2, 1);
      const material = new THREE.MeshBasicMaterial({
        color: 0xff8c00,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });

      ball = new THREE.Mesh(geometry, material);
      group.add(ball);

      const pointsGeometry = new THREE.IcosahedronGeometry(2.05, 1);
      const pointsMaterial = new THREE.PointsMaterial({
        color: 0xff4500,
        size: 0.05,
      });
      const points = new THREE.Points(pointsGeometry, pointsMaterial);
      group.add(points);

      camera.position.z = 5;

      window.addEventListener("resize", onWindowResize);
      document.addEventListener("mousemove", onMouseMove);
      window.addEventListener("scroll", onScroll);

      onScroll();
      animate();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onMouseMove(event) {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function onScroll() {
      scrollY = window.scrollY;
      document.querySelectorAll(".scroll-section").forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          sec.classList.add("section-visible");
        }
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      ball.rotation.y += 0.005;
      ball.rotation.x += 0.002;
      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;
      group.position.x += (targetX - group.position.x) * 0.05;
      group.position.y += (targetY - group.position.y) * 0.05;
      group.position.z = -scrollY * 0.005;
      group.rotation.z = scrollY * 0.001;
      renderer.render(scene, camera);
    }

    init();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* CSS (kept intact) */}
      <style>{`
         /* ORBITRON */
@font-face {
  font-family: 'Orbitron';
  src: url('/fonts/orbitron/Orbitron-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'Orbitron';
  src: url('/fonts/orbitron/Orbitron-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

/* RAJDHANI */
@font-face {
  font-family: 'Rajdhani';
  src: url('/fonts/rajdhani/Rajdhani-Light.woff2') format('woff2');
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: 'Rajdhani';
  src: url('/fonts/rajdhani/Rajdhani-Medium.woff2') format('woff2');
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: 'Rajdhani';
  src: url('/fonts/rajdhani/Rajdhani-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}


        html,
body {
  margin: 0;
  background-color: #000 !important;
  color: #ff8c00;
  font-family: 'Rajdhani', sans-serif;
  overflow-x: hidden;
  min-height: 100%;
}


        h1, h2, h3 {
            font-family: 'Orbitron', sans-serif;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        #canvas-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            z-index: -1;
            pointer-events: none;
        }

        .neon-border {
            border: 1px solid #ff8c00;
            box-shadow: 0 0 10px #ff8c00, inset 0 0 5px #ff8c00;
        }

        .neon-text {
            text-shadow: 0 0 8px #ff8c00;
        }

        .glass-panel {
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid rgba(255, 140, 0, 0.3);
            backdrop-filter: blur(10px);
        }

        input, select, textarea {
            background: rgba(255, 140, 0, 0.05) !important;
            border: 1px solid #ff8c00 !important;
            color: white !important;
            outline: none;
        }

        input:focus {
            box-shadow: 0 0 10px #ff8c00;
        }

       

        .section-visible {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.8s ease-out;
        }

        .section-hidden {
            opacity: 0;
            transform: translateY(30px);
        }

        .scroll-section {
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
      `}</style>

      <div id="canvas-container" />

      {/* HERO */}
      <header className="h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl md:text-8xl mb-4 neon-text animate-pulse">
          ACCOMMODATION
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl text-orange-300">
          Your home away from home while you dominate the field at COEP's Annual
          Sports Fest.
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdF4fdir8_cDYQuA6O0O1Zqa_iYlx_YGqVKvpIDN-WK7Oymfg/viewform"
           target="_blank"
  rel="noopener noreferrer"
          className="mt-8 px-10 py-4 bg-orange-600 text-black font-bold rounded-full hover:bg-orange-400 transition-all transform hover:scale-105 neon-border"
        >
          BOOK YOUR STAY
        </a>
      </header>

    
        <main class="max-w-6xl  mx-auto px-6 py-20 space-y-32">
        <section class="grid  md:grid-cols-2  gap-12 items-center scroll-section">
            <div class="glass-panel p-4 sm:p-6 md:p-8 rounded-lg neon-border">
                <h2 class="text-3xl mb-6">REGISTRATION PROCESS</h2>
                <ul class="space-y-4 text-lg">
                    <li class="flex items-start">
                        <span class="text-white font-bold mr-3">01.</span>
                        <span>Click on the "Book Your Stay" button.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-white font-bold mr-3">02.</span>
                        <span>Fill the required details.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-white font-bold mr-3">03.</span>
                        <span>Submit the form.</span>
                    </li>
                    <li class="flex items-start">
                        <span class="text-white font-bold mr-3">04.</span>
                        <span>Our team will contact you based on availability.</span>
                    </li>
                </ul>
            </div>
            <div>
                <h3 class="text-4xl mb-4 mr-1 font-bold">STAY AT THE HISTORIC COEP HOSTEL</h3>
                <p class="text-orange-200 mr-2 leading-relaxed mb-6">
                    Located in the heart of Pune, our hostels provide a comfortable environment for athletes to rest and strategize. With 24/7 security and proximity to the main grounds, you're always in the center of the action.
                </p>
            </div>
        </section>

         <section class="scroll-section">
            <h2 class="text-4xl text-center mb-16 neon-text">AMENITIES PROVIDED</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="glass-panel p-8 text-center hover:border-orange-400 transition-all group">
                    <div class="text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                    </div>
                    <h3 class="text-xl mb-2">High-Speed Wi-Fi</h3>
                    <p class="text-orange-200">Stay connected and share your victories with the world instantly.</p>
                </div>
                <div class="glass-panel p-8 text-center hover:border-orange-400 transition-all group">
                    <div class="text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 class="text-xl mb-2">24/7 Support</h3>
                    <p class="text-orange-200">Our dedicated hospitality team is available round the clock for your needs.</p>
                </div>
                <div class="glass-panel p-8 text-center hover:border-orange-400 transition-all group">
                    <div class="text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                    </div>
                    <h3 class="text-xl mb-2">Nutritious Meals</h3>
                    <p class="text-orange-200">Balanced meals designed for athletes to maintain peak energy levels.</p>
                </div>
            </div>
        </section>

         <section class="glass-panel p-10 rounded-3xl border-l-4 border-orange-600 scroll-section">
            <h2 class="text-3xl mb-6">IMPORTANT GUIDELINES</h2>
            <div class="grid md:grid-cols-2 gap-8 text-orange-100">
                <p>• Strict discipline must be maintained inside the accommodation area.</p>
                <p>• Valid college ID and Zest registration pass are mandatory for entry.</p>
                <p>• Alcohol, smoking, drugs, and any illegal substances are strictly prohibited.</p>
                <p>• Any damage to college property will lead to immediate disqualification.</p>
            </div>
        </section>
        </main>


    </>
  );
};

export default Accomodations;