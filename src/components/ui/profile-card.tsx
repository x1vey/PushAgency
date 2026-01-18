"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
    imageSrc?: string;
    name: string;
    role?: string;
    socials?: {
        github?: string;
    };
    className?: string;
    useIcon?: boolean;
}

const fluidTransition = {
    type: "spring",
    stiffness: 260,
    damping: 28,
    mass: 1,
};

const contentContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.02,
        },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.1 },
    },
};

const elegantItemVariants = {
    hidden: { y: 12, opacity: 0, filter: "blur(6px)" },
    visible: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: fluidTransition,
    },
};

export default function ProfileCard({
    imageSrc,
    name,
    role,
    socials,
    className = "",
    useIcon = false,
}: ProfileCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={cn("flex items-center justify-center", className)}>
            <motion.div
                className={cn(
                    "relative z-0 flex items-center overflow-hidden",
                    "bg-white/10 text-zinc-50 backdrop-blur-md border border-white/20"
                )}
                style={{ cursor: "pointer" }}
                layout
                initial={{ borderRadius: 40, width: 56, height: 56 }}
                animate={{
                    width: isHovered ? "auto" : 56,
                    borderRadius: 40,
                }}
                transition={fluidTransition}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="absolute inset-0 z-20 rounded-[40px] border border-white/20 pointer-events-none" />

                <div
                    className={cn(
                        "absolute inset-0 transition-opacity duration-500 z-0",
                        "bg-gradient-to-br from-primary/20 via-accent/10 to-transparent",
                        isHovered ? "opacity-100" : "opacity-0"
                    )}
                />

                <motion.div
                    layout="position"
                    className="relative z-30 h-10 w-10 shrink-0 m-2"
                >
                    <motion.div
                        className="absolute inset-0 rounded-full blur-xl bg-primary"
                        animate={{
                            scale: isHovered ? 1.6 : 0.8,
                            opacity: isHovered ? 0.5 : 0,
                        }}
                        transition={{
                            scale: { duration: 0.4, ease: "easeOut" },
                            opacity: { duration: 0.4 },
                        }}
                    />

                    {useIcon ? (
                        <div className="relative h-full w-full rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" fill="currentColor" />
                        </div>
                    ) : (
                        <motion.img
                            src={imageSrc}
                            alt={name}
                            className="relative h-full w-full rounded-full object-cover border-2 border-white/30"
                            animate={{ scale: isHovered ? 1 : 0.96 }}
                            transition={fluidTransition}
                        />
                    )}

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: isHovered ? 1 : 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-dark z-40"
                    />
                </motion.div>

                <div className="relative z-20 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {isHovered && (
                            <motion.div
                                variants={contentContainerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="flex flex-col justify-center pl-3 pr-6 min-w-[140px]"
                            >
                                <div className="flex items-center justify-between gap-4 mb-0.5">
                                    <motion.h3
                                        variants={elegantItemVariants}
                                        className="text-sm font-bold text-zinc-50 tracking-tight whitespace-nowrap"
                                    >
                                        {name}
                                    </motion.h3>

                                    {socials?.github && (
                                        <motion.a
                                            href={socials.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variants={elegantItemVariants}
                                            className="flex items-center justify-center h-6 w-6 rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
                                        >
                                            <Github size={14} />
                                        </motion.a>
                                    )}
                                </div>

                                {role && (
                                    <motion.div
                                        variants={elegantItemVariants}
                                        className="flex items-center gap-2 whitespace-nowrap"
                                    >
                                        <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                                            {role}
                                        </span>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
