import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const AnimatedBackground = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Parallax offsets based on mouse
    const xOffset = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
    const yOffset = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);

    return (
        <div className="fixed inset-0 -z-50 bg-[#0a0a0a] overflow-hidden">
            <motion.svg
                style={{ x: xOffset, y: yOffset }}
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="grid"
                        width="50"
                        height="50"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="0.9"
                            opacity="0.2"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </motion.svg>
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0.8, 0.7, 0.6] }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(59,130,246,0.15), transparent 70%)",
                }}
            />
        </div>
    );
};

export default AnimatedBackground;
