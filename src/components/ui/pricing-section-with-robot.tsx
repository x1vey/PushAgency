import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InteractiveRobotSpline } from '@/components/ui/interactive-3d-robot';
import { SectionTransition, SectionDivider } from '@/components/ui/section-transition';

const plans = [
    {
        name: 'Starter',
        price: '$107',
        period: '/month',
        description: 'Perfect for coaches just getting started',
        features: [
            { name: 'Custom landing page', included: true },
            { name: 'Booking system integration', included: true },
            { name: 'Basic email automation', included: true },
            { name: 'Mobile responsive design', included: true },
            { name: 'Monthly maintenance', included: true },
            { name: 'Email support', included: true },
            { name: 'Analytics dashboard', included: false },
            { name: 'Custom web applications', included: false },
            { name: 'Client portal', included: false },
            { name: 'Priority support', included: false },
        ],
        cta: 'Get Started',
        popular: false,
    },
    {
        name: 'Growth',
        price: '$150',
        period: '/month',
        description: 'For growing coaching businesses',
        features: [
            { name: 'Custom landing page', included: true },
            { name: 'Booking system integration', included: true },
            { name: 'Advanced email automation', included: true },
            { name: 'Mobile responsive design', included: true },
            { name: 'Priority maintenance & updates', included: true },
            { name: 'Priority email support', included: true },
            { name: 'Analytics dashboard', included: true },
            { name: 'Basic web applications', included: true },
            { name: 'Client portal', included: true },
            { name: 'Custom API development', included: false },
        ],
        cta: 'Get Started',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: "Let's Talk",
        period: '',
        description: 'For established businesses ready to scale',
        features: [
            { name: 'Everything in Growth', included: true },
            { name: 'Custom web applications', included: true },
            { name: 'Advanced client portal', included: true },
            { name: 'Custom API development', included: true },
            { name: 'Priority support + Slack', included: true },
            { name: 'Dedicated account manager', included: true },
            { name: 'Multi-platform integrations', included: true },
            { name: 'Custom reporting', included: true },
            { name: 'White-label solutions', included: true },
            { name: 'SLA guarantee', included: true },
        ],
        cta: 'Schedule a Call',
        popular: false,
    },
];

export function PricingSectionWithRobot() {
    const [focusedCard, setFocusedCard] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    // Track mouse position for robot look direction
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-screen py-24 overflow-hidden bg-white">
            <SectionDivider direction="top" color="#FFFFFF" />

            {/* Background glow that follows focused card - Subtle Gray */}


            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <SectionTransition type="fadeUp" className="text-center mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-black"
                    >
                        Simple, <span className="underline decoration-2 underline-offset-4">Transparent</span> Pricing
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-black max-w-2xl mx-auto"
                    >
                        Choose the plan that fits your business stage
                    </motion.p>
                </SectionTransition>

                {/* Robot and Cards Layout */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Centered Robot */}
                    <div className="relative h-[300px] sm:h-[350px] mb-8">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <InteractiveRobotSpline
                                scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                                className="w-full h-full max-w-[500px]"
                            />
                        </div>

                        {/* Robot speech bubble */}
                        <AnimatePresence>
                            {focusedCard !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                    className="absolute top-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl border-2 border-white"
                                >
                                    {focusedCard === 0 ? '👆 Great for beginners!' : focusedCard === 1 ? '⭐ Our most popular choice!' : '🏢 Enterprise-grade!'}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-r-2 border-b-2 border-white rotate-45 transform origin-center"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Pricing Cards */}
                    <div
                        ref={cardsContainerRef}
                        className="grid md:grid-cols-3 gap-6 sm:gap-8"
                    >
                        {plans.map((plan, index) => (
                            <motion.div
                                key={index}
                                onMouseEnter={() => setFocusedCard(index)}
                                onMouseLeave={() => setFocusedCard(null)}
                                animate={{
                                    scale: focusedCard === index ? 1.02 : 1,
                                    y: focusedCard === index ? -5 : 0,
                                    zIndex: focusedCard === index ? 20 : 10,
                                }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="relative h-full"
                            >
                                <Card className={`relative h-full transition-all duration-300 ${focusedCard === index
                                    ? 'bg-white/90 border-2 border-black shadow-xl ring-4 ring-black/5'
                                    : plan.popular
                                        ? 'bg-gray-50/50 border-2 border-gray-200'
                                        : 'bg-white/60 border border-gray-200'
                                    }`}>
                                    {plan.popular && (
                                        <Badge className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-1 text-sm font-semibold shadow-lg rounded-full">
                                            Most Popular
                                        </Badge>
                                    )}
                                    <CardHeader className="text-center pb-4 pt-8">
                                        <CardTitle className="text-2xl text-black font-bold">{plan.name}</CardTitle>
                                        <div className="mt-4">
                                            <span className="text-4xl sm:text-5xl font-extrabold text-black">
                                                {plan.price}
                                            </span>
                                            <span className="text-gray-500 text-base">{plan.period}</span>
                                        </div>
                                        <p className="text-gray-500 mt-2 text-sm">{plan.description}</p>
                                    </CardHeader>
                                    <CardContent className="space-y-6 px-6">
                                        <ul className="space-y-3">
                                            {plan.features.map((feature, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-center gap-3"
                                                >
                                                    {feature.included ? (
                                                        <Check className="w-5 h-5 shrink-0 text-black" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-gray-300 shrink-0" />
                                                    )}
                                                    <span className={`text-sm sm:text-base ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                                                        {feature.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Link to="/booking">
                                            <Button
                                                variant={focusedCard === index || plan.popular ? "premium" : "outline"}
                                                className="w-full h-12 text-base font-bold mt-4 border-2"
                                            >
                                                {plan.cta}
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
