import { useRef } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

import html from "../assets/html.png";
import css from "../assets/css.png";
import js from "../assets/js.png";
import ts from "../assets/typescript.png";
import bs from "../assets/bootstrap.png";
import tw from "../assets/tailwind.png";
import react from "../assets/react_logo.png";
import other from "../assets/multiple.png";

const skills = [
    { id: 1, name: "HTML", level: 75, img: html },
    { id: 2, name: "CSS", level: 75, img: css },
    { id: 3, name: "Javascript", level: 65, img: js },
    { id: 4, name: "Typescript", level: 60, img: ts },
    { id: 5, name: "Bootstrap", level: 60, img: bs },
    { id: 6, name: "Tailwind CSS", level: 70, img: tw },
    { id: 7, name: "React", level: 65, img: react },
    { id: 8, name: "Multiple Libraries", level: 60, img: other },
];

export const Skills = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const cardCount = skills.length;
    const rawIndex = useTransform(scrollYProgress, [0, 1], [0, cardCount - 1]);
    const smoothIndex = useSpring(rawIndex, {
        stiffness: 50, // smoother
        damping: 40,   // softer stop
        restDelta: 0.001,
    });

    const CARD_SPACING = 30;

    return (
        <section
            ref={containerRef}
            className="relative h-[400vh] bg-gray-950 flex justify-center items-start pt-32 overflow-visible"
        >
            <div className="sticky top-32 w-full max-w-lg h-[500px]">
                {skills.map((skill, i) => {
                    const position = useTransform(smoothIndex, (v) => i - v);

                    const y = useTransform(position, (p) =>
                        p < 0 ? -p * CARD_SPACING : 0
                    );

                    const scale = useTransform(position, (p) =>
                        p < 0 ? 1 - Math.abs(p) * 0.04 : 1
                    );

                    const rotateX = useTransform(position, (p) =>
                        p < 0 ? p * 5 : 0
                    );

                    const scaleY = useTransform(position, (p) =>
                        p < 0 ? 1 - Math.abs(p) * 0.03 : 1
                    );

                    const opacity = useTransform(position, (p) =>
                        p < 0 ? 1 - Math.min(Math.abs(p) * 0.4, 0.4) : 1
                    );

                    const zIndex = useTransform(position, (p) =>
                        cardCount - Math.round(Math.abs(p))
                    );

                    return (
                        <motion.div
                            key={skill.id}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: "50%",
                                x: "-50%",
                                width: "100%",
                                maxWidth: 500,
                                y,
                                scale,
                                scaleY,
                                rotateX,
                                opacity,
                                zIndex,
                                transformStyle: "preserve-3d",
                            }}
                            className="bg-gray-800/90 border border-white/20 backdrop-blur-md rounded-xl shadow-2xl p-8 flex flex-col items-center gap-6 cursor-pointer select-none"
                            initial={false}
                        >
                            <h2 className="text-white text-3xl font-bold">{skill.name}</h2>
                            <img
                                src={skill.img}
                                alt={skill.name}
                                className="w-[120px] h-[120px] object-contain"
                                draggable={false}
                            />
                            <div className="w-full bg-gray-700 h-6 rounded-full overflow-hidden">
                                <motion.div
                                    className="bg-blue-600 h-full text-white text-center rounded-full"
                                    style={{ width: `${skill.level}%` }}
                                    initial={false}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1 }}
                                >
                                    <span className="text-sm font-semibold">{skill.level}%</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};
