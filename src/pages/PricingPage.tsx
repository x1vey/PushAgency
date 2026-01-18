import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Parallax3DLayer } from '@/components/three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InteractiveRobotSpline } from '@/components/ui/interactive-3d-robot';
import { SectionTransition, StaggerContainer, StaggerItem, SectionDivider } from '@/components/ui/section-transition';

const plans = [
    {
        name: 'Starter',
        price: '$150',
        period: '/month',
        description: 'Perfect for coaches just getting started',
        features: [
            { name: 'Custom landing page', included: true },
            { name: 'Booking system integration', included: true },
            { name: 'Email automation setup', included: true },
            { name: 'Basic analytics dashboard', included: true },
            { name: 'Mobile responsive design', included: true },
            { name: 'Monthly maintenance & updates', included: true },
            { name: 'Email support', included: true },
            { name: 'Custom web applications', included: false },
            { name: 'Client portal', included: false },
            { name: 'Custom API development', included: false },
            { name: 'Priority support', included: false },
        ],
        cta: 'Get Started',
        popular: false,
    },
    {
        name: 'Enterprise',
        price: "Let's Talk",
        period: '',
        description: 'For established businesses ready to scale',
        features: [
            { name: 'Custom landing page', included: true },
            { name: 'Booking system integration', included: true },
            { name: 'Email automation setup', included: true },
            { name: 'Advanced analytics dashboard', included: true },
            { name: 'Mobile responsive design', included: true },
            { name: 'Priority maintenance & updates', included: true },
            { name: 'Priority support + Slack', included: true },
            { name: 'Custom web applications', included: true },
            { name: 'Client portal & dashboard', included: true },
            { name: 'Custom API development', included: true },
            { name: 'Dedicated account manager', included: true },
        ],
        cta: 'Schedule a Call',
        popular: true,
    },
];

const faqs = [
    {
        question: 'How long does it take to build my website?',
        answer: 'Most websites are completed within 2-4 weeks. Custom web applications may take 4-8 weeks depending on complexity.',
    },
    {
        question: 'What if I need changes after launch?',
        answer: 'All plans include monthly maintenance. We handle updates, fixes, and minor improvements as part of your subscription.',
    },
    {
        question: 'Can I upgrade my plan later?',
        answer: 'Absolutely! You can upgrade from Starter to Enterprise at any time. We will credit your remaining balance.',
    },
    {
        question: 'Do you offer refunds?',
        answer: 'We offer a 14-day money-back guarantee if you are not satisfied with our initial work.',
    },
    {
        question: 'What tools do you integrate with?',
        answer: 'We integrate with GoHighLevel, HubSpot, Stripe, PayPal, Calendly, Cal.com, Zoom, and 100+ other tools via custom APIs.',
    },
];

const PricingPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [openFaq, setOpenFaq] = useState<number | null>(null);
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
        <Parallax3DLayer>
            <div className="min-h-screen bg-dark font-sans text-white overflow-x-hidden">
                <Navbar />

                {/* Pricing Cards Section with Robot */}
                <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
                    <SectionDivider direction="top" />

                    {/* Background glow that follows focused card */}
                    <motion.div
                        className="absolute w-[400px] h-[400px] bg-accent/15 blur-[150px] rounded-full pointer-events-none z-0"
                        animate={{
                            x: focusedCard === 0 ? '25%' : focusedCard === 1 ? '75%' : '50%',
                            y: '50%',
                            scale: focusedCard !== null ? 1.2 : 1,
                            opacity: focusedCard !== null ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        style={{ left: 0, top: 0, transform: 'translate(-50%, -50%)' }}
                    />

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Header */}
                        <SectionTransition type="fadeUp" className="text-center mb-8">
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                            >
                                Simple, <span className="text-gradient-nature">Transparent</span> Pricing
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
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
                                            className="absolute top-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full text-sm font-medium text-accent"
                                        >
                                            {focusedCard === 0 ? '👆 Great for beginners!' : '⭐ Our most popular choice!'}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Pricing Cards */}
                            <div
                                ref={cardsContainerRef}
                                className="grid md:grid-cols-2 gap-6 sm:gap-8"
                            >
                                {plans.map((plan, index) => (
                                    <motion.div
                                        key={index}
                                        onMouseEnter={() => setFocusedCard(index)}
                                        onMouseLeave={() => setFocusedCard(null)}
                                        animate={{
                                            scale: focusedCard === index ? 1.03 : focusedCard !== null && focusedCard !== index ? 0.97 : 1,
                                            y: focusedCard === index ? -8 : 0,
                                            zIndex: focusedCard === index ? 20 : 10,
                                        }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                        className="relative"
                                    >
                                        <motion.div
                                            className="absolute -inset-1 rounded-2xl pointer-events-none"
                                            animate={{
                                                opacity: focusedCard === index ? 1 : 0,
                                                boxShadow: focusedCard === index
                                                    ? '0 0 60px rgba(14, 165, 233, 0.4), 0 0 100px rgba(14, 165, 233, 0.2)'
                                                    : '0 0 0px rgba(14, 165, 233, 0)',
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />

                                        <Card className={`relative h-full transition-all duration-300 ${focusedCard === index
                                            ? 'bg-gradient-to-b from-accent/20 to-surface/80 border-accent shadow-2xl'
                                            : plan.popular
                                                ? 'bg-gradient-to-b from-accent/10 to-transparent border-accent/30'
                                                : 'bg-surface/50 border-accent/10'
                                            }`}>
                                            {plan.popular && (
                                                <Badge className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-dark px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold">
                                                    Most Popular
                                                </Badge>
                                            )}
                                            <CardHeader className="text-center pb-4 pt-6 sm:pt-8">
                                                <CardTitle className="text-xl sm:text-2xl text-white">{plan.name}</CardTitle>
                                                <div className="mt-3 sm:mt-4">
                                                    <span className={`font-extrabold ${plan.price === "Let's Talk" ? 'text-3xl sm:text-4xl text-gradient-nature' : 'text-4xl sm:text-5xl text-white'}`}>
                                                        {plan.price}
                                                    </span>
                                                    <span className="text-gray-400 text-sm sm:text-base">{plan.period}</span>
                                                </div>
                                                <p className="text-gray-400 mt-2 text-sm sm:text-base">{plan.description}</p>
                                            </CardHeader>
                                            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
                                                <ul className="space-y-2 sm:space-y-3">
                                                    {plan.features.map((feature, i) => (
                                                        <motion.li
                                                            key={i}
                                                            className="flex items-center gap-2 sm:gap-3"
                                                            animate={{
                                                                x: focusedCard === index ? 4 : 0,
                                                                opacity: focusedCard === index || focusedCard === null ? 1 : 0.7,
                                                            }}
                                                            transition={{ delay: focusedCard === index ? i * 0.02 : 0 }}
                                                        >
                                                            {feature.included ? (
                                                                <Check className={`w-4 sm:w-5 h-4 sm:h-5 shrink-0 transition-colors ${focusedCard === index ? 'text-accent' : 'text-accent/70'}`} />
                                                            ) : (
                                                                <X className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600 shrink-0" />
                                                            )}
                                                            <span className={`text-sm sm:text-base ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                                                                {feature.name}
                                                            </span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                                <Link to="/contact">
                                                    <Button
                                                        className={`w-full py-5 sm:py-6 text-base sm:text-lg font-bold transition-all duration-300 ${focusedCard === index
                                                            ? 'bg-accent hover:bg-accent/80 text-dark scale-105 shadow-lg'
                                                            : plan.popular
                                                                ? 'bg-accent/80 hover:bg-accent text-dark'
                                                                : 'bg-white/10 hover:bg-white/20 text-white'
                                                            }`}
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

                {/* FAQ */}
                <section className="py-16 sm:py-24 bg-gradient-to-b from-dark to-dark-blue/20 relative">
                    <SectionDivider direction="both" color="rgba(15, 23, 42, 0.3)" />
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <SectionTransition type="fadeUp" className="text-center mb-12 sm:mb-16">
                            <HelpCircle className="w-10 sm:w-12 h-10 sm:h-12 text-accent mx-auto mb-3 sm:mb-4" />
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Frequently Asked Questions</h2>
                        </SectionTransition>

                        <StaggerContainer className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
                            {faqs.map((faq, index) => (
                                <StaggerItem key={index} type="fadeUp">
                                    <Card
                                        className="bg-surface/50 border-accent/10 cursor-pointer hover:border-accent/30 transition-colors"
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    >
                                        <CardContent className="p-4 sm:p-6">
                                            <div className="flex items-center justify-between gap-4">
                                                <h3 className="font-bold text-white text-sm sm:text-base">{faq.question}</h3>
                                                {openFaq === index ? (
                                                    <ChevronUp className="w-5 h-5 text-accent shrink-0" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                                                )}
                                            </div>
                                            {openFaq === index && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="mt-3 sm:mt-4 text-gray-400 text-sm sm:text-base"
                                                >
                                                    {faq.answer}
                                                </motion.p>
                                            )}
                                        </CardContent>
                                    </Card>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>

                <Footer />
            </div>
        </Parallax3DLayer>
    );
};

export default PricingPage;
