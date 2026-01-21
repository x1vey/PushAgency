'use client'

import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Float, Environment, Line } from '@react-three/drei'
import * as THREE from 'three'
import { FloatingParticles } from './floating-particles'

// Modern SaaS color scheme matching new design system
// Modern SaaS color scheme matching new design system
const TREE_COLORS = {
    trunk: '#334155', // Secondary (Steel Blue)
    trunkDark: '#1E293B', // Muted/Darker Steel
    leaves: '#0F172A', // Dark Blue
    leavesLight: '#0EA5E9', // Accent (Vibrant Teal)
    leavesBright: '#38BDF8', // Accent Light
    glow: '#0EA5E9', // Accent (Teal)
    wireframe: '#22D3EE', // Accent Bright
    ambient: '#0A0F1C', // Background (Ocean Deep)
    node: '#F97316', // Primary (Warm Coral) for contrast
}

// Data nodes that appear on the tree like nature-beyond.tech
function DataNodes({ count = 12, visible = true }: { count?: number; visible?: boolean }) {
    const nodesRef = useRef<THREE.Group>(null)

    const nodes = useMemo(() => {
        const nodeData = []
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2
            const radius = 0.8 + Math.random() * 1.2
            const height = 1.5 + Math.random() * 3
            nodeData.push({
                position: [
                    Math.cos(angle) * radius,
                    height,
                    Math.sin(angle) * radius
                ] as [number, number, number],
                scale: 0.03 + Math.random() * 0.04,
                delay: i * 0.1,
            })
        }
        return nodeData
    }, [count])

    useFrame((state) => {
        if (!nodesRef.current) return
        const time = state.clock.elapsedTime
        nodesRef.current.children.forEach((child, i) => {
            if (child instanceof THREE.Mesh) {
                const pulse = 0.8 + Math.sin(time * 2 + i * 0.5) * 0.2
                child.scale.setScalar(nodes[i]?.scale * pulse || 0.03)
            }
        })
    })

    if (!visible) return null

    return (
        <group ref={nodesRef} position={[0, -2.5, 0]}>
            {nodes.map((node, i) => (
                <mesh key={i} position={node.position}>
                    <sphereGeometry args={[node.scale, 16, 16]} />
                    <meshBasicMaterial
                        color={TREE_COLORS.node}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
            ))}
        </group>
    )
}

// Tech wireframe overlay that appears on scroll
function TechWireframe({ progress = 0 }: { progress?: number }) {
    const wireframeRef = useRef<THREE.Group>(null)

    // Create wireframe lines representing data flow
    const lines = useMemo(() => {
        const lineData = []
        // Vertical data streams
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2
            const radius = 0.3 + (i % 2) * 0.2
            const points = []
            for (let j = 0; j < 20; j++) {
                const y = -0.5 + (j / 20) * 5
                const offset = Math.sin(y * 2 + i) * 0.1
                points.push(new THREE.Vector3(
                    Math.cos(angle) * radius + offset,
                    y,
                    Math.sin(angle) * radius + offset
                ))
            }
            lineData.push(points)
        }
        return lineData
    }, [])

    useFrame((state) => {
        if (!wireframeRef.current) return
        const time = state.clock.elapsedTime
        wireframeRef.current.rotation.y = time * 0.05
    })

    const opacity = Math.min(progress * 2, 0.6)

    return (
        <group ref={wireframeRef} position={[0, -2.5, 0]}>
            {lines.map((points, i) => (
                <Line
                    key={i}
                    points={points}
                    color={TREE_COLORS.wireframe}
                    lineWidth={1}
                    transparent
                    opacity={opacity}
                    dashed
                    dashSize={0.1}
                    gapSize={0.05}
                />
            ))}
        </group>
    )
}

