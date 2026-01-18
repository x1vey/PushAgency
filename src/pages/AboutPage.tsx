import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TreeScene, Parallax3DLayer } from '@/components/three';
import { Spotlight } from '@/components/ui/spotlight';
import { SectionTransition, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/section-transition';

const features = [
    {
        number: '01',
        title: 'Custom Website',
        subtitle: 'Development',
        description: 'We craft high-performance websites that convert visitors into clients. Built with modern technologies, optimized for speed, and designed to scale with your business growth.',
    },
    {
        number: '02',
        title: 'Workflow',
        subtitle: 'Automation',
        description: 'Save 20+ hours per week with intelligent automation systems. We connect your tools, eliminate repetitive tasks, and create seamless workflows that work while you sleep.',
    },
    {
        number: '03',
        title: 'Client Portal',
        subtitle: 'Systems',
        description: 'Custom dashboards and portals that enhance client engagement. Provide a seamless experience where clients can access resources, track progress, and interact with your services.',
    },
    {
        number: '04',
        title: 'Data Analytics',
        subtitle: 'Platform',
        description: 'Transform raw data into actionable insights. Our analytics platforms help you understand client behavior, optimize processes, and make data-driven decisions that drive growth.',
    },
    {
        number: '05',
        title: 'System',
        subtitle: 'Integration',
        description: 'Connect all your tools into one cohesive ecosystem. We integrate CRMs, payment processors, email platforms, and more, creating a unified workflow that eliminates manual work.',
    },
    {
        number: '06',
        title: 'Ongoing',
        subtitle: 'Support',
        description: 'We grow with you. Continuous updates, improvements, and maintenance ensure your systems stay current, secure, and aligned with your evolving business needs.',
    },
    {
        number: '07',
        title: 'Strategic',
        subtitle: 'Consulting',
        description: 'Beyond development, we provide strategic guidance on technology decisions. From choosing the right tools to scaling your infrastructure, we help you navigate the tech landscape.',
    },
];

const AboutPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [visibleTextIndex, setVisibleTextIndex] = useState(-1);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const isFeaturesInView = useInView(featuresRef, { once: false, margin: '-100px' });

    // Create text items that emerge from tree
    const textItems = useMemo(() => {
        const positions: Array<[number, number, number]> = [
            [-2.5, 2, 0],
            [-2, 3.5, 0],
            [2, 3.8, 0],
            [2.5, 2, 0],
            [1.5, 0, 0],
            [-2, -0.5, 0],
            [0, -1.5, 0],
        ];
        return features.map((feature, index) => ({
            text: `${feature.number}\n${feature.title}\n${feature.subtitle}`,
            position: positions[index] || [0, 0, 0],
            delay: index * 0.2,
        }));
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrollProgress(latest);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    // Reveal text items as user scrolls
    useEffect(() => {
        const initialTimer = setTimeout(() => {
            setVisibleTextIndex(0);
        }, 1000);

        if (isFeaturesInView) {
            const interval = setInterval(() => {
                setVisibleTextIndex((prev) => {
                    if (prev < textItems.length - 1) {
                        return prev + 1;
                    }
                    clearInterval(interval);
                    return prev;
                });
            }, 600);
            return () => {
                clearInterval(interval);
                clearTimeout(initialTimer);
            };
        }
        return () => clearTimeout(initialTimer);
    }, [isFeaturesInView, textItems.length]);

    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);

    return (
        <Parallax3DLayer>
            <div ref={containerRef} className="min-h-screen bg-dark font-sans text-white overflow-x-hidden">
                <Navbar />

                {/* Hero Section */}
                <motion.section
                    ref={heroRef}
                    style={{ opacity: heroOpacity }}
                    className="relative h-screen flex items-center justify-center overflow-hidden"
                >
                    <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#0EA5E9" />

                    {/* Three.js Tree Background */}
                    <motion.div
                        style={{ scale: heroScale }}
                        className="absolute inset-0 z-0 will-change-transform"
                    >
                        <div className="absolute inset-0 w-full h-full">
                            <TreeScene
                                className="w-full h-full"
                                scrollProgress={scrollProgress}
                                textItems={textItems}
                                visibleTextIndex={visibleTextIndex}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/20 to-dark pointer-events-none z-10" />
                    </motion.div>

                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl mx-auto"
                        >
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light mb-6 tracking-tight">
                                About
                            </h1>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-8 tracking-tight text-gradient-nature">
                                Catalyst Digital
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                                Step into the world of digital transformation. We are more than developers—we are architects of scalable, intelligent systems that empower businesses to thrive.
                            </p>
                        </motion.div>
                    </div>

                    {/* Section Counter - nature-beyond.tech style */}
                    <motion.div
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                    >
                        {features.map((_, index) => (
                            <motion.div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${visibleTextIndex >= index
                                    ? 'bg-accent scale-125'
                                    : 'bg-white/20 scale-100'
                                    }`}
                                initial={{ scale: 0 }}
                                animate={{ scale: visibleTextIndex >= index ? 1.25 : 1 }}
                                transition={{ delay: index * 0.1 }}
                            />
                        ))}
                        <div className="text-xs text-white/40 mt-4 font-mono">
                            {visibleTextIndex + 1} / {features.length}
                        </div>
                    </motion.div>

                    {/* Scanning Status Overlay */}
                    <motion.div
                        className="absolute bottom-20 left-6 z-20 font-mono text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-accent"
                        >
                            Scanning
                        </motion.div>
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                            className="text-white/60 text-xs mt-1"
                        >
                            Topology Analysis
                        </motion.div>
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                            className="text-white/40 text-xs mt-1"
                        >
                            Generating data...
                        </motion.div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="w-6 h-10 rounded-full border-2 border-accent/30 flex justify-center pt-2">
                            <div className="w-1.5 h-3 bg-accent/50 rounded-full" />
                        </div>
                        <p className="text-xs text-white/50 mt-2 text-center">Scroll</p>
                    </motion.div>
                </motion.section>

                {/* Features Section */}
                <section ref={featuresRef} className="relative py-24">
                    <SectionDivider direction="top" />
                    <div className="container mx-auto px-6 max-w-6xl relative z-10">
                        <div className="space-y-32 sm:space-y-40">
                            {features.map((feature, index) => (
                                <SectionTransition
                                    key={index}
                                    type={index % 2 === 0 ? 'slideRight' : 'slideLeft'}
                                    delay={index * 0.05}
                                >
                                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                                        <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="text-6xl sm:text-7xl font-light text-accent/30">
                                                    {feature.number}
                                                </span>
                                                <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
                                            </div>
                                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-2 tracking-tight">
                                                {feature.title}
                                            </h3>
                                            <h4 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6 text-gray-400 tracking-tight">
                                                {feature.subtitle}
                                            </h4>
                                        </div>
                                        <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </SectionTransition>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Closing Section */}
                <section className="relative py-24">
                    <SectionDivider direction="top" color="rgba(8, 28, 21, 0.3)" />
                    <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
                        <SectionTransition type="fadeUp">
                            <div className="space-y-6">
                                <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
                                    Featuring cutting-edge technology, we harness the power of modern frameworks and tools to translate your vision into high-performance digital solutions.
                                </p>
                                <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
                                    Feel free to reach out if you have a project at{' '}
                                    <a
                                        href="mailto:hello@catalystdigital.com"
                                        className="text-accent hover:text-accent-light transition-colors underline"
                                    >
                                        hello@catalystdigital.com
                                    </a>
                                </p>
                            </div>
                        </SectionTransition>
                    </div>
                </section>

                <Footer />
            </div>
        </Parallax3DLayer>
    );
};

export default AboutPage;
