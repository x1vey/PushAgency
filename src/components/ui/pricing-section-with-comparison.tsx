import { useState, useEffect } from 'react';
import { Check, Minus, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveRobotSpline } from '@/components/ui/interactive-3d-robot';
import { pricingPlans, comparisonFeatures } from '@/config/pricing';
import { Link } from 'react-router-dom';

function Pricing() {
    const [focusedCard, setFocusedCard] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Track mouse position for robot look direction
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="w-full py-20 lg:py-40">
            <div className="container mx-auto">
                <div className="flex text-center justify-center items-center gap-4 flex-col">
                    <Badge>Pricing</Badge>
                    <div className="flex gap-2 flex-col">
                        <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
                            Prices that make sense!
                        </h2>
                        <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
                            Choose the plan that fits your business stage.
                        </p>
                    </div>

                    {/* Robot Integration */}
                    <div className="relative w-full h-[300px] mb-[-50px] z-10 pointer-events-none">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
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
                                    className="absolute top-10 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium z-20 pointer-events-none shadow-xl"
                                >
                                    {focusedCard === 0 ? '🚀 Good start!' : focusedCard === 1 ? '⭐ Creating growth!' : '🏢 Serious business!'}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="grid text-left w-full grid-cols-3 lg:grid-cols-4 divide-x pt-20 relative z-0">
                        <div className="col-span-3 lg:col-span-1"></div>
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={plan.name}
                                className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col transition-colors hover:bg-muted/50 rounded-t-xl"
                                onMouseEnter={() => setFocusedCard(index)}
                                onMouseLeave={() => setFocusedCard(null)}
                            >
                                <p className="text-2xl">{plan.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {plan.description}
                                </p>
                                <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
                                    <span className="text-4xl">{plan.price}</span>
                                    {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                                </p>
                                <Link to="/booking">
                                    <Button
                                        variant={index === 1 ? "default" : "outline"}
                                        className="gap-4 mt-8 w-full"
                                    >
                                        {plan.cta} {index === 2 ? <PhoneCall className="w-4 h-4" /> : <MoveRight className="w-4 h-4" />}
                                    </Button>
                                </Link>
                            </div>
                        ))}

                        {/* Features Header */}
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1  py-4">
                            <b>Features</b>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>

                        {/* Feature Rows */}
                        {comparisonFeatures.map((feature, featureIndex) => (
                            <>
                                <div key={`label-${featureIndex}`} className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">
                                    {feature.name}
                                </div>
                                {feature.availability.map((available, planIndex) => (
                                    <div key={`${featureIndex}-${planIndex}`} className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                                        {available === true && <Check className="w-4 h-4 text-black" />}
                                        {available === false && <Minus className="w-4 h-4 text-gray-300" />}
                                        {typeof available === 'string' && (
                                            <p className="text-muted-foreground text-sm">{available}</p>
                                        )}
                                    </div>
                                ))}
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Pricing };