// Scanning line effect like nature-beyond.tech
function ScanEffect({ speed = 0.5 }: { speed?: number }) {
    const scanRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!scanRef.current) return
        const time = state.clock.elapsedTime
        // Scan from bottom to top repeatedly
        const cycle = (time * speed) % 2
        const y = -3 + cycle * 4
        scanRef.current.position.y = y
        const material = scanRef.current.material as THREE.MeshBasicMaterial
        material.opacity = 0.4 + Math.sin(time * 4) * 0.2
    })

    return (
        <mesh ref={scanRef} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[6, 0.05]} />
            <meshBasicMaterial
                color={TREE_COLORS.glow}
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

// Realistic tree trunk with branches
function TreeTrunk({ showWireframe = false }: { showWireframe?: boolean }) {
    const treeGroupRef = useRef<THREE.Group>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const trunkGeometry = useMemo(() => new THREE.CylinderGeometry(0.12, 0.22, 4.5, 16), [])

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
        if (!treeGroupRef.current) return
        const time = state.clock.elapsedTime
        treeGroupRef.current.rotation.y = THREE.MathUtils.lerp(
            treeGroupRef.current.rotation.y,
            mousePos.x * 0.12 + time * 0.02,
            0.03
        )
    })

    // Create more organic branch structure
    const branches = useMemo(() => {
        const branchData = []
        const levels = 4
        for (let level = 0; level < levels; level++) {
            const branchCount = 3 + level
            for (let i = 0; i < branchCount; i++) {
                const height = 1 + (level * 0.8)
                const angle = (i / branchCount) * Math.PI * 2 + (level * 0.3)
                const baseRadius = 0.15 + level * 0.1
                branchData.push({
                    position: [
                        Math.cos(angle) * baseRadius,
                        height,
                        Math.sin(angle) * baseRadius
                    ] as [number, number, number],
                    rotation: [
                        0.3 + Math.random() * 0.4,
                        angle,
                        0
                    ] as [number, number, number],
                    length: 0.5 + Math.random() * 0.4,
                    thickness: 0.02 + (levels - level) * 0.008
                })
            }
        }
        return branchData
    }, [])

    return (
        <group ref={treeGroupRef} position={[0, -2.5, 0]}>
            {/* Main trunk */}
            <mesh position={[0, 2.25, 0]}>
                <cylinderGeometry args={[0.12, 0.22, 4.5, 16]} />
                <meshStandardMaterial
                    color={TREE_COLORS.trunk}
                    roughness={0.85}
                    metalness={0.1}
                    emissive={TREE_COLORS.glow}
                    emissiveIntensity={0.03}
                />
            </mesh>

            {/* Wireframe overlay */}
            {showWireframe && (
                <lineSegments position={[0, 2.25, 0]}>
                    <edgesGeometry args={[trunkGeometry]} />
                    <lineBasicMaterial color={TREE_COLORS.wireframe} transparent opacity={0.4} />
                </lineSegments>
            )}

            {/* Branches */}
            {branches.map((branch, i) => (
                <group key={i} position={branch.position} rotation={branch.rotation}>
                    <mesh>
                        <cylinderGeometry args={[branch.thickness * 0.6, branch.thickness, branch.length, 6]} />
                        <meshStandardMaterial
                            color={TREE_COLORS.trunkDark}
                            roughness={0.9}
                            metalness={0.05}
                        />
                    </mesh>
                </group>
            ))}

            {/* Root base */}
            <mesh position={[0, -0.15, 0]}>
                <cylinderGeometry args={[0.28, 0.22, 0.5, 16]} />
                <meshStandardMaterial
                    color={TREE_COLORS.trunkDark}
                    roughness={0.95}
                    metalness={0.05}
                />
            </mesh>
        </group>
    )
}

