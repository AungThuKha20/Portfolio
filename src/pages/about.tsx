import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
    const text = `I began my Frontend Developer career in March 2024 at a Korea-based company, working on interactive web applications. After leaving university in my third year, I earned an NCC Level 4 Diploma in Computing. I'm passionate about JavaScript, TypeScript, React, and Framer Motion, and excited to continue growing in the field.`;
    const words = text.split(" ");

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center px-6">
            {/* Floating Blobs Background */}
            <motion.div
                className="absolute w-80 h-80 bg-pink-500/30 rounded-full blur-3xl top-0 left-0 z-0 animate-float"
                animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl bottom-0 right-0 z-0 animate-float"
                animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold z-10 mb-12 text-center"
            >
                About Me
            </motion.h1>

            {/* Text with Scroll Animation */}
            <ScrollAnimatedWords words={words} />
        </section>
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

            const ratio = (windowHeight - rect.top) / windowHeight;
            const clampedRatio = Math.min(1, Math.max(0, ratio));
            const wordCount = Math.floor(clampedRatio * words.length);
            setVisibleCount(wordCount);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [words.length]);

    return (
        <motion.div
            ref={ref}
            className="z-10 max-w-5xl text-lg md:text-xl lg:text-2xl text-white text-center backdrop-blur-md bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="flex flex-wrap justify-center gap-2">
                {words.map((word, index) => (
                    <motion.span
                        key={index}
                        className="inline-block whitespace-nowrap"
                        initial={{ opacity: 0, y: 0 }}
                        animate={index < visibleCount ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
};

export default About;
