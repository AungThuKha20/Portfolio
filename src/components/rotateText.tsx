import { motion } from 'framer-motion';
import { ArrowBigRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const message = ' Hello, I am a frontend developer';

export default function RotateTextMotion() {
    const angleRef = useRef(0);
    const letterRefs = useRef<HTMLDivElement[]>([]);
    const requestRef = useRef<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const letters = message.split('');

    useEffect(() => {
        const animate = () => {
            if (!isPaused) {
                const total = letters.length;
                const radius = 100;
                const center = 150;
                const step = (Math.PI * 2) / total;
                angleRef.current += 0.008;

                letterRefs.current.forEach((el, i) => {
                    const a = step * i + angleRef.current;
                    const x = radius * Math.cos(a) + center;
                    const y = radius * Math.sin(a) + center;
                    const rotation = a * (180 / Math.PI) + 90;

                    if (el) {
                        el.style.left = `${x}px`;
                        el.style.top = `${y}px`;
                        el.style.transform = `rotate(${rotation}deg)`;
                    }
                });
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isPaused, letters.length]);

    return (
        <div className="relative w-[300px] h-[300px] select-none">
            {letters.map((char, i) => (
                <motion.div
                    key={i}
                    className="letter text-white font-semibold pointer-events-none"
                    ref={el => {
                        if (el) letterRefs.current[i] = el;
                    }}
                    style={{
                        position: 'absolute',
                        left: '0px',
                        top: '0px',
                        transform: 'rotate(0deg)',
                        transition: 'transform 0.1s linear',
                    }}
                >
                    {char}
                </motion.div>
            ))}

            <a
                href="#projects"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="absolute group left-[28%] top-[28%]  bg-[rgba(255,255,255,0.1)] transition-all w-40 h-40 flex flex-col justify-center items-center rounded-full shadow-lg text-white font-semibold tracking-wide uppercase hover:bg-[rgba(255,255,255,0.2)]"
            >
                Projects
                <ArrowBigRight className="duration-500 group-hover:rotate-90 transition-transform mt-1" />
            </a>
        </div>
    );
}
