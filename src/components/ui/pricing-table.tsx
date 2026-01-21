import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Basic",
        description: "Essential tools for small businesses",
        price: { monthly: 29, yearly: 290 },
        features: [
            { name: "Up to 5 users", included: true },
            { name: "Basic analytics", included: true },
            { name: "24/7 Support", included: false },
            { name: "Custom integrations", included: false },
        ],
        highlight: false,
    },
    {
        name: "Pro",
        description: "Advanced features for growing teams",
        price: { monthly: 59, yearly: 590 },
        features: [
            { name: "Up to 20 users", included: true },
            { name: "Advanced analytics", included: true },
            { name: "24/7 Support", included: true },
            { name: "Custom integrations", included: false },
        ],
        highlight: true,
    },
    {
        name: "Enterprise",
        description: "Full-scale solutions for large organizations",
        price: { monthly: 99, yearly: 990 },
        features: [
            { name: "Unlimited users", included: true },
            { name: "Deep capabilities", included: true },
            { name: "24/7 Priority Support", included: true },
            { name: "Custom integrations", included: true },
        ],
        highlight: false,
    },
];

export function PricingTable() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        Simple, transparent pricing
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Choose the plan that fits your needs. No hidden fees.
                    </p>
                    <div className="flex items-center space-x-4 mt-8">
                        <span
                            className={cn(
                                "text-sm font-medium transition-colors",
                                !isYearly ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            Monthly
                        </span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="relative inline-flex h-6 w-11 items-center rounded-full bg-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
                        >
                            <span className="sr-only">Toggle yearly billing</span>
                            <motion.span
                                layout
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-primary shadow-sm ring-0 transition-transform",
                                    isYearly ? "translate-x-6" : "translate-x-1"
                                )}
                            />
                        </button>
                        <span
                            className={cn(
                                "text-sm font-medium transition-colors",
                                isYearly ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            Yearly <Badge variant="secondary" className="ml-1 text-xs">Save 20%</Badge>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex flex-col p-6 rounded-3xl border border-white/20 bg-white/70 backdrop-blur-xl text-card-foreground shadow-sm relative overflow-hidden transition-all hover:shadow-lg duration-300 ring-1 ring-black/5",
                                plan.highlight && "border-black/10 shadow-xl scale-105 z-10 bg-white/90"
                            )}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 right-0 p-3">
                                    <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                                </div>
                            )}
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground">{plan.description}</p>
                            </div>
                            <div className="mt-4 flex items-baseline text-3xl font-bold">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={isYearly ? "year" : "month"}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                                    </motion.span>
                                </AnimatePresence>
                                <span className="ml-1 text-base font-medium text-muted-foreground">
                                    /{isYearly ? "year" : "month"}
                                </span>
                            </div>
                            <ul className="mt-6 space-y-3 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        {feature.included ? (
                                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary shrink-0">
                                                <Check className="w-3 h-3" />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-muted-foreground shrink-0">
                                                <X className="w-3 h-3" />
                                            </div>
                                        )}
                                        <span className={cn("text-sm", !feature.included && "text-muted-foreground")}>
                                            {feature.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8">
                                <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
