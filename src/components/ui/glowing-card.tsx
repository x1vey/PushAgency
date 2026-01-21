"use client";

import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface GlowingCardProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
    className?: string;
}

export function GlowingCard({ icon, title, description, className }: GlowingCardProps) {
    return (
        <div className={cn("relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3", className)}>
            <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
            />
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-white p-6 shadow-sm md:p-6 transition-all duration-300">
                <div className="relative flex flex-1 flex-col justify-between gap-3">
                    {icon && (
                        <div className="w-fit rounded-lg border-[0.75px] border-border bg-gray-100 p-2 text-black">
                            {icon}
                        </div>
                    )}
                    <div className="space-y-3">
                        <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-black">
                            {title}
                        </h3>
                        <h2 className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-gray-600">
                            {description}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
