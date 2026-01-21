import { useEffect } from 'react';
import { PageLayout } from '@/components/page-layout';
import { SectionTransition, SectionDivider } from '@/components/ui/section-transition';
import { Card } from '@/components/ui/card';

const BookingPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Load the booking widget script
        const script = document.createElement('script');
        script.src = 'https://book.hisubhadeep.com/js/form_embed.js';
        script.type = 'text/javascript';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup script on unmount
            document.body.removeChild(script);
        };
    }, []);

    return (
        <PageLayout>
            <section className="relative min-h-screen pt-32 pb-16 flex items-center justify-center overflow-hidden bg-white">
                {/* Soft Gradient Background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-white to-white z-0" />
                <SectionDivider direction="top" color="#FFFFFF" />

                <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                    <SectionTransition type="fadeUp" className="text-center mb-12">
                        <h1 className="font-sans text-4xl md:text-6xl font-bold mb-6 text-black">
                            Let's Talk Strategy
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                            Schedule a time to discuss how we can transform your business with our <span className="font-semibold italic text-black">premium</span> tech solutions.
                        </p>
                    </SectionTransition>

                    <SectionTransition type="scaleUp" delay={0.2}>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card className="bg-white/80 border-white/20 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 overflow-hidden">
                                {/* Booking Widget Embed */}
                                <iframe
                                    src="https://book.hisubhadeep.com/widget/booking/iv1Y70KUhyFeeemoumdU"
                                    style={{ width: '100%', height: '800px', border: 'none', overflow: 'hidden', display: 'block' }}
                                    scrolling="no"
                                    id="iv1Y70KUhyFeeemoumdU_1768975314847"
                                    title="Booking Calendar Widget"
                                />
                            </Card>

                            <div className="flex flex-col justify-center space-y-6 p-4">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-heading font-bold text-black">What we'll discuss</h3>
                                    <ul className="space-y-3 text-muted-foreground">
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            Current infrastructure analysis
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            Growth bottlenecks & opportunities
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            Tailored tech roadmap
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            Budget & timeline alignment
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </SectionTransition>
                </div>
            </section>
        </PageLayout>
    );
};

export default BookingPage;
