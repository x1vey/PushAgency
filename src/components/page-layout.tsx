import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { DotScreenShader } from '@/components/ui/dot-shader-background'

interface PageLayoutProps {
    children: ReactNode
    className?: string
    showNavbar?: boolean
    showFooter?: boolean
}

export const PageLayout = ({
    children,
    className = '',
    showNavbar = true,
    showFooter = true
}: PageLayoutProps) => {
    return (
        <div className={`min-h-screen bg-white font-sans text-black overflow-x-hidden relative ${className}`}>
            {/* DotScreenShader as extreme background layer */}
            <div className="fixed inset-0 z-[-1] pointer-events-auto">
                <DotScreenShader />
            </div>

            {/* Main content layer */}
            <div className="relative z-0">
                {showNavbar && <Navbar />}
                {children}
                {showFooter && <Footer />}
            </div>
        </div>
    )
}

export default PageLayout
