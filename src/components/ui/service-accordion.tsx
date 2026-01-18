import React, { useState } from 'react';

// --- Data for the image accordion - Our Process steps ---
const accordionItems = [
    {
        id: 1,
        title: 'Discovery',
        description: 'Understanding your business goals',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'Design & Strategy',
        description: 'Crafting your custom roadmap',
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 3,
        title: 'Development',
        description: 'Building with cutting-edge tech',
        imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2070&auto=format&fit=crop',
    },
    {
        id: 4,
        title: 'Launch & Support',
        description: 'Going live with ongoing care',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    },
];

interface AccordionItemData {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

interface AccordionItemProps {
    item: AccordionItemData;
    isActive: boolean;
    onMouseEnter: () => void;
}

// --- Accordion Item Component ---
const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter }) => {
    return (
        <div
            className={`
        relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out border border-accent/20
        ${isActive ? 'w-[300px] md:w-[400px]' : 'w-[50px] md:w-[60px]'}
      `}
            onMouseEnter={onMouseEnter}
        >
            {/* Background Image */}
            <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://placehold.co/400x450/1a1a1a/52b788?text=Image';
                }}
            />

            {/* Dark gradient overlay with nature-tech tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />

            {/* Green glow effect on active */}
            {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent" />
            )}

            {/* Caption Text */}
            <div
                className={`
          absolute text-white whitespace-nowrap
          transition-all duration-500 ease-in-out
          ${isActive
                        ? 'bottom-6 left-6 right-6 rotate-0 text-left'
                        : 'bottom-24 left-1/2 -translate-x-1/2 -rotate-90 origin-center'
                    }
        `}
            >
                <span className={`font-bold ${isActive ? 'text-xl md:text-2xl' : 'text-sm md:text-base'}`}>
                    {item.title}
                </span>
                {isActive && (
                    <p className="text-gray-300 text-sm mt-1 animate-fadeIn">
                        {item.description}
                    </p>
                )}
            </div>

            {/* Active indicator line */}
            {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-light to-accent" />
            )}
        </div>
    );
};

interface ServiceAccordionProps {
    title?: string;
    subtitle?: string;
    items?: AccordionItemData[];
}

// --- Main Component ---
export function ServiceAccordion({
    title = "What We Build",
    subtitle = "Hover to explore our comprehensive tech solutions designed for coaches and consultants.",
    items = accordionItems
}: ServiceAccordionProps) {
    const [activeIndex, setActiveIndex] = useState(2);

    const handleItemHover = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="bg-dark font-sans">
            <section className="container mx-auto px-4 py-12 md:py-24">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left Side: Text Content */}
                    <div className="w-full lg:w-2/5 text-center lg:text-left">
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                            {title.split(' ').map((word, i) => (
                                <span key={i}>
                                    {i === title.split(' ').length - 1 ? (
                                        <span className="text-gradient-nature">{word}</span>
                                    ) : (
                                        word + ' '
                                    )}
                                </span>
                            ))}
                        </h2>
                        <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto lg:mx-0">
                            {subtitle}
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a
                                href="/services"
                                className="inline-block bg-accent text-dark font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-accent/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(82,183,136,0.4)] hover:-translate-y-1"
                            >
                                Explore Services
                            </a>
                            <a
                                href="/contact"
                                className="inline-block glass text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </div>

                    {/* Right Side: Image Accordion */}
                    <div className="w-full lg:w-3/5">
                        <div className="flex flex-row items-center justify-center gap-2 md:gap-4 overflow-x-auto p-4 scrollbar-hide">
                            {items.map((item, index) => (
                                <AccordionItem
                                    key={item.id}
                                    item={item}
                                    isActive={index === activeIndex}
                                    onMouseEnter={() => handleItemHover(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Export the data type for external use
export type { AccordionItemData };