// Enhanced foliage with more organic shapes
function TreeFoliage({ scrollProgress = 0 }: { scrollProgress?: number }) {
    const foliageRef = useRef<THREE.Group>(null)
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
        if (!foliageRef.current) return
        const time = state.clock.elapsedTime
        foliageRef.current.rotation.y = THREE.MathUtils.lerp(
            foliageRef.current.rotation.y,
            mousePos.x * 0.08 + time * 0.03,
            0.03
        )
    })

    // Create layered foliage clusters
    const foliageClusters = useMemo(() => {
        const clusters = []
        // Main canopy - larger clusters
        for (let layer = 0; layer < 3; layer++) {
            const clusterCount = 8 + layer * 4
            for (let i = 0; i < clusterCount; i++) {
                const angle = (i / clusterCount) * Math.PI * 2 + layer * 0.2
                const radius = 0.3 + layer * 0.25 + Math.random() * 0.3
                const height = 2.8 + layer * 0.5 + Math.random() * 0.4
                clusters.push({
                    position: [
                        Math.cos(angle) * radius,
                        height,
                        Math.sin(angle) * radius
                    ] as [number, number, number],
                    scale: 0.25 + Math.random() * 0.2 - layer * 0.05,
                    color: layer === 0 ? TREE_COLORS.leavesBright :
                        layer === 1 ? TREE_COLORS.leavesLight : TREE_COLORS.leaves,
                    rotation: [Math.random() * 0.4, Math.random() * Math.PI * 2, Math.random() * 0.3] as [number, number, number],
                    floatSpeed: 0.3 + Math.random() * 0.4,
                })
            }
        }
        return clusters
    }, [])

    return (
        <group ref={foliageRef} position={[0, -0.5, 0]}>
            {foliageClusters.map((cluster, i) => (
                <Float
                    key={i}
                    speed={cluster.floatSpeed}
                    rotationIntensity={0.08}
                    floatIntensity={0.12}
                >
                    <mesh
                        position={cluster.position}
                        scale={cluster.scale}
                        rotation={cluster.rotation}
                    >
                        <dodecahedronGeometry args={[0.8, 0]} />
                        <meshStandardMaterial
                            color={cluster.color}
                            roughness={0.5}
                            metalness={0.15}
                            emissive={cluster.color}
                            emissiveIntensity={0.06 + scrollProgress * 0.04}
                            flatShading={true}
                        />
                    </mesh>
                </Float>
            ))}

            {/* Central crown - larger icosahedron */}
            <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.15}>
                <mesh position={[0, 3.8, 0]} scale={1.1}>
                    <icosahedronGeometry args={[1.3, 1]} />
                    <meshStandardMaterial
                        color={TREE_COLORS.leavesBright}
                        roughness={0.4}
                        metalness={0.2}
                        emissive={TREE_COLORS.glow}
                        emissiveIntensity={0.1 + scrollProgress * 0.05}
                    />
                </mesh>
            </Float>

            {/* Glowing core */}
            <mesh position={[0, 3.8, 0]}>
                <sphereGeometry args={[0.25, 16, 16]} />
                <meshBasicMaterial
                    color={TREE_COLORS.glow}
                    transparent
                    opacity={0.7}
                />
            </mesh>
            <pointLight color={TREE_COLORS.glow} intensity={4} distance={15} position={[0, 3.8, 0]} />
        </group>
    )
}

// 3D Text that emerges from tree
interface EmergingTextProps {
    text: string
    position: [number, number, number]
    delay: number
    isVisible: boolean
    fontSize?: number
}

