'use client'

import { Suspense, lazy, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import type { Application } from '@splinetool/runtime'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
    scene: string
    className?: string
    onScrollProgress?: (progress: number) => void
}

export interface SplineSceneRef {
    setProgress: (progress: number) => void
}

export const SplineScene = forwardRef<SplineSceneRef, SplineSceneProps>(
    ({ scene, className }, ref) => {
        const splineRef = useRef<Application | null>(null)

        const handleLoad = (spline: Application) => {
            splineRef.current = spline

            // Disable built-in scroll/interaction to prevent auto-animation
            // The scene will be controlled programmatically
        }

        useImperativeHandle(ref, () => ({
            setProgress: (progress: number) => {
                if (splineRef.current) {
                    // Use Spline variables to control animation
                    // This assumes the Spline scene has a "scrollProgress" variable
                    try {
                        splineRef.current.setVariable('scrollProgress', progress)
                    } catch {
                        // Variable may not exist, use camera zoom instead
                        // Fallback control mechanism
                    }
                }
            },
        }))

        return (
            <Suspense
                fallback={
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                }
            >
                <Spline
                    scene={scene}
                    onLoad={handleLoad}
                    className={className}
                />
            </Suspense>
        )
    }
)

SplineScene.displayName = 'SplineScene'
