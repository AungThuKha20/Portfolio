import { useRef } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";

import html from "../assets/html.png";
import css from "../assets/css.png";
import js from "../assets/js.png";
import ts from "../assets/typescript.png";
import bs from "../assets/bootstrap.png";
import tw from "../assets/tailwind.png";
import react from "../assets/react_logo.png";
import other from "../assets/multiple.png";

const skills = [
  { id: 1, name: "HTML", level: 75, img: html, color: "#fb591f" },
  { id: 2, name: "CSS", level: 75, img: css, color: "#1e97f5" },
  { id: 3, name: "Javascript", level: 65, img: js, color: "#f0db4f" },
  { id: 4, name: "Typescript", level: 60, img: ts, color: "#007acc" },
  { id: 5, name: "Bootstrap", level: 60, img: bs, color: "#563d7c" },
  { id: 6, name: "Tailwind CSS", level: 70, img: tw, color: "#06b6d4" },
  { id: 7, name: "React", level: 65, img: react, color: "#61dbfb" },
  { id: 8, name: "Multiple Libraries", level: 60, img: other, color: "#c54881" },
];

export const Skills = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0", "end end"],
  });

  const cardCount = skills.length;
  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, cardCount - 1]);
  const smoothIndex = useSpring(rawIndex, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.003,
  });

  const CARD_SPACING = 10;

  return (
     <>
       <h1 className="lg:text-7xl md:text-6xl sm:text-5xl text-4xl text-white mt-32 text-center mb-20">Skills</h1>
       <div
      ref={containerRef}
      className="relative h-[1000vh] bg-gray-950 flex justify-center items-start  overflow-visible"
    >
      <div className="sticky top-[28%] w-screen h-[500px]">
        {skills.map((skill, i) => {
          const position = useTransform(smoothIndex, (v) => i - v);

          const y = useTransform(position, (p) =>
            p < 0 ? -p * CARD_SPACING : p > 0 ? p * CARD_SPACING : 0
          );

      

          const zIndex = useTransform(position, (p) =>
            p === 0 ? cardCount : cardCount - Math.abs(p)
          );

          return (
            <motion.div
              key={skill.id}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                x: "-50%",
                width: 500,
                y,
                scale: 1,
                opacity: 1,
                zIndex,
                transformStyle: "preserve-3d",
              }}
              className="bg-gray-800/60 border border-white/20 backdrop-blur-md rounded-xl shadow-2xl p-8 flex flex-col items-center gap-6 cursor-pointer select-none"
            >
              <h2 className="text-white text-3xl font-bold">{skill.name}</h2>
              <img
                src={skill.img}
                alt={skill.name}
                className="w-[120px] h-[120px] object-contain"
                draggable={false}
              />
              <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                <motion.div
                  style={{ backgroundColor: skill.color }}
                  className="h-full text-white text-center rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 2, ease: "linear" }}
                  
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
     </>
  );
};
