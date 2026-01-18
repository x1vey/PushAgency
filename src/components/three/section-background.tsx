'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { FloatingParticles } from './floating-particles'

// Modern SaaS colors
const COLORS = {
    primary: '#0EA5E9',
    secondary: '#0284C7',
    accent: '#38BDF8',
}

// Mouse-reactive light for section backgrounds
function SectionMouseLight() {
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
        const x = mousePos.x * (viewport.width / 2)
        const y = mousePos.y * (viewport.height / 2)
        lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x, 0.08)
        lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y, 0.08)
    })

    return (
        <pointLight
            ref={lightRef}
            position={[0, 0, 3]}
            intensity={2}
            color={COLORS.primary}
            distance={15}
            decay={2}
        />
    )
}

interface SectionBackgroundProps {
    className?: string
    particleCount?: number
    particleColor?: string
    showLight?: boolean
}

export function SectionBackground({
    className,
    particleCount = 50,
    particleColor = COLORS.primary,
    showLight = true,
}: SectionBackgroundProps) {
    return (
        <div className={`absolute inset-0 pointer-events-none ${className || ''}`}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.1} />
                    {showLight && <SectionMouseLight />}
                    <FloatingParticles
                        count={particleCount}
                        spread={8}
                        color={particleColor}
                        size={0.01}
                        speed={0.2}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}

// Lightweight particles-only background (no lighting)
export function ParticleBackground({
    className,
    count = 30,
    color = COLORS.primary,
}: {
    className?: string
    count?: number
    color?: string
}) {
    return (
        <div className={`absolute inset-0 pointer-events-none ${className || ''}`}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <FloatingParticles count={count} spread={10} color={color} size={0.008} speed={0.15} />
                </Suspense>
            </Canvas>
        </div>
    )
}
