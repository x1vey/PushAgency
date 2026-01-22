'use client'

import { useState, useEffect } from 'react'
import CubeLoader from './cube-loader'

interface InitialLoaderProps {
    children: React.ReactNode
}

export default function InitialLoader({ children }: InitialLoaderProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        let isReady = false

        const checkReady = () => {
            if (isReady) return

            // Check if document is ready and fonts are loaded
            if (document.readyState === 'complete') {
                // Wait for fonts to load as well
                document.fonts.ready.then(() => {
                    // Add a small buffer to ensure everything is painted
                    setTimeout(() => {
                        isReady = true
                        setIsLoading(false)
                        // Wait for fade animation to complete
                        setTimeout(() => setIsVisible(false), 500)
                    }, 300)
                })
            }
        }

        // Check immediately
        checkReady()

        // Also listen for load event
        window.addEventListener('load', checkReady)

        // Fallback: if readyState changes
        document.addEventListener('readystatechange', checkReady)

        // Safety timeout - max 8 seconds loading
        const maxTimeout = setTimeout(() => {
            if (!isReady) {
                isReady = true
                setIsLoading(false)
                setTimeout(() => setIsVisible(false), 500)
            }
        }, 8000)

        return () => {
            window.removeEventListener('load', checkReady)
            document.removeEventListener('readystatechange', checkReady)
            clearTimeout(maxTimeout)
        }
    }, [])

    if (!isVisible) {
        return <>{children}</>
    }

    return (
        <>
            {/* Loading Screen */}
            <div
                className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <CubeLoader />
            </div>
            {/* Render children in background so they can load */}
            <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
                {children}
            </div>
        </>
    )
}
