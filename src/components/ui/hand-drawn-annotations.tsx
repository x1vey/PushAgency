import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface HandDrawnCircleProps {
    className?: string;
    delay?: number;
    duration?: number;
}

export function HandDrawnCircle({ className, delay = 0, duration = 1.5 }: HandDrawnCircleProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={cn("absolute pointer-events-none", className)}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 220 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <path
                    d="M 10 35 Q 10 10, 50 5 T 170 5 Q 210 10, 210 35 T 170 65 Q 110 70, 50 65 T 10 35"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                        "transition-all",
                        isVisible ? "animate-draw-circle" : "opacity-0"
                    )}
                    style={{
                        strokeDasharray: 500,
                        strokeDashoffset: isVisible ? 0 : 500,
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`,
                    }}
                />
            </svg>
        </div>
    );
}

interface HandDrawnUnderlineProps {
    className?: string;
    delay?: number;
    duration?: number;
}

export function HandDrawnUnderline({ className, delay = 0, duration = 1 }: HandDrawnUnderlineProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={cn("absolute pointer-events-none", className)}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="w-full h-full"
            >
                <path
                    d="M 5 15 Q 50 12, 100 14 T 195 15"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                        "transition-all",
                        isVisible ? "animate-draw-underline" : "opacity-0"
                    )}
                    style={{
                        strokeDasharray: 200,
                        strokeDashoffset: isVisible ? 0 : 200,
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`,
                    }}
                />
            </svg>
        </div>
    );
}
