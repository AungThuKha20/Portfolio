import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const message = ' Hello, I am  a frontend developer';

export default function RotateTextMotion() {
    const [angle, setAngle] = useState<number>(0);
    const letters = message.split('');
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        const animate = () => {
            setAngle(prev => prev + 0.008);
            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current !== null) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    return (
        <div className="display relative w-[300px] h-[300px]">
            {letters.map((char, i) => {
                const total = letters.length;
                const radius = 100;
                const center = 150;
                const step = (Math.PI * 2) / total;
                const a = step * i + angle;

                const x = radius * Math.cos(a) + center;
                const y = radius * Math.sin(a) + center;
                const rotation = a * (180 / Math.PI) + 90;

                return (
                    <motion.div
                        key={i}
                        className="letter"
                        style={{
                            position: 'absolute',
                            left: `${x}px`,
                            top: `${y}px`,
                            transform: `rotate(${rotation}deg)`
                        }}
                    >
                        {char}
                    </motion.div>
                );
            })}
            <button
                className="absolute group underline  left-[55%] top-[55%] bg-[rgba(255,255,255,0.05)] -translate-x-1/2 -translate-y-1/2 transition-all w-40 h-40 flex justify-center items-center  rounded-full shadow-md"
            >
                Projects <ArrowUpRight className='group-hover:rotate-45 transition-all' />
            </button>
        </div>
    );
}
