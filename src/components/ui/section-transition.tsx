'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { motion, useInView, useAnimation, Variants } from 'framer-motion'

// Transition variants inspired by igloo.inc
const fadeUpVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
        filter: 'blur(8px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1], // Custom easing for smooth reveals
        },
    },
}

const fadeInVariants: Variants = {
    hidden: {
        opacity: 0,
        filter: 'blur(4px)',
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

const scaleUpVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        filter: 'blur(4px)',
    },
    visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

const slideInLeftVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -40,
        filter: 'blur(4px)',
    },
    visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

const slideInRightVariants: Variants = {
    hidden: {
        opacity: 0,
        x: 40,
        filter: 'blur(4px)',
    },
    visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        },
    },
}

// Stagger container for child animations
const staggerContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
}

type TransitionType = 'fadeUp' | 'fadeIn' | 'scaleUp' | 'slideLeft' | 'slideRight'

interface SectionTransitionProps {
    children: ReactNode
    className?: string
    type?: TransitionType
    delay?: number
    threshold?: number
    once?: boolean
}

const variantMap: Record<TransitionType, Variants> = {
    fadeUp: fadeUpVariants,
    fadeIn: fadeInVariants,
    scaleUp: scaleUpVariants,
    slideLeft: slideInLeftVariants,
    slideRight: slideInRightVariants,
}

// Main section transition component
export function SectionTransition({
    children,
    className,
    type = 'fadeUp',
    delay = 0,
    threshold = 0.2,
    once = true,
}: SectionTransitionProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once, amount: threshold })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start('visible')
        } else if (!once) {
            controls.start('hidden')
        }
    }, [isInView, controls, once])

    const variants = variantMap[type]

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
            style={{ transitionDelay: `${delay}s` }}
        >
            {children}
        </motion.div>
    )
}

// Stagger container for multiple children
interface StaggerContainerProps {
    children: ReactNode
    className?: string
    threshold?: number
    once?: boolean
    staggerDelay?: number
}

export function StaggerContainer({
    children,
    className,
    threshold = 0.2,
    once = true,
    staggerDelay = 0.1,
}: StaggerContainerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once, amount: threshold })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start('visible')
        } else if (!once) {
            controls.start('hidden')
        }
    }, [isInView, controls, once])

    const customVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: 0.05,
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={customVariants}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Stagger child - use inside StaggerContainer
interface StaggerItemProps {
    children: ReactNode
    className?: string
    type?: TransitionType
}

export function StaggerItem({ children, className, type = 'fadeUp' }: StaggerItemProps) {
    const variants = variantMap[type]

    return (
        <motion.div variants={variants} className={className}>
            {children}
        </motion.div>
    )
}

// Section divider with gradient fade
interface SectionDividerProps {
    className?: string
    direction?: 'top' | 'bottom' | 'both'
    color?: string
}

export function SectionDivider({
    className,
    direction = 'both',
    color = 'rgba(10, 10, 10, 1)'
}: SectionDividerProps) {
    return (
        <div className={`absolute inset-x-0 pointer-events-none ${className || ''}`}>
            {(direction === 'top' || direction === 'both') && (
                <div
                    className="absolute top-0 left-0 right-0 h-32"
                    style={{
                        background: `linear-gradient(to bottom, ${color} 0%, transparent 100%)`
                    }}
                />
            )}
            {(direction === 'bottom' || direction === 'both') && (
                <div
                    className="absolute bottom-0 left-0 right-0 h-32"
                    style={{
                        background: `linear-gradient(to top, ${color} 0%, transparent 100%)`
                    }}
                />
            )}
        </div>
    )
}

// Parallax reveal section
interface ParallaxRevealProps {
    children: ReactNode
    className?: string
    speed?: number
}

export function ParallaxReveal({ children, className, speed = 0.5 }: ParallaxRevealProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const handleScroll = () => {
            const rect = element.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const elementCenter = rect.top + rect.height / 2
            const distanceFromCenter = (windowHeight / 2 - elementCenter) / windowHeight
            const translateY = distanceFromCenter * speed * 100

            element.style.transform = `translateY(${translateY}px)`
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [speed])

    return (
        <div ref={ref} className={`will-change-transform ${className || ''}`}>
            {children}
        </div>
    )
}

// Text reveal animation (letter by letter or word by word)
interface TextRevealProps {
    text: string
    className?: string
    as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
    delay?: number
    type?: 'letter' | 'word'
}

export function TextReveal({
    text,
    className,
    as: Tag = 'span',
    delay = 0,
    type = 'word'
}: TextRevealProps) {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    const items = type === 'letter' ? text.split('') : text.split(' ')

    return (
        <Tag ref={ref as any} className={`inline-block ${className || ''}`}>
            {items.map((item, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    animate={isInView ? {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        transition: {
                            duration: 0.5,
                            delay: delay + index * 0.05,
                            ease: [0.16, 1, 0.3, 1],
                        }
                    } : {}}
                    className="inline-block"
                    style={{ marginRight: type === 'word' ? '0.3em' : undefined }}
                >
                    {item}
                    {type === 'letter' && item === ' ' && '\u00A0'}
                </motion.span>
            ))}
        </Tag>
    )
}

