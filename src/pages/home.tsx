// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, FileUser } from "lucide-react";
import RotateTextMotion from "../components/rotateText";
import TypingHeading from "../components/typingHeading";

const typingText = `Hey there! 👋
You clicked the button — nice!
Check out my GitHub, LinkedIn, and CV.
Let’s make some cool stuff together! 🚀`;

const Home = () => {
  const [showText, setShowText] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  const modelRef = useRef<HTMLDivElement | null>(null);
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMdUp(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);



  useEffect(() => {
    if (showText && typingIndex < typingText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + typingText[typingIndex]);
        setTypingIndex(typingIndex + 1);
      }, 0.1);
      return () => clearTimeout(timeout);
    }
    if (!showText) {
      setDisplayedText("");
      setTypingIndex(0);
    }
  }, [showText, typingIndex]);

  return (
    <div id="home" className="md:pt-10 px-[2%] !select-none">
      <div className="mt-20 relative">
        <TypingHeading />
        <div className="absolute top-[-100%] right-0 lg:block hidden">
          <RotateTextMotion />
        </div>
      </div>

      <div className="text-center relative  text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-sans flex justify-center center">
        <h1>AUNG THU KHA</h1>
        <p className=" text-xs absolute -top-2 lg:hidden block">Hi, I am Frontend Developer</p>
      </div>

      <motion.div
        className="w-full md:max-w-[500px] max-w-[200px] mx-auto h-[500px] md:h-[600px] relative"
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <model-viewer
          src="/me.glb"
          ref={modelRef}
          alt="3D Avatar"
          auto-rotate
          {...(isMdUp
            ? {
              cameraControls: true,
              interactionPrompt: "auto",
              interactionPolicy: "allow-when-focused",
            }
            : {
              cameraControls: false,
              interactionPrompt: "none",
              interactionPolicy: "none",
            })}
          disable-zoom
          style={{ width: "100%", height: "100%", zIndex: 100 }}
        ></model-viewer>
        <div className="absolute top-5 md:left-90 -left-14 w-[400px] z-[101]">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onClick={() => setShowText((prev) => !prev)}
            className="relative px-6 md:h-10 h-6 text-sm font-bold text-white border-2 border-cyan-700 rounded-lg overflow-hidden shadow-md bg-black/80 backdrop-blur-md group"
          >
            <span className="relative z-10">Click Me</span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="absolute -inset-[1px] rounded-lg border border-cyan-500 opacity-0 group-hover:opacity-100 animate-pulse pointer-events-none"></span>
          </motion.button>

          {showText && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.01 }}
              className="mt-4 text-gray-50 whitespace-pre-wrap font-mono text-sm bg-black/50 p-4 rounded-md"
            >
              {displayedText}
            </motion.div>
          )}

          {showText && typingIndex >= typingText.length && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 ml-5 grid grid-cols-2 gap-y-3 w-[300px] text-sm text-gray-200"
            >
              <h1 className="font-semibold">My GitHub</h1>
              <a
                className="w-fit hover:scale-110 transition-transform"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/AungThuKha20"
              >
                <Github />
              </a>

              <h1 className="font-semibold">My LinkedIn</h1>
              <a
                className="w-fit hover:scale-110 transition-transform"
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/aung-thukha-20a57a256/"
              >
                <Linkedin />
              </a>

              <h1 className="font-semibold">My CV</h1>
              <a
                className="w-fit hover:scale-110 transition-transform"
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/aungthukha"
              >
                <FileUser />
              </a>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
