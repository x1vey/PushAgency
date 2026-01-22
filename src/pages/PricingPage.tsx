import { useEffect } from 'react';
import { PageLayout } from '@/components/page-layout';
import { Pricing } from '@/components/ui/pricing-section-with-comparison';
import { SectionTransition, SectionDivider } from '@/components/ui/section-transition';
import AnimatedTextCycle from '@/components/ui/animated-text-cycle';

const PricingPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageLayout>
            <section className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-white">
                <SectionDivider direction="top" color="#FFFFFF" />
                <SectionTransition type="fadeUp">
                    <Pricing />
                </SectionTransition>
            </section>

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
    );
};

export default PricingPage;