function EmergingText({ text, position, delay, isVisible, fontSize = 0.15 }: EmergingTextProps) {
    const textRef = useRef<THREE.Group>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [emergeProgress, setEmergeProgress] = useState(0)

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1
            const y = -(event.clientY / window.innerHeight) * 2 + 1
            setMousePos({ x, y })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setEmergeProgress(1)
            }, delay * 1000)
            return () => clearTimeout(timer)
        } else {
            setEmergeProgress(0)
        }
    }, [isVisible, delay])

    useFrame((state) => {
        if (!textRef.current) return
        const time = state.clock.elapsedTime

        // Smooth emergence animation
        const baseZ = position[2]
        const easeOut = 1 - Math.pow(1 - emergeProgress, 3)
        textRef.current.position.z = THREE.MathUtils.lerp(
            textRef.current.position.z,
            baseZ + easeOut * 4,
            0.1
        )

        // Scale animation
        const targetScale = 0.2 + emergeProgress * 0.8
        const bounce = emergeProgress < 1 ? Math.sin(emergeProgress * Math.PI * 2) * 0.08 : 0
        const currentScale = textRef.current.scale.x
        const newScale = THREE.MathUtils.lerp(currentScale, targetScale + bounce, 0.12)
        textRef.current.scale.setScalar(newScale)

        // Opacity update
        textRef.current.children.forEach((child) => {
            if (child instanceof THREE.Mesh && child.material) {
                const material = child.material as THREE.MeshStandardMaterial
                if (material.opacity !== undefined) {
                    material.opacity = THREE.MathUtils.lerp(material.opacity, emergeProgress, 0.12)
                }
                if (emergeProgress > 0.9) {
                    const pulse = 0.5 + Math.sin(time * 2) * 0.15
                    material.emissiveIntensity = pulse
                }
            }
        })

        // Mouse follow
        textRef.current.rotation.y = THREE.MathUtils.lerp(
            textRef.current.rotation.y,
            mousePos.x * 0.15 * emergeProgress,
            0.06
        )

        // Floating
        const floatAmount = emergeProgress * 0.15
        textRef.current.position.y = position[1] + Math.sin(time * 0.4 + delay) * floatAmount
        textRef.current.position.x = position[0] + Math.cos(time * 0.25 + delay) * floatAmount * 0.5
    })

    const lines = text.split('\n').filter(line => line.trim())

    if (emergeProgress < 0.01) return null

    return (
        <group ref={textRef} position={[position[0], position[1], position[2]]}>
            {lines.map((line, index) => {
                try {
                    return (
                        <Text
                            key={index}
                            position={[0, (lines.length - 1 - index) * fontSize * 1.2, 0]}
                            fontSize={fontSize * (index === 0 ? 0.75 : 1)}
                            color="#ffffff"
                            anchorX="center"
                            anchorY="middle"
                            outlineWidth={0.008}
                            outlineColor={TREE_COLORS.glow}
                            sdfGlyphSize={16}
                        >
                            {line}
                            <meshStandardMaterial
                                color="#ffffff"
                                emissive={TREE_COLORS.glow}
                                emissiveIntensity={0.5}
                                metalness={0.6}
                                roughness={0.25}
                                transparent
                                opacity={emergeProgress}
                            />
                        </Text>
                    )
                } catch {
                    return (
                        <mesh key={index} position={[0, (lines.length - 1 - index) * fontSize * 1.2, 0]}>
                            <planeGeometry args={[fontSize * line.length * 0.5, fontSize]} />
                            <meshStandardMaterial
                                color={TREE_COLORS.glow}
                                transparent
                                opacity={emergeProgress * 0.5}
                            />
                        </mesh>
                    )
                }
            })}
            {emergeProgress > 0.1 && (
                <pointLight
                    color={TREE_COLORS.glow}
                    intensity={emergeProgress * 1.5}
                    distance={8}
                    position={[0, 0, 0]}
                />
            )}
        </group>
    )
}

// Mouse-following light
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
        lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, x, 0.08)
        lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, y, 0.08)
    })

    return (
        <pointLight
            ref={lightRef}
            position={[0, 0, 5]}
            intensity={2}
            color={TREE_COLORS.glow}
            distance={20}
            decay={2}
        />
    )
}

// Scene content
interface TreeSceneContentProps {
    scrollProgress?: number
    textItems?: Array<{ text: string; position: [number, number, number]; delay: number }>
    visibleTextIndex?: number
}

