/**
 * PRICING CONFIGURATION
 * 
 * Edit this file to update pricing plans, features, and descriptions.
 * Changes here will automatically update on both the Home page and Pricing page.
 */

export interface PricingFeature {
    name: string;
    included: boolean;
}

export interface PricingPlan {
    name: string;
    price: string;
    period: string;
    description: string;
    features: PricingFeature[];
    cta: string;
    popular: boolean;
}

export const pricingPlans: PricingPlan[] = [
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

/**
 * COMPARISON TABLE DATA
 * This is used specifically for the detailed pricing comparison table on the Pricing Page.
 * The features here show which plan has what capabilities in a comparison format.
 */
export interface ComparisonFeature {
    name: string;
    // Array with 3 elements: [Starter, Growth, Enterprise]
    // Can be: boolean (true/false for check/minus) or string (for custom text like "5 members")
    availability: [boolean | string, boolean | string, boolean | string];
}

export const comparisonFeatures: ComparisonFeature[] = [
    {
        name: 'Custom landing page',
        availability: [true, true, true]
    },
    {
        name: 'Booking system integration',
        availability: [true, true, true]
    },
    {
        name: 'Email automation',
        availability: ['Basic', 'Advanced', 'Advanced']
    },
    {
        name: 'Analytics dashboard',
        availability: [false, true, true]
    },
    {
        name: 'Web applications',
        availability: [false, 'Basic', 'Custom']
    },
    {
        name: 'Client portal',
        availability: [false, true, 'Advanced']
    },
    {
        name: 'API development',
        availability: [false, false, 'Custom']
    },
    {
        name: 'Support level',
        availability: ['Email', 'Priority Email', 'Priority + Slack']
    },
];
