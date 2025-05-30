import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";

import html from "../assets/html.png";
import css from "../assets/css.png";
import js from "../assets/js.png";
import ts from "../assets/typescript.png";
import bs from "../assets/bootstrap.png";
import tw from "../assets/tailwind.png";
import react from "../assets/react_logo.png";
import other from "../assets/multiple.png";

interface Skill {
  id: number;
  name: string;
  level: number;
  img: string;
  color: string;
}

const skills: Skill[] = [
  { id: 1, name: "HTML", level: 75, img: html, color: "#fb591f" },
  { id: 2, name: "CSS", level: 75, img: css, color: "#1e97f5" },
  { id: 3, name: "JavaScript", level: 65, img: js, color: "#f0db4f" },
  { id: 4, name: "TypeScript", level: 60, img: ts, color: "#007acc" },
  { id: 5, name: "Bootstrap", level: 60, img: bs, color: "#563d7c" },
  { id: 6, name: "Tailwind CSS", level: 70, img: tw, color: "#06b6d4" },
  { id: 7, name: "React", level: 65, img: react, color: "#61dbfb" },
  { id: 8, name: "Multiple Libraries", level: 60, img: other, color: "#c54881" },
];

interface CardProps {
  skill: Skill;
  onSwipe: (direction: number) => void;
  isTopCard: boolean;
}

const Card = ({ skill, onSwipe, isTopCard }: CardProps) => {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-200, 0, 200], [0.85, 1, 0.85]);
  const rotate = useTransform(x, [-200, 0, 200], [-10, 0, 10]);

  const peekScale = useTransform(x, [-200, 0, 200], [0.9, 0.95, 0.9]);
  const peekOpacity = useTransform(x, [-200, 0, 200], [0.6, 0.8, 0.6]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 150) {
      onSwipe(info.offset.x > 0 ? 1 : -1);
    } else {
      x.set(0);
    }
  };

  return (
    <motion.div
      drag={isTopCard ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{
        x,
        scale: isTopCard ? scale : peekScale,
        rotate: isTopCard ? rotate : "0deg",
        opacity: isTopCard ? 1 : peekOpacity,
      }}
      initial={isTopCard ? { opacity: 0, y: 50, scale: 0.8 } : false}
      animate={isTopCard ? { opacity: 1, y: 0, scale: 1 } : false}
      exit={
        isTopCard
          ? {
            opacity: 0,
            x: x.get() > 0 ? 300 : -300,
            scale: 0.5,
            transition: { duration: 0.4, ease: "easeInOut" },
          }
          : {}
      }
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
      className="absolute md:w-[400px] w-full left-1/2 -translate-x-1/2 top-0 z-10 cursor-grab bg-gray-800/70 border border-white/30 backdrop-blur-lg rounded-2xl shadow-3xl md:p-5 p-3 pb-9 flex flex-col items-center gap-5 overflow-hidden"
    >
      <div className="flex flex-col items-center relative">
        <motion.h2
          className="text-gray-200 md:text-3xl text-2xl font-extrabold tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {skill.name}
        </motion.h2>
        <motion.img
          src={skill.img}
          alt={skill.name}
          className="md:w-[120px] md:h-[120px] w-[80px] h-[80px] object-contain drop-shadow-lg mt-5 z-[-1]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
            type: "spring",
            stiffness: 180,
          }}
        />
      </div>

      <div className="w-full bg-gray-700/40 md:h-4 h-3 rounded-full overflow-hidden ">
        <motion.div
          style={{ backgroundColor: skill.color }}
          className="h-full rounded-full flex items-center justify-end pr-2"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence>
        {isTopCard && (
          <div
            className="absolute bottom-[18px] left-1/2 transform -translate-x-1/2 rounded-full text-black flex items-center gap-2"
          >
            <motion.span
              className="text-white text-sm sm:text-base"
              animate={{ x: [0, -6, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            >
              &#x2190;
            </motion.span>
            <span className="text-white text-sm sm:text-base font-light whitespace-nowrap">
              Swipe to explore
            </span>
            <motion.span
              className="text-white text-sm sm:text-base"
              animate={{ x: [0, 6, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            >
              &#x2192;
            </motion.span>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Skills = () => {
  const [index, setIndex] = useState(0);

  const handleSwipe = () => {
    setIndex((prev) => (prev + 1) % skills.length);
  };

  const displayedSkills = skills.slice(index, index + 2);

  return (
    <div id="skills" className="flex flex-col items-center justify-center h-full overflow-hidden relative  lg:py-30 p-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-gray-100 lg:text-5xl md:text-4xl text-3xl sm:text-6xl font-extrabold md:mb-20 mb-10 text-center drop-shadow-lg leading-tight"
      >
        My <span className="text-cyan-800">Tech</span> Skills
      </motion.h1>

      <div className="relative w-full max-w-lg md:h-[450px] h-[300px] flex justify-center items-center">
        <AnimatePresence initial={false}>
          {displayedSkills
            .slice()
            .reverse()
            .map((skill, i) => (
              <Card
                key={skill.id}
                skill={skill}
                onSwipe={handleSwipe}
                isTopCard={i === displayedSkills.length - 1}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Skills;
