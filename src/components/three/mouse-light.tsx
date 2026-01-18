'use client'

import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface MouseLightProps {
    intensity?: number
    color?: string
    distance?: number
}

export function MouseLight({
    intensity = 2,
    color = '#ffffff',
    distance = 15,
}: MouseLightProps) {
    const lightRef = useRef<THREE.PointLight>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const { viewport, camera } = useThree()

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Normalize mouse position to -1 to 1
            const x = (event.clientX / window.innerWidth) * 2 - 1
            const y = -(event.clientY / window.innerHeight) * 2 + 1
            setMousePos({ x, y })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useFrame(() => {
        if (!lightRef.current) return

        // Convert normalized coordinates to world space
        const x = mousePos.x * (viewport.width / 2)
        const y = mousePos.y * (viewport.height / 2)

        // Smooth interpolation for fluid movement
        lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x, 0.1)
        lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y, 0.1)
        lightRef.current.position.z = 5
    })

    return (
        <>
            <pointLight
                ref={lightRef}
                intensity={intensity}
                color={color}
                distance={distance}
                decay={2}
            />
            {/* Visible light orb for visual feedback */}
            <mesh position={[0, 0, 5]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0} />
            </mesh>
        </>
    )
}

// Spotlight version for more dramatic effect
export function MouseSpotlight({
    intensity = 3,
    color = '#a855f7',
    angle = 0.5,
    penumbra = 1,
}: {
    intensity?: number
    color?: string
    angle?: number
    penumbra?: number
}) {
    const spotRef = useRef<THREE.SpotLight>(null)
    const targetRef = useRef<THREE.Object3D>(null)
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
        if (!targetRef.current) return

        const x = mousePos.x * (viewport.width / 2)
        const y = mousePos.y * (viewport.height / 2)

        targetRef.current.position.x = THREE.MathUtils.lerp(targetRef.current.position.x, x, 0.08)
        targetRef.current.position.y = THREE.MathUtils.lerp(targetRef.current.position.y, y, 0.08)
        targetRef.current.position.z = 0
    })

    return (
        <>
            <object3D ref={targetRef} position={[0, 0, 0]} />
            <spotLight
                ref={spotRef}
                position={[0, 0, 10]}
                target={targetRef.current || undefined}
                intensity={intensity}
                color={color}
                angle={angle}
                penumbra={penumbra}
                castShadow
            />
        </>
    )
}
