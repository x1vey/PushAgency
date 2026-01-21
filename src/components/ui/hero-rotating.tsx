import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";


function Hero() {
    const [titleNumber, setTitleNumber] = useState(0);
    const titles = useMemo(
        () => ["amazing", "new", "wonderful", "beautiful", "smart"],
        []
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (titleNumber === titles.length - 1) {
                setTitleNumber(0);
            } else {
                setTitleNumber(titleNumber + 1);
            }
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, titles]);

    return (
        <div className="w-full">
            <div className="container">
                <div className="hero-rotating-container">
                    <div>
                        <button className="hero-pill-btn">
                            Read our launch article <MoveRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex gap-4 flex-col items-center">
                        <h1 className="hero-heading">
                            <span style={{ color: 'var(--c-accent-light)' }}>This is something</span>
                            <span className="rotating-text-wrapper">
                                &nbsp;
                                {titles.map((title, index) => (
                                    <motion.span
                                        key={index}
                                        className="absolute font-semibold"
                                        initial={{ opacity: 0, y: "-100" }}
                                        transition={{ type: "spring", stiffness: 50 }}
                                        animate={
                                            titleNumber === index
                                                ? {
                                                    y: 0,
                                                    opacity: 1,
                                                }
                                                : {
                                                    y: titleNumber > index ? -150 : 150,
                                                    opacity: 0,
                                                }
                                        }
                                    >
                                        {title}
                                    </motion.span>
                                ))}
                            </span>
                        </h1>

                        <p className="hero-desc">
                            Managing a small business today is already tough. Avoid further
                            complications by ditching outdated, tedious trade methods. Our
                            goal is to streamline SMB trade, making it easier and faster than
                            ever.
                        </p>
                    </div>
                    <div className="hero-cta">
                        <button className="btn btn-ghost" style={{ gap: '1rem', display: 'flex', alignItems: 'center' }}>
                            Jump on a call <PhoneCall className="w-4 h-4" />
                        </button>
                        <button className="btn btn-primary" style={{ gap: '1rem', display: 'flex', alignItems: 'center' }}>
                            Sign up here <MoveRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Hero };
