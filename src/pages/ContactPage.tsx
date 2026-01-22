import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedTextCycle from '@/components/ui/animated-text-cycle';
import { PageLayout } from '@/components/page-layout';
import { SectionBackground } from '@/components/three';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageLayout>
            {/* Full-screen Contact with Three.js Background */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                <SectionBackground particleCount={100} />
                <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark pointer-events-none z-[1]" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 sm:pt-32 pb-16">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-10 sm:mb-12"
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
                                Ready to <span className="text-gradient">Transform</span> Your Business?
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                                Let's discuss how we can build the tech infrastructure that amplifies your impact.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="grid sm:grid-cols-2 gap-6 sm:gap-8"
                        >
                            {/* Email Card */}
                            <Card className="bg-white/10 border-white/20 backdrop-blur-xl hover:border-primary/50 transition-colors group">
                                <CardContent className="p-6 sm:p-8 text-center">
                                    <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                        <Mail size={28} className="sm:w-8 sm:h-8" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Email Us</h3>
                                    <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                                        For general inquiries and project discussions.
                                    </p>
                                    <a
                                        href="mailto:hello@catalystdigital.com"
                                        className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-semibold text-sm sm:text-base"
                                    >
                                        hello@catalystdigital.com
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </CardContent>
                            </Card>

                            {/* Schedule Card */}
                            <Card className="bg-white/10 border-white/20 backdrop-blur-xl hover:border-accent/50 transition-colors group">
                                <CardContent className="p-6 sm:p-8 text-center">
                                    <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-accent/20 text-accent flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                        <MessageSquare size={28} className="sm:w-8 sm:h-8" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Schedule a Call</h3>
                                    <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                                        Book a free 30-minute strategy session.
                                    </p>
                                    <Button className="bg-accent hover:bg-accent/80 text-dark font-bold text-sm sm:text-base px-6 py-2 sm:py-3">
                                        Book Now
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-center mt-12 sm:mt-16"
                        >
                            <p className="text-gray-500 mb-4 text-sm sm:text-base">Not sure where to start?</p>
                            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                                <Link to="/services">
                                    <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                                        View Services
                                    </Button>
                                </Link>
                                <Link to="/pricing">
                                    <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                                        See Pricing
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Animated Tagline Section */}
            <section className="py-16 sm:py-20 bg-gray-900 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-200 leading-relaxed">
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
                            className="text-white font-semibold"
                        />{' '}
                        deserves better tools.
                    </p>
                </div>
            </section>
        </PageLayout>
    );
};

export default ContactPage;

