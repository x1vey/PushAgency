import { useEffect } from 'react';
import { PageLayout } from '@/components/page-layout';
import { Pricing } from '@/components/ui/pricing-section-with-comparison';
import { SectionTransition, SectionDivider } from '@/components/ui/section-transition';

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
        </PageLayout>
    );
};

export default PricingPage;


