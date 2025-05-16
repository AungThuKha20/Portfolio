import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
    const text = `I began my Frontend Developer career in March 2024 at a Korea-based company, working on interactive web applications. After leaving university in my third year, I earned an NCC Level 4 Diploma in Computing. I'm passionate about JavaScript, TypeScript, React, and Framer Motion, and excited to continue growing in the field.`;

    const words = text.split(" ");

    return (
        <div className="h-screen px-4 flex flex-col items-center justify-center">
            <motion.h1
                className="lg:text-7xl md:text-6xl sm:text-5xl text-4xl text-white mb-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 20 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                About Me
            </motion.h1>
            <ScrollAnimatedWords words={words} />
        </div>
    );
};

const ScrollAnimatedWords = ({ words }: { words: string[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visibleCount, setVisibleCount] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const visibleRatio = Math.min(
                1,
                Math.max(0, (windowHeight - rect.top + rect.height / 0.5) / (windowHeight + rect.height))
            );

            const wordCount = Math.floor(visibleRatio * words.length);
            setVisibleCount(wordCount);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [words.length]);

    return (
        <div
            ref={ref}
            className="text-3xl text-white max-w-6xl text-center flex flex-wrap justify-center gap-2"
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    className="inline-block whitespace-nowrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={index < visibleCount ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {word}
                </motion.span>
            ))}
        </div>
    );
};
export default About;