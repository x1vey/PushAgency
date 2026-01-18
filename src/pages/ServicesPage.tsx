import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Zap, Share2, Users, BarChart2, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';
import { Parallax3DLayer, SectionBackground } from '@/components/three';
import { ServiceAccordion } from '@/components/ui/service-accordion';
import { SectionTransition, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/section-transition';
import { Card, CardContent } from '@/components/ui/card';

const servicesData = [
    {
        id: 1,
        title: "Custom Websites",
        date: "Core",
        content: "High-converting landing pages and booking systems that turn visitors into paying clients. Mobile-first design with blazing fast performance.",
        category: "Web",
        icon: Monitor,
        relatedIds: [2, 3],
        status: "completed" as const,
        energy: 95,
    },
    {
        id: 2,
        title: "Workflow Automation",
        date: "Core",
        content: "Automate repetitive tasks, email sequences, and client onboarding. Save 20+ hours every week with smart automation systems.",
        category: "Automation",
        icon: Zap,
        relatedIds: [1, 3, 4],
        status: "completed" as const,
        energy: 100,
    },
    {
        id: 3,
        title: "System Integration",
        date: "Core",
        content: "Connect your tools seamlessly—CRM, payment processors, calendars, and more. One unified ecosystem for your business.",
        category: "Integration",
        icon: Share2,
        relatedIds: [2, 4],
        status: "in-progress" as const,
        energy: 85,
    },
    {
        id: 4,
        title: "Client Portals",
        date: "Premium",
        content: "Custom dashboards where clients access resources, track progress, and engage with your content. White-labeled to your brand.",
        category: "Platform",
        icon: Users,
        relatedIds: [3, 5],
        status: "in-progress" as const,
        energy: 80,
    },
    {
        id: 5,
        title: "Analytics & Reporting",
        date: "Premium",
        content: "Data-driven insights to understand your business performance and client behavior. Make informed decisions with real-time dashboards.",
        category: "Data",
        icon: BarChart2,
        relatedIds: [4, 6],
        status: "pending" as const,
        energy: 70,
    },
    {
        id: 6,
        title: "Ongoing Support",
        date: "Always",
        content: "We're here when you need us—updates, fixes, and improvements as you grow. Dedicated account management for enterprise clients.",
        category: "Support",
        icon: Shield,
        relatedIds: [1, 5],
        status: "completed" as const,
        energy: 90,
    },
];

// Services cards data for the hero
const serviceCards = [
    {
        icon: Monitor,
        title: "Custom Websites",
        description: "High-converting landing pages and booking systems that turn visitors into clients.",
    },
    {
        icon: Zap,
        title: "Workflow Automation",
        description: "Automate repetitive tasks and save 20+ hours every week.",
    },
    {
        icon: Share2,
        title: "System Integration",
        description: "Connect CRM, payments, calendars—one unified ecosystem.",
    },
    {
        icon: Users,
        title: "Client Portals",
        description: "Custom dashboards white-labeled to your brand.",
    },
    {
        icon: BarChart2,
        title: "Analytics & Reporting",
        description: "Real-time dashboards for data-driven decisions.",
    },
    {
        icon: Shield,
        title: "Ongoing Support",
        description: "Updates, fixes, and improvements as you grow.",
    },
];

const ServicesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Parallax3DLayer>
            <div className="min-h-screen bg-dark font-sans text-white overflow-x-hidden">
                <Navbar />

                {/* Hero Section - What We Build */}
                <section className="relative pt-32 pb-16 min-h-[80vh]">
                    <SectionBackground particleCount={30} showMouseLight={false} />
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <SectionTransition type="fadeUp" className="text-center mb-12">
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                            >
                                What We <span className="text-gradient-nature">Build</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
                            >
                                Comprehensive tech solutions designed for coaches and consultants
                            </motion.p>
                        </SectionTransition>

                        {/* Service Cards Grid */}
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {serviceCards.map((service, index) => (
                                <StaggerItem key={index} type="scaleUp">
                                    <Card className="bg-surface/50 border-accent/10 hover:border-accent/30 transition-all duration-300 h-full group hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                                        <CardContent className="p-6">
                                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                                <service.icon className="w-6 h-6 text-accent" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                            <p className="text-gray-400 text-sm">{service.description}</p>
                                        </CardContent>
                                    </Card>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>

                {/* Interactive Orbital Timeline */}
                <section className="py-12 sm:py-16 relative">
                    <SectionDivider direction="top" />
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <SectionTransition type="fadeUp" className="text-center mb-6 sm:mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Service Ecosystem</h2>
                            <p className="text-gray-400 text-sm sm:text-base">Click on any node to explore how our services connect</p>
                        </SectionTransition>
                        <RadialOrbitalTimeline timelineData={servicesData} />
                    </div>
                </section>

                {/* Our Process - Interactive Accordion */}
                <section className="py-16 sm:py-24 bg-gradient-to-b from-dark to-dark-blue/20 relative">
                    <SectionDivider direction="both" color="rgba(15, 23, 42, 0.3)" />
                    <ServiceAccordion
                        title="Our Process"
                        subtitle="From discovery to delivery, here's how we transform your vision into a powerful digital presence that drives results."
                    />
                </section>

                <Footer />
            </div>
        </Parallax3DLayer>
    );
};

export default ServicesPage;