function TreeSceneContent({
    scrollProgress = 0,
    textItems = [],
    visibleTextIndex = -1,
}: TreeSceneContentProps) {
    const showWireframe = scrollProgress > 0.15 && scrollProgress < 0.85
    const showDataNodes = scrollProgress > 0.1

    return (
        <>
            {/* Ambient and directional lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 8, 5]} intensity={0.8} color={TREE_COLORS.glow} />
            <directionalLight position={[-5, 4, -5]} intensity={0.4} color={TREE_COLORS.leavesBright} />
            <directionalLight position={[0, -3, 4]} intensity={0.25} color={TREE_COLORS.leavesLight} />
            <MouseFollowLight />

            {/* Tech visualization overlays */}
            <TechWireframe progress={scrollProgress} />
            <ScanEffect speed={0.4} />
            <DataNodes count={15} visible={showDataNodes} />

            {/* Tree components */}
            <TreeTrunk showWireframe={showWireframe} />
            <TreeFoliage scrollProgress={scrollProgress} />

            {/* Emerging text */}
            {textItems && textItems.length > 0 && textItems.map((item, index) => (
                <EmergingText
                    key={`text-${index}`}
                    text={item.text}
                    position={item.position}
                    delay={item.delay}
                    isVisible={visibleTextIndex >= index}
                />
            ))}

            {/* Nature particles */}
            <FloatingParticles count={100} spread={16} color={TREE_COLORS.leavesBright} size={0.015} />
            <FloatingParticles count={50} spread={12} color={TREE_COLORS.glow} size={0.012} />
        </>
    )
}

// Responsive camera
function ResponsiveCamera() {
    const { camera, size } = useThree()
    const cameraRef = camera as THREE.PerspectiveCamera

    useEffect(() => {
        const handleResize = () => {
            if (cameraRef) {
                const isMobile = size.width < 768
                cameraRef.position.z = isMobile ? 12 : 10
                cameraRef.position.y = 1
                cameraRef.fov = isMobile ? 65 : 55
                cameraRef.updateProjectionMatrix()
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [cameraRef, size])

    return null
}

// Main exported component
interface TreeSceneProps {
    className?: string
    scrollProgress?: number
    textItems?: Array<{ text: string; position: [number, number, number]; delay: number }>
    visibleTextIndex?: number
}

export function TreeScene({
    className,
    scrollProgress = 0,
    textItems = [],
    visibleTextIndex = -1,
}: TreeSceneProps) {
    const [isMobile, setIsMobile] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    if (error) {
        console.error('TreeScene error:', error)
        return (
            <div className={className} style={{ background: 'rgba(8, 28, 21, 0.3)' }}>
                <div className="text-white text-center p-4">3D Scene Error</div>
            </div>
        )
    }

    return (
        <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Canvas
                camera={{ position: [0, 1, isMobile ? 12 : 10], fov: isMobile ? 65 : 55 }}
                dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                onCreated={(state) => {
                    state.scene.background = null
                }}
            >
                <Suspense
                    fallback={
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[1, 1, 1]} />
                            <meshBasicMaterial color={TREE_COLORS.glow} />
                        </mesh>
                    }
                >
                    <ErrorBoundary setError={setError}>
                        <ResponsiveCamera />
                        <TreeSceneContent
                            scrollProgress={scrollProgress}
                            textItems={textItems || []}
                            visibleTextIndex={visibleTextIndex}
                        />
                    </ErrorBoundary>
                </Suspense>
            </Canvas>
        </div>
    )
}

// Simple error boundary
function ErrorBoundary({ children, setError }: { children: React.ReactNode; setError: (error: string | null) => void }) {
    useEffect(() => {
        const errorHandler = (event: ErrorEvent) => {
            console.error('3D Scene Error:', event.error)
            setError(event.message || 'Unknown error')
        }
        const unhandledRejection = (event: PromiseRejectionEvent) => {
            console.error('3D Scene Promise Rejection:', event.reason)
            setError(String(event.reason) || 'Promise rejection')
        }
        window.addEventListener('error', errorHandler)
        window.addEventListener('unhandledrejection', unhandledRejection)
        return () => {
            window.removeEventListener('error', errorHandler)
            window.removeEventListener('unhandledrejection', unhandledRejection)
        }
    }, [setError])

    return <>{children}</>
}
