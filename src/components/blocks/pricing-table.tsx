import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Plan {
    name: string;
    price: {
        monthly: number;
        yearly: number;
    };
    level: string;
    popular?: boolean;
    description?: string;
}

interface Feature {
    name: string;
    included: string; // 'starter' | 'pro' | 'all'
}

interface PricingTableProps {
    features: Feature[];
    plans: Plan[];
    defaultPlan?: string;
    defaultInterval?: "monthly" | "yearly";
    onPlanSelect?: (plan: string) => void;
    containerClassName?: string;
    buttonClassName?: string;
}

const levels = ["starter", "pro", "all"];

export function PricingTable({
    features,
    plans,
    defaultPlan = "pro",
    defaultInterval = "monthly",
    onPlanSelect,
    containerClassName,
    buttonClassName,
}: PricingTableProps) {
    const [isYearly, setIsYearly] = useState(defaultInterval === "yearly");

    const checkInclusion = (planLevel: string, featureLevel: string) => {
        const pIdx = levels.indexOf(planLevel);
        const fIdx = levels.indexOf(featureLevel);
        return pIdx >= fIdx;
    };

    return (
        <div className={cn("pricing-section", containerClassName)}>
            <div className="container">
                <div className="pricing-header">
                    <h2 className="h2">
                        Simple, transparent pricing
                    </h2>
                    <p className="pricing-subtitle">
                        Choose the plan that fits your needs. No hidden fees.
                    </p>
                    <div className="billing-toggle">
                        <span className={cn("toggle-label", !isYearly ? "active" : "")}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="toggle-btn"
                        >
                            <span className="sr-only">Toggle yearly billing</span>
                            <div className={cn("toggle-slider", isYearly ? "yearly" : "")} />
                        </button>
                        <span className={cn("toggle-label", isYearly ? "active" : "")}>
                            Yearly <span style={{ fontSize: '0.75rem', padding: '2px 6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>Save 20%</span>
                        </span>
                    </div>
                </div>

                <div className="pricing-grid">
                    {plans.map((plan, index) => {
                        return (
                            <div
                                key={index}
                                className={cn(
                                    "pricing-card",
                                    plan.popular && "popular"
                                )}
                            >
                                {plan.popular && (
                                    <div className="popular-badge">
                                        Popular
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <h3 className="h3">{plan.name}</h3>
                                    {plan.description && <p className="text-sm text-gray-400">{plan.description}</p>}
                                </div>
                                <div className="price-display">
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
                                    <span className="price-period">
                                        /{isYearly ? "year" : "month"}
                                    </span>
                                </div>
                                <ul className="feature-list">
                                    {features.map((feature, i) => {
                                        const included = checkInclusion(plan.level, feature.included);
                                        return (
                                            <li key={i} className="feature-item">
                                                {included ? (
                                                    <div className="feature-icon check">
                                                        <Check className="w-3 h-3" />
                                                    </div>
                                                ) : (
                                                    <div className="feature-icon x">
                                                        <X className="w-3 h-3" />
                                                    </div>
                                                )}
                                                <span className={cn("text-gray-300", !included && "text-gray-500")}>
                                                    {feature.name}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className="mt-8">
                                    <button
                                        className={cn("btn w-full", plan.popular ? "btn-primary" : "btn-ghost")}
                                        onClick={() => onPlanSelect?.(plan.name)}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
