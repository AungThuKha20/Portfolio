import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
    const text = `I began my Frontend Developer career in March 2024 at a Korea-based company, working on interactive web applications. After leaving university in my third year, I earned an NCC Level 4 Diploma in Computing. I'm passionate about JavaScript, TypeScript, React, and Framer Motion, and excited to continue growing in the field.`;
    const words = text.split(" ");

    return (
        <section id="about" className="relative h-full md:py-24 py-16 w-full flex flex-col items-center justify-center px-6">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-gray-100 lg:text-5xl md:text-4xl text-3xl sm:text-6xl font-extrabold md:mb-20 mb-10 text-center drop-shadow-lg leading-tight"
            >
                About <span className="text-cyan-800">Me</span>
            </motion.h1>

            <ScrollAnimatedWords words={words} />
        </section>
    );
};

const ScrollAnimatedWords = ({ words }: { words: string[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const visibleRatio = (windowHeight - rect.top) / windowHeight;

            // Normalize so 70% visibility == 1
            const normalized = visibleRatio / 0.7;
            const clamped = Math.min(1, Math.max(0, normalized));

            setScrollProgress(clamped);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const getInterpolatedColor = (index: number): string => {
        if (scrollProgress >= 1) return "rgb(255, 255, 255,0.9)";

        const ratio = scrollProgress - index / words.length;
        const clamped = Math.min(1, Math.max(0, ratio * 2));
        const value = Math.floor(clamped * 255);
        return `rgb(${value}, ${value}, ${value})`;
    };

    return (
        <motion.div
            ref={ref}
            className="z-10 max-w-5xl text-lg md:text-xl lg:text-2xl text-center backdrop-blur-md md:bg-white/5 md:p-8 rounded-2xl shadow-2xl border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
        >
            <div className="flex flex-wrap justify-center gap-2">
                {words.map((word, index) => (
                    <span
                        key={index}
                        className="md:inline-block md:whitespace-nowrap transition-colors duration-300"
                        style={{
                            color: getInterpolatedColor(index),
                        }}
                    >
                        {word}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

export default About;
