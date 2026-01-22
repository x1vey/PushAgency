import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Rocket, Monitor, BarChart2, Zap, Users, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PageLayout } from '@/components/page-layout'
import { HeroScene, Parallax3DLayer } from '@/components/three'
import { Spotlight } from '@/components/ui/spotlight'
import { Card, CardContent } from '@/components/ui/card'
import MultiOrbitSemiCircle from '@/components/ui/multi-orbit-semi-circle'
import { SectionTransition, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/section-transition'
import { PricingSectionWithRobot } from '@/components/ui/pricing-section-with-robot';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/ui/animated-hero';
import { GlowingCard } from '@/components/ui/glowing-card';
import AnimatedTextCycle from '@/components/ui/animated-text-cycle';

gsap.registerPlugin(ScrollTrigger)

const deliverables = [
    { icon: Monitor, title: 'Custom Websites', desc: 'High-converting landing pages that turn visitors into clients.' },
    { icon: Zap, title: 'Workflow Automation', desc: 'Save 20+ hours/week with smart automation systems.' },
    { icon: Users, title: 'Client Portals', desc: 'Custom dashboards for seamless client engagement.' },
    { icon: BarChart2, title: 'Analytics', desc: 'Data-driven insights to optimize your business.' },
    { icon: Rocket, title: 'System Integration', desc: 'Connect all your tools seamlessly.' },
    { icon: Shield, title: 'Ongoing Support', desc: 'We grow with you—updates, fixes, improvements.' },
]

const stats = [
    { value: '50+', label: 'Clients Served' },
    { value: '200+', label: 'Hours Saved Monthly' },
    { value: '98%', label: 'Client Satisfaction' },
]

const Home = () => {
    const heroContainerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const taglineRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const badgeRef = useRef<HTMLDivElement>(null)
    const sceneWrapperRef = useRef<HTMLDivElement>(null)
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main hero scroll timeline
            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroContainerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        setScrollProgress(self.progress)
                    },
                },
            })

            // Scene zoom/transform animation
            heroTl.to(
                sceneWrapperRef.current,
                {
                    scale: 1.3,
                    opacity: 0.2,
                    ease: 'none',
                },
                0
            )

            // Badge fade out early
            heroTl.to(
                badgeRef.current,
                {
                    opacity: 0,
                    y: -30,
                    ease: 'none',
                },
                0
            )

            // Title animation - fade and move up
            heroTl.to(
                titleRef.current,
                {
                    opacity: 0,
                    y: -100,
                    ease: 'none',
                },
                0.1
            )

            // Tagline follows title
            heroTl.to(
                taglineRef.current,
                {
                    opacity: 0,
                    y: -80,
                    ease: 'none',
                },
                0.15
            )

            // CTA buttons fade last
            heroTl.to(
                ctaRef.current,
                {
                    opacity: 0,
                    y: -50,
                    ease: 'none',
                },
                0.2
            )
        })

        return () => ctx.revert()
    }, [])

    return (
        <PageLayout>
            {/* Hero Section - Pinned with scroll-controlled animations */}
            <section
                ref={heroContainerRef}
                className="relative h-screen flex items-center overflow-hidden bg-white"
            >
                {/* Spotlight - Gray/Black */}
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#333333" />

                {/* Three.js Background */}
                <div
                    ref={sceneWrapperRef}
                    className="absolute inset-0 z-0 will-change-transform"
                >
                    <HeroScene
                        className="w-full h-full"
                        scrollProgress={scrollProgress}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-white pointer-events-none" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 sm:pt-32">
                    <Hero />
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-black/30 flex justify-center pt-2">
                        <div className="w-1.5 h-3 bg-black/50 rounded-full" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">Scroll</p>
                </motion.div>
            </section>

            {/* Deliverables Section */}
            <section className="py-16 sm:py-24 relative bg-gray-50">
                <SectionDivider direction="top" color="#FFFFFF" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <SectionTransition type="fadeUp" className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-black">What We Deliver</h2>
                        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
                            End-to-end tech solutions designed for the unique needs of coaches and consultants.
                        </p>
                    </SectionTransition>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {deliverables.map((item, index) => (
                            <GlowingCard
                                key={index}
                                title={item.title}
                                description={item.desc}
                                icon={<item.icon size={20} className="text-black" />}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Transformation Section */}
            <section className="py-16 sm:py-24 relative bg-white">
                <SectionDivider direction="both" color="#f9fafb" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <SectionTransition type="fadeUp" className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-black">The Transformation</h2>
                        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
                            Real results for coaches and consultants who partnered with us.
                        </p>
                    </SectionTransition>

                    <StaggerContainer className="grid sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <StaggerItem key={index} type="scaleUp">
                                <div className="text-center p-6 sm:p-8 bg-gray-50 rounded-none border border-gray-100 hover:border-black transition-all duration-300">
                                    <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-500 font-medium uppercase tracking-wider text-xs sm:text-sm">
                                        {stat.label}
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    <SectionTransition type="fadeUp" delay={0.3} className="text-center mt-12 sm:mt-16">
                        <Link
                            to="/booking"
                        >
                            <Button variant="premium" className="px-10 py-8 text-xl h-auto rounded-none">
                                Start Your Transformation <ArrowRight className="ml-2 w-6 h-6" />
                            </Button>
                        </Link>
                    </SectionTransition>
                </div>
            </section>

            {/* Pricing Section (Old) */}
            <PricingSectionWithRobot />

            {/* Animated Tagline Section */}
            <section className="py-16 sm:py-20 bg-gray-50 relative">
                <SectionDivider direction="top" color="#FFFFFF" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 leading-relaxed">
                        Your{' '}
                        <AnimatedTextCycle
                            words={[
                                "business",
                                "vision",
                                "workflow",
                                "success",
                                "growth",
                                "future"
                            ]}
                            interval={3000}
                            className="text-black font-semibold"
                        />{' '}
                        deserves better tools.
                    </p>
                </div>
            </section>
        </PageLayout>
    )
}

export default Home

