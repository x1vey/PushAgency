'use client'

import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Modern SaaS colors
const COLORS = {
    particle: '#0EA5E9',
    particleSecondary: '#38BDF8',
    glow: '#0284C7',
}

// Parallax particles that respond to scroll and mouse
function ParallaxParticles({
    count = 100,
    scrollY = 0,
    mousePosition = { x: 0, y: 0 }
}: {
    count?: number
    scrollY?: number
    mousePosition?: { x: number; y: number }
}) {
    const particlesRef = useRef<THREE.Points>(null)
    const { viewport } = useThree()

    const [positions, velocities, sizes] = React.useMemo(() => {
        const pos = new Float32Array(count * 3)
        const vel = new Float32Array(count * 3)
        const siz = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            // Spread particles across viewport with depth
            pos[i * 3] = (Math.random() - 0.5) * viewport.width * 2
            pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 4
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5

            // Random velocities for organic movement
            vel[i * 3] = (Math.random() - 0.5) * 0.002
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001

            // Varied sizes
            siz[i] = 0.02 + Math.random() * 0.04
        }

        return [pos, vel, siz]
    }, [count, viewport])

    useFrame((state) => {
        if (!particlesRef.current) return
        const time = state.clock.elapsedTime
        const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < count; i++) {
            const i3 = i * 3

            // Apply velocities with parallax effect
            const depth = (posArray[i3 + 2] + 15) / 30 // Normalize depth 0-1
            const parallaxStrength = depth * 0.5

            // Scroll parallax
            posArray[i3 + 1] += velocities[i3 + 1] + scrollY * parallaxStrength * 0.0001

            // Mouse parallax
            posArray[i3] += velocities[i3] + mousePosition.x * parallaxStrength * 0.0005
            posArray[i3 + 1] += mousePosition.y * parallaxStrength * 0.0003

            // Gentle drift
            posArray[i3] += Math.sin(time * 0.3 + i) * 0.001
            posArray[i3 + 1] += Math.cos(time * 0.2 + i * 0.5) * 0.001

            // Wrap around
            if (posArray[i3 + 1] > viewport.height * 2) posArray[i3 + 1] = -viewport.height * 2
            if (posArray[i3 + 1] < -viewport.height * 2) posArray[i3 + 1] = viewport.height * 2
            if (posArray[i3] > viewport.width) posArray[i3] = -viewport.width
            if (posArray[i3] < -viewport.width) posArray[i3] = viewport.width
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[sizes, 1]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color={COLORS.particle}
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// Secondary layer with different movement
function SecondaryParticles({
    count = 50,
    scrollY = 0,
    mousePosition = { x: 0, y: 0 }
}: {
    count?: number
    scrollY?: number
    mousePosition?: { x: number; y: number }
}) {
    const particlesRef = useRef<THREE.Points>(null)
    const { viewport } = useThree()

    const positions = React.useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * viewport.width * 1.5
            pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 3
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3
        }
        return pos
    }, [count, viewport])

    useFrame((state) => {
        if (!particlesRef.current) return
        const time = state.clock.elapsedTime
        const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            // Slower, more gentle movement
            posArray[i3] += Math.sin(time * 0.15 + i * 0.3) * 0.003
            posArray[i3 + 1] += Math.cos(time * 0.1 + i * 0.2) * 0.002

            // Subtle mouse reaction
            posArray[i3] += mousePosition.x * 0.0002
            posArray[i3 + 1] += mousePosition.y * 0.0001
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color={COLORS.particleSecondary}
                transparent
                opacity={0.3}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

// Ambient light that follows mouse
function AmbientGlow({ mousePosition = { x: 0, y: 0 } }: { mousePosition?: { x: number; y: number } }) {
    const lightRef = useRef<THREE.PointLight>(null)
    const { viewport } = useThree()

    useFrame(() => {
        if (!lightRef.current) return
        const targetX = mousePosition.x * (viewport.width / 2) * 0.5
        const targetY = mousePosition.y * (viewport.height / 2) * 0.5
        lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.05)
        lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, 0.05)
    })

    return (
        <pointLight
            ref={lightRef}
            position={[0, 0, 5]}
            intensity={1.5}
            color={COLORS.glow}
            distance={30}
            decay={2}
        />
    )
}

// Scene wrapper
function ParallaxScene({
    scrollY,
    mousePosition
}: {
    scrollY: number
    mousePosition: { x: number; y: number }
}) {
    return (
        <>
            <ambientLight intensity={0.1} />
            <AmbientGlow mousePosition={mousePosition} />
            <ParallaxParticles count={80} scrollY={scrollY} mousePosition={mousePosition} />
            <SecondaryParticles count={40} scrollY={scrollY} mousePosition={mousePosition} />
        </>
    )
}

// Import React for useMemo
import React from 'react'

// Main exported component - wraps entire page
interface Parallax3DLayerProps {
    children?: React.ReactNode
    className?: string
}

export function Parallax3DLayer({ children, className }: Parallax3DLayerProps) {
    const [scrollY, setScrollY] = useState(0)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1
            const y = -(e.clientY / window.innerHeight) * 2 + 1
            setMousePosition({ x, y })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <div className={`relative ${className || ''}`}>
            {/* Fixed 3D background layer */}
            <div className="parallax-layer" style={{ zIndex: 0 }}>
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 75 }}
                    dpr={[1, 1.5]}
                    gl={{ antialias: true, alpha: true }}
                    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
                >
                    <Suspense fallback={null}>
                        <ParallaxScene scrollY={scrollY} mousePosition={mousePosition} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content layer */}
            <div className="parallax-content" style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </div>
    )
}

// Standalone parallax background (for specific sections)
interface ParallaxBackgroundProps {
    className?: string
    particleCount?: number
    intensity?: number
}

export function ParallaxBackground({
    className,
    particleCount = 60,
    intensity = 1
}: ParallaxBackgroundProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1
            const y = -(e.clientY / window.innerHeight) * 2 + 1
            setMousePosition({ x: x * intensity, y: y * intensity })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [intensity])

    return (
        <div className={`absolute inset-0 pointer-events-none ${className || ''}`}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.1} />
                    <AmbientGlow mousePosition={mousePosition} />
                    <ParallaxParticles count={particleCount} scrollY={0} mousePosition={mousePosition} />
                </Suspense>
            </Canvas>
        </div>
    )
}
