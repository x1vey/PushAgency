'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FloatingParticlesProps {
    count?: number
    size?: number
    color?: string
    spread?: number
    speed?: number
}

export function FloatingParticles({
    count = 200,
    size = 0.015,
    color = '#a855f7',
    spread = 10,
    speed = 0.3,
}: FloatingParticlesProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Generate random positions and velocities
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * spread,
                    (Math.random() - 0.5) * spread,
                    (Math.random() - 0.5) * spread * 0.5,
                ],
                velocity: [
                    (Math.random() - 0.5) * 0.01 * speed,
                    (Math.random() - 0.5) * 0.01 * speed,
                    (Math.random() - 0.5) * 0.005 * speed,
                ],
                scale: Math.random() * 0.5 + 0.5,
                phase: Math.random() * Math.PI * 2,
            })
        }
        return temp
    }, [count, spread, speed])

    useFrame((state) => {
        if (!meshRef.current) return

        const time = state.clock.elapsedTime

        particles.forEach((particle, i) => {
            // Floating motion
            const x = particle.position[0] + Math.sin(time * 0.5 + particle.phase) * 0.1
            const y = particle.position[1] + Math.cos(time * 0.3 + particle.phase) * 0.15
            const z = particle.position[2] + Math.sin(time * 0.4 + particle.phase) * 0.05

            dummy.position.set(x, y, z)
            dummy.scale.setScalar(particle.scale * (0.8 + Math.sin(time + particle.phase) * 0.2))
            dummy.updateMatrix()
            meshRef.current!.setMatrixAt(i, dummy.matrix)
        })

        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[size, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
        </instancedMesh>
    )
}
