import { useState, useEffect } from 'react';
import { Check, Minus, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveRobotSpline } from '@/components/ui/interactive-3d-robot';

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
                            Managing a small business today is already tough.
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
                        <div
                            className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col transition-colors hover:bg-muted/50 rounded-t-xl"
                            onMouseEnter={() => setFocusedCard(0)}
                            onMouseLeave={() => setFocusedCard(null)}
                        >
                            <p className="text-2xl">Startup</p>
                            <p className="text-sm text-muted-foreground">
                                Our goal is to streamline SMB trade, making it easier and faster
                                than ever for everyone and everywhere.
                            </p>
                            <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
                                <span className="text-4xl">$40</span>
                                <span className="text-sm text-muted-foreground"> / month</span>
                            </p>
                            <Button variant="outline" className="gap-4 mt-8">
                                Try it <MoveRight className="w-4 h-4" />
                            </Button>
                        </div>
                        <div
                            className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col transition-colors hover:bg-muted/50 rounded-t-xl"
                            onMouseEnter={() => setFocusedCard(1)}
                            onMouseLeave={() => setFocusedCard(null)}
                        >
                            <p className="text-2xl">Growth</p>
                            <p className="text-sm text-muted-foreground">
                                Our goal is to streamline SMB trade, making it easier and faster
                                than ever for everyone and everywhere.
                            </p>
                            <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
                                <span className="text-4xl">$40</span>
                                <span className="text-sm text-muted-foreground"> / month</span>
                            </p>
                            <Button className="gap-4 mt-8">
                                Try it <MoveRight className="w-4 h-4" />
                            </Button>
                        </div>
                        <div
                            className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col transition-colors hover:bg-muted/50 rounded-t-xl"
                            onMouseEnter={() => setFocusedCard(2)}
                            onMouseLeave={() => setFocusedCard(null)}
                        >
                            <p className="text-2xl">Enterprise</p>
                            <p className="text-sm text-muted-foreground">
                                Our goal is to streamline SMB trade, making it easier and faster
                                than ever for everyone and everywhere.
                            </p>
                            <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
                                <span className="text-4xl">$40</span>
                                <span className="text-sm text-muted-foreground"> / month</span>
                            </p>
                            <Button variant="outline" className="gap-4 mt-8">
                                Contact us <PhoneCall className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1  py-4">
                            <b>Features</b>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">SSO</div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Check className="w-4 h-4 text-black" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Check className="w-4 h-4 text-black" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">
                            AI Assistant
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Minus className="w-4 h-4 text-gray-300" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Check className="w-4 h-4 text-black" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Check className="w-4 h-4 text-black" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">
                            Version Control
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">
                            Members
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <p className="text-muted-foreground text-sm">5 members</p>
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <p className="text-muted-foreground text-sm">25 members</p>
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <p className="text-muted-foreground text-sm">100+ members</p>
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">
                            Multiplayer Mode
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4">
                            Orchestration
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Pricing };
