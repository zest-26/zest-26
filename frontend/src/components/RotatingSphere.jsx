import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const RotatingSphere = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, mesh, mesh2;

    // Setup renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth / 2, window.innerWidth / 2);
    renderer.setPixelRatio(2);

    mountRef.current.appendChild(renderer.domElement);

    // Scene & camera
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-10, 10, 10, -10, -10, 10);

    // Textures
    const texture = new THREE.TextureLoader().load(
      "https://s33.postimg.cc/zaty10vot/out.png"
    );
    const texture2 = new THREE.TextureLoader().load(
      "https://s33.postimg.cc/x69kzy9hp/middle.png"
    );

    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const material2 = new THREE.MeshBasicMaterial({ map: texture2, transparent: true });

    const geometry = new THREE.SphereGeometry(9.98, 50, 50);
    const geometry2 = new THREE.SphereGeometry(10, 50, 50);

    mesh = new THREE.Mesh(geometry, material);
    mesh2 = new THREE.Mesh(geometry2, material2);

    mesh2.rotation.y = -Math.PI / 2;
    mesh.rotation.y = -Math.PI / 2;

    scene.add(mesh2);
    scene.add(mesh);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      mesh2.rotation.y -= 0.0009;
      mesh.rotation.y += 0.0009;
      renderer.render(scene, camera);
    };
    animate();

    // Mouse movement (parallax effect)
    const handleMouseMove = (e) => {
      const pos =
        ((360 * (e.pageX - window.innerWidth / 2)) / window.innerWidth) *
          (Math.PI / 180) /
          2 -
        Math.PI / 2;

      const pos2 =
        ((360 * (e.pageY - window.innerHeight / 8)) / window.innerHeight) *
          (Math.PI / 180) -
        Math.PI / 2;

      mesh2.rotation.y = -pos - Math.PI;
      mesh.rotation.y = pos;
      mesh2.rotation.x = pos2 / 10;
      mesh.rotation.x = pos2 / 10;
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup when unmounting
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (mountRef.current && renderer.domElement) {
    mountRef.current.removeChild(renderer.domElement);
  }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-[20vw] h-[20vw]" />;
};

export default RotatingSphere;


// import and paste 
// <div className="flex justify-center items-center h-screen">
//      <RotatingSphere />
//    </div>

//two balls are appearing and it is only visible when bg is white