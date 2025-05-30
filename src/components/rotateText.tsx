import { motion } from 'framer-motion';
import { ArrowBigRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const message = ' Hello, I am  a frontend developer';

export default function RotateTextMotion() {
    const angleRef = useRef(0);
    const letterRefs = useRef<HTMLDivElement[]>([]);
    const requestRef = useRef<number | null>(null);
    const letters = message.split('');

    useEffect(() => {
        const animate = () => {
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

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [letters.length]);

    return (
        <div className="display relative w-[300px] h-[300px]">
            {letters.map((char, i) => (
                <motion.div
                    key={i}
                    className="letter"
                    ref={el => {
                        if (el) letterRefs.current[i] = el;
                    }}
                    style={{
                        position: 'absolute',
                        left: '0px',
                        top: '0px',
                        transform: 'rotate(0deg)',
                    }}
                >
                    {char}
                </motion.div>
            ))}
            <a
            href='#projects'
                className="absolute group underline left-[55%] top-[55%] bg-[rgba(255,255,255,0.05)] -translate-x-1/2 -translate-y-1/2 transition-all w-40 h-40 flex justify-center items-center rounded-full shadow-md"
            >
                Projects
                <ArrowBigRight className="duration-800 group-hover:rotate-90 transition-all mt-1" />
            </a>
        </div>
    );
}
