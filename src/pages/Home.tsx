import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Rocket, Monitor, BarChart2, Zap, Users, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { HeroScene, Parallax3DLayer } from '@/components/three'
import { Spotlight } from '@/components/ui/spotlight'
import { Card, CardContent } from '@/components/ui/card'
import MultiOrbitSemiCircle from '@/components/ui/multi-orbit-semi-circle'
import { SectionTransition, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/section-transition'

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
        <Parallax3DLayer className="min-h-screen bg-dark font-sans text-white overflow-x-hidden">
            <Navbar />

            {/* Hero Section - Pinned with scroll-controlled animations */}
            <section
                ref={heroContainerRef}
                className="relative h-screen flex items-center overflow-hidden"
            >
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#0EA5E9" />

                {/* Three.js Background */}
                <div
                    ref={sceneWrapperRef}
                    className="absolute inset-0 z-0 will-change-transform"
                >
                    <HeroScene
                        className="w-full h-full"
                        scrollProgress={scrollProgress}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/30 to-dark pointer-events-none" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 sm:pt-32">
                    <div className="max-w-3xl">
                        <div
                            ref={badgeRef}
                            className="inline-block px-3 sm:px-4 py-1.5 mb-4 sm:mb-6 rounded-full glass text-accent font-medium text-xs sm:text-sm border-accent/30 will-change-transform"
                        >
                            🚀 Tech Solutions for Coaches & Consultants
                        </div>

                        <div ref={titleRef} className="will-change-transform">
                            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-4 sm:mb-6">
                                Scale Your Business with{' '}
                                <span className="text-gradient">Cutting-Edge Tech</span>
                            </h1>
                        </div>

                        <p
                            ref={taglineRef}
                            className="text-base sm:text-xl text-gray-400 mb-6 sm:mb-10 max-w-xl leading-relaxed will-change-transform"
                        >
                            We build custom automation, websites, and systems that free you to focus on what matters—transforming lives.
                        </p>

                        <div ref={ctaRef} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 will-change-transform">
                            <Link
                                to="/pricing"
                                className="group px-6 sm:px-8 py-3 sm:py-4 bg-primary rounded-xl text-dark font-bold text-base sm:text-lg shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_35px_rgba(249,115,22,0.6)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                View Pricing
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/services"
                                className="px-6 sm:px-8 py-3 sm:py-4 glass text-white font-bold text-base sm:text-lg rounded-xl hover:bg-white/10 transition-all transform hover:-translate-y-1 text-center"
                            >
                                Explore Services
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-accent/30 flex justify-center pt-2">
                        <div className="w-1.5 h-3 bg-accent/50 rounded-full" />
                    </div>
                    <p className="text-xs text-white/50 mt-2 text-center">Scroll</p>
                </motion.div>
            </section>

            {/* Deliverables Section */}
            <section className="py-16 sm:py-24 relative">
                <SectionDivider direction="top" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <SectionTransition type="fadeUp" className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">What We Deliver</h2>
                        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
                            End-to-end tech solutions designed for the unique needs of coaches and consultants.
                        </p>
                    </SectionTransition>

                    <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {deliverables.map((item, index) => (
                            <StaggerItem key={index}>
                                <Card className="bg-surface/50 border-accent/10 hover:border-accent/30 transition-all duration-300 h-full group hover:bg-surface/80 backdrop-blur-sm">
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-accent/30 transition-all duration-300">
                                            <item.icon size={20} className="sm:w-6 sm:h-6" />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">{item.title}</h3>
                                        <p className="text-sm sm:text-base text-gray-400">{item.desc}</p>
                                    </CardContent>
                                </Card>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Transformation Section */}
            <section className="py-16 sm:py-24 relative bg-gradient-to-b from-dark to-dark-blue/30">
                <SectionDivider direction="both" color="rgba(15, 23, 42, 0.5)" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <SectionTransition type="fadeUp" className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">The Transformation</h2>
                        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
                            Real results for coaches and consultants who partnered with us.
                        </p>
                    </SectionTransition>

                    <StaggerContainer className="grid sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <StaggerItem key={index} type="scaleUp">
                                <div className="text-center p-6 sm:p-8 glass rounded-2xl hover:scale-105 transition-transform duration-300">
                                    <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gradient-nature mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-400 font-medium uppercase tracking-wider text-xs sm:text-sm">
                                        {stat.label}
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    <SectionTransition type="fadeUp" delay={0.3} className="text-center mt-12 sm:mt-16">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-primary text-dark font-bold text-lg sm:text-xl rounded-xl hover:bg-primary/90 transition-all transform hover:-translate-y-1 shadow-lg glow-amber"
                        >
                            Start Your Transformation
                            <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6" />
                        </Link>
                    </SectionTransition>
                </div>
            </section>

            {/* Integrations Section with Multi-Orbit */}
            <section className="py-16 sm:py-24 relative">
                <SectionDivider direction="top" color="rgba(15, 23, 42, 0.3)" />
                <MultiOrbitSemiCircle />
            </section>

            <Footer />
        </Parallax3DLayer>
    )
}

export default Home
