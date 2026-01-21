import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, RoundedBox, Text, Environment } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function RedCard() {
    const mesh = useRef()
    const [hovered, setHover] = useState(false)
    const [clicked, setClicked] = useState(false)

    useFrame((state) => {
        if (mesh.current) {
            // Smooth rotation based on mouse or idle animation
            if (!hovered) {
                mesh.current.rotation.y += 0.01
                mesh.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1
            }

            // Lerp scale on click
            const targetScale = clicked ? 1.2 : 1
            mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group>
                <mesh
                    ref={mesh}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    onClick={() => setClicked(!clicked)}
                >
                    <boxGeometry args={[2, 3, 0.1]} />
                    <meshPhysicalMaterial
                        color="#ff0000"
                        roughness={0.1}
                        metalness={0.1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        reflectivity={1}
                    />
                </mesh>
            </group>
        </Float>
    )
}

function Scene() {
    return (
        <>
            {/* Dramatic Spotlight - adjusted for visibility */}
            <spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={5} castShadowColor="white" />
            <ambientLight intensity={0.5} />
            {/* Back light for rim effect */}
            <pointLight position={[-5, 5, -5]} intensity={5} color="#ffcccc" />
            {/* Front fill */}
            <pointLight position={[0, 0, 5]} intensity={2} color="white" />

            <RedCard />

            <OrbitControls enableZoom={false} enablePan={false} />
        </>
    )
}

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="w-full h-screen relative overflow-hidden bg-black">

            {/* Spotlight visuals on background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,0,0.15),_transparent_60%)] pointer-events-none" />

            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 8] }}>
                    <Scene />
                </Canvas>
            </div>

            {/* Overlay UI */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="text-center relative z-20"
                >
                    <h1 className="text-8xl font-black text-white italic tracking-tighter drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">
                        FOUL
                    </h1>
                    <h1 className="text-8xl font-black text-red-600 italic tracking-tighter drop-shadow-[0_0_25px_rgba(255,0,0,1)] -mt-4">
                        PLAY
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pointer-events-auto text-center mt-12 bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-red-900/50"
                >
                    <div className="text-xl text-gray-300 font-mono mb-6">
                        ERROR CODE <span className="text-red-500 font-bold">404</span>
                    </div>

                    <p className="text-white mb-8 max-w-sm mx-auto">
                        You've ventured out of bounds. The referee has issued a red card.
                    </p>

                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest rounded transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]"
                    >
                        Leave the Field
                    </button>
                </motion.div>
            </div>
        </div>
    )
}
