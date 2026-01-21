import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Slow rising embers to give energy without distraction
const Embers = ({ count = 150 }) => {
    const mesh = useRef();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 50;
            const y = (Math.random() - 0.5) * 20; // Spread vertically
            const z = (Math.random() - 0.5) * 50;
            const speed = Math.random() * 0.02 + 0.005;
            const s = Math.random() * 0.1 + 0.05;
            temp.push({ x, y, z, speed, s, initialY: y });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current) return;

        particles.forEach((particle, i) => {
            // Rise upwards
            particle.y += particle.speed;

            // Reset if too high
            if (particle.y > 10) {
                particle.y = -10;
                particle.x = (Math.random() - 0.5) * 50;
                particle.z = (Math.random() - 0.5) * 50;
            }

            dummy.position.set(particle.x, particle.y, particle.z);
            dummy.scale.set(particle.s, particle.s, particle.s);
            dummy.rotation.x += 0.01;
            dummy.rotation.z += 0.01;
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <octahedronGeometry args={[0.3, 0]} />
            <meshBasicMaterial color="#ff6600" transparent opacity={0.6} wireframe />
        </instancedMesh>
    );
};

// A static, tactical floor grid
const TacticalGrid = () => {
    return (
        <group position={[0, -5, 0]}>
            {/* Main Grid */}
            <gridHelper args={[100, 50, 0x331100, 0x111111]} position={[0, 0, 0]} />

            {/* Secondary subtle ground plane for depth */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial color="#000000" />
            </mesh>
        </group>
    );
};

const Background3D = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-black">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 2, 20]} fov={60} />

                {/* Fog to hide the edges - creates the "Arena" feel */}
                <fog attach="fog" args={['#000000', 5, 40]} />

                <ambientLight intensity={0.5} />

                <TacticalGrid />
                <Embers />
            </Canvas>

            {/* Heavy Vignette for focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </div>
    );
};

export default Background3D;
