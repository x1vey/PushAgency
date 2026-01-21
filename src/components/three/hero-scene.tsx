'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'
import { FloatingParticles } from './floating-particles'

// Modern SaaS color scheme - Aligned with Design System
const COLORS = {
    primary: '#111111', // Deep Black/Gray for main structure
    secondary: '#4B5563', // Gray 600 for details
    accent: '#000000', // Pure Black for accents
    glow: '#E5E7EB', // Lighter glow for visibility against white
    core: '#FFFFFF', // White core
}

// Main geometric object that responds to mouse
function GlowingGeometry({ scrollProgress = 0 }: { scrollProgress?: number }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const innerRef = useRef<THREE.Mesh>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1
            const y = -(event.clientY / window.innerHeight) * 2 + 1
            setMousePos({ x, y })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useFrame((state) => {
        if (!meshRef.current || !innerRef.current) return

        const time = state.clock.elapsedTime

        // Smooth rotation based on mouse position
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
            meshRef.current.rotation.x,
            mousePos.y * 0.3 + time * 0.1,
            0.05
        )
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            mousePos.x * 0.3 + time * 0.15,
            0.05
        )

        // Inner glow pulses
        innerRef.current.rotation.x = time * 0.2
        innerRef.current.rotation.y = time * 0.3

        // Scale based on scroll progress
        const scale = 1 + scrollProgress * 0.5
        meshRef.current.scale.setScalar(scale)
    })

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group>
                {/* Outer glass icosahedron */}
                <mesh ref={meshRef}>
                    <icosahedronGeometry args={[1.5, 1]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        thickness={0.5}
                        chromaticAberration={0.5}
                        anisotropy={0.3}
                        distortion={0.5}
                        distortionScale={0.5}
                        temporalDistortion={0.1}
                        iridescence={1}
                        iridescenceIOR={1}
                        iridescenceThicknessRange={[0, 1400]}
                        transmission={0.6} // Reduced from 0.95 to be more visible
                        roughness={0.2}
                        color={COLORS.secondary} // Use secondary gray for the glass so it's visible against white
                    />
                </mesh>

                {/* Inner glowing core */}
                <mesh ref={innerRef} scale={0.6}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshBasicMaterial color={COLORS.core} transparent opacity={0.8} />
                </mesh>

                {/* Inner light source */}
                <pointLight color={COLORS.glow} intensity={5} distance={10} />
            </group>
        </Float>
    )
}

// Mouse-following light effect
function MouseFollowLight() {
    const lightRef = useRef<THREE.PointLight>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const { viewport } = useThree()

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1
            const y = -(event.clientY / window.innerHeight) * 2 + 1
            setMousePos({ x, y })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useFrame(() => {
        if (!lightRef.current) return

        const x = mousePos.x * (viewport.width / 2) * 1.5
        const y = mousePos.y * (viewport.height / 2) * 1.5

        lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x, 0.1)
        lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y, 0.1)
    })

    return (
        <pointLight
            ref={lightRef}
            position={[0, 0, 5]}
            intensity={3}
            color="#ffffff"
            distance={20}
            decay={2}
        />
    )
}

// Scene content
function SceneContent({ scrollProgress = 0 }: { scrollProgress?: number }) {
    return (
        <>
            {/* Ambient and directional lighting */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} color={COLORS.primary} />

            {/* Mouse-following light */}
            <MouseFollowLight />

            {/* Main geometric object */}
            <GlowingGeometry scrollProgress={scrollProgress} />

            {/* Floating particles with nature-tech colors */}
            <FloatingParticles count={150} spread={12} color={COLORS.primary} />
            <FloatingParticles count={50} spread={8} color={COLORS.accent} size={0.02} />

            {/* Environment for reflections */}
            <Environment preset="night" />
        </>
    )
}

// Main exported component
interface HeroSceneProps {
    className?: string
    scrollProgress?: number
}

export function HeroScene({ className, scrollProgress = 0 }: HeroSceneProps) {
    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <SceneContent scrollProgress={scrollProgress} />
                </Suspense>
            </Canvas>
        </div>
    )
}
