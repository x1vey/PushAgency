'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Scanning line effect
export function ScanningLine({ speed = 1 }: { speed?: number }) {
    const lineRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!lineRef.current || !lineRef.current.material) return
        const time = state.clock.elapsedTime
        // Move scanning line up and down
        lineRef.current.position.y = Math.sin(time * speed) * 3
        const material = lineRef.current.material as THREE.MeshBasicMaterial
        if (material.opacity !== undefined) {
            material.opacity = 0.3 + Math.sin(time * speed * 2) * 0.2
        }
    })

    return (
        <mesh ref={lineRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <planeGeometry args={[10, 0.1]} />
            <meshBasicMaterial
                color="#0EA5E9"
                transparent
                opacity={0.4}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

// Topology wireframe effect
export function TopologyWireframe({
    geometry,
    color = '#0EA5E9',
    opacity = 0.6
}: {
    geometry: THREE.BufferGeometry
    color?: string
    opacity?: number
}) {
    return (
        <lineSegments>
            <edgesGeometry args={[geometry]} />
            <lineBasicMaterial color={color} transparent opacity={opacity} />
        </lineSegments>
    )
}

// X-ray visualization effect
export function XRayEffect({
    mesh,
    intensity = 0.3
}: {
    mesh: React.ReactNode
    intensity?: number
}) {
    return (
        <group>
            {mesh}
            <meshStandardMaterial
                emissive="#0EA5E9"
                emissiveIntensity={intensity}
                transparent
                opacity={0.2}
            />
        </group>
    )
}

// Chemical scan particles
export function ChemicalScanParticles({ count = 50 }: { count?: number }) {
    const particlesRef = useRef<THREE.Points>(null)
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    // Initialize positions and colors
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        positions[i3] = (Math.random() - 0.5) * 10
        positions[i3 + 1] = (Math.random() - 0.5) * 10
        positions[i3 + 2] = (Math.random() - 0.5) * 5

        const color = new THREE.Color('#0EA5E9')
        colors[i3] = color.r
        colors[i3 + 1] = color.g
        colors[i3 + 2] = color.b
    }

    useFrame((state) => {
        if (!particlesRef.current) return
        const time = state.clock.elapsedTime
        particlesRef.current.rotation.y = time * 0.1
    })

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                vertexColors
                transparent
                opacity={0.6}
            />
        </points>
    )
}

// Model reflection effect
export function ModelReflection({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!groupRef.current) return
        const time = state.clock.elapsedTime
        // Subtle reflection animation
        groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.1
    })

    return (
        <group ref={groupRef}>
            {children}
        </group>
    )
}
