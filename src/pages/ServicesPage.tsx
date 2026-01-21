import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Monitor, Zap, Share2, Users, BarChart2, Shield,
    Grid3X3, Filter, Megaphone, Link as LinkIcon,
    MessageSquare, Map, Palette, Globe, TrendingUp
} from 'lucide-react';
import { PageLayout } from '@/components/page-layout';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';
import { ServiceAccordion } from '@/components/ui/service-accordion';
import { SectionTransition, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/section-transition';
import { Card, CardContent } from '@/components/ui/card';
import { GlowingCard } from '@/components/ui/glowing-card';
import { MagneticText } from '@/components/ui/morphing-cursor';

const servicesData = [
    {
        id: 1,
        title: "Google Workspace",
        date: "Ops",
        content: "Complete organization and configuration to streamline your business operations and enhance team collaboration.",
        category: "Operations",
        icon: Grid3X3,
        relatedIds: [2, 6],
        status: "completed" as const,
        energy: 90,
    },
    {
        id: 2,
        title: "Client Management (CRM)",
        date: "Core",
        content: "Tailored client management systems designed specifically for your business, from simple contact management to complex solutions.",
        category: "Systems",
        icon: Users,
        relatedIds: [1, 3, 4],
        status: "completed" as const,
        energy: 100,
    },
    {
        id: 3,
        title: "Campaign Design",
        date: "Growth",
        content: "Strategic campaign design implementation that converts prospects into loyal customers through data-driven strategies.",
        category: "Marketing",
        icon: Megaphone,
        relatedIds: [2, 4, 12],
        status: "in-progress" as const,
        energy: 85,
    },
    {
        id: 4,
        title: "Sales Funnels",
        date: "Growth",
        content: "Tailor-crafted sales funnels optimized for your specific audience, from lead capture to conversion optimization.",
        category: "Marketing",
        icon: Filter,
        relatedIds: [3, 5],
        status: "in-progress" as const,
        energy: 95,
    },
    {
        id: 5,
        title: "Web Solutions",
        date: "Core",
        content: "Complete web solutions from fast templates to custom-coded masterpieces, built to your exact specifications.",
        category: "Dev",
        icon: Monitor,
        relatedIds: [4, 6, 11],
        status: "completed" as const,
        energy: 95,
    },
    {
        id: 6,
        title: "Automation Crafting",
        date: "Core",
        content: "Streamline business processes with cutting-edge tech. Automatically deliver content and access without manual work.",
        category: "Automation",
        icon: Zap,
        relatedIds: [1, 2, 5],
        status: "completed" as const,
        energy: 100,
    },
    {
        id: 7,
        title: "Affiliate Systems",
        date: "Scale",
        content: "Purpose-built affiliate management systems that scale your referral program and maximize revenue through partnerships.",
        category: "Growth",
        icon: LinkIcon,
        relatedIds: [4, 12],
        status: "pending" as const,
        energy: 75,
    },
    {
        id: 8,
        title: "Community Apps",
        date: "Scale",
        content: "Custom community app design and publishing that engages your audience and builds lasting relationships.",
        category: "Product",
        icon: MessageSquare,
        relatedIds: [5, 10],
        status: "in-progress" as const,
        energy: 80,
    },
    {
        id: 9,
        title: "Path Strategy",
        date: "Strategy",
        content: "Client path strategy and consulting to optimize your business processes and accelerate growth through expert guidance.",
        category: "Consulting",
        icon: Map,
        relatedIds: [2, 10],
        status: "completed" as const,
        energy: 85,
    },
    {
        id: 10,
        title: "Branding Strategy",
        date: "Brand",
        content: "Comprehensive branding strategy development creating a cohesive identity that resonates with your target audience.",
        category: "Design",
        icon: Palette,
        relatedIds: [5, 8],
        status: "completed" as const,
        energy: 90,
    },
    {
        id: 11,
        title: "Domain Management",
        date: "Ops",
        content: "Complete domain services including registration, DNS, SSL, and ongoing maintenance to keep your presence secure.",
        category: "Infra",
        icon: Globe,
        relatedIds: [1, 5],
        status: "completed" as const,
        energy: 60,
    },
    {
        id: 12,
        title: "Meta Advertising",
        date: "Growth",
        content: "Strategic advertising campaigns across Facebook and Instagram that reach your ideal customers and drive results.",
        category: "Marketing",
        icon: TrendingUp,
        relatedIds: [3, 4],
        status: "pending" as const,
        energy: 85,
    },
];

// Services cards data for the hero
const serviceCards = [
    {
        icon: Monitor,
        title: "Web Solutions",
        description: "Complete web solutions from fast templates to custom-coded masterpieces.",
    },
    {
        icon: Zap,
        title: "Automation",
        description: "Streamline processes and automatically deliver content without manual work.",
    },
    {
        icon: Users,
        title: "Client Management",
        description: "Tailored CRM systems designed specifically for your business needs.",
    },
    {
        icon: Filter,
        title: "Sales Funnels",
        description: "Tailor-crafted funnels optimized for conversion and lead capture.",
    },
    {
        icon: Palette,
        title: "Branding Strategy",
        description: "Cohesive brand identity development that resonates with your audience.",
    },
    {
        icon: TrendingUp,
        title: "Meta Advertising",
        description: "Strategic campaigns across Facebook & Instagram to drive results.",
    },
];

const ServicesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageLayout>
            {/* Hero Section - Service Ecosystem */}
            <section className="relative pt-32 pb-16 min-h-[80vh] bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <SectionTransition type="fadeUp" className="text-center mb-8 sm:mb-12 flex flex-col items-center gap-6">
                        <MagneticText
                            text="SERVICE ECOSYSTEM"
                            hoverText="EXPLORE NOW"
                            className="bg-transparent"
                            textClassName="text-4xl md:text-5xl lg:text-6xl"
                        />
                        <div className="max-w-2xl mx-auto">
                            <MagneticText
                                text="Explore how our interconnected services create a powerful engine for your business growth."
                                hoverText="Click on any node to learn more about our services."
                                className="bg-transparent"
                                textClassName="text-lg sm:text-xl font-normal"
                            />
                        </div>
                    </SectionTransition>
                    <div className="py-8">
                        <RadialOrbitalTimeline timelineData={servicesData} />
                    </div>
                </div>
            </section>

            {/* Our Process - Interactive Accordion */}
            <section className="py-16 sm:py-24 bg-gray-50 relative">
                <SectionDivider direction="top" color="#FFFFFF" />
                <ServiceAccordion
                    title="Our Process"
                    subtitle="From discovery to delivery, here's how we transform your vision into a powerful digital presence that drives results."
                />
            </section>

            {/* What We Build - Grid */}
            <section className="py-16 sm:py-24 relative bg-white">
                <SectionDivider direction="top" color="#f9fafb" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <SectionTransition type="fadeUp" className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-black">What We Build</h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                            Comprehensive tech solutions designed for coaches and consultants
                        </p>
                    </SectionTransition>

                    {/* Service Cards Grid - Glowing Effect */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {serviceCards.map((service, index) => (
                            <GlowingCard
                                key={index}
                                title={service.title}
                                description={service.description}
                                icon={<service.icon className="w-6 h-6 text-black" />}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default ServicesPage;

