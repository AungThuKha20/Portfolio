// @ts-nocheck
import { useState } from "react";
import RotateTextMotion from "../components/rotateText";
import { motion } from "framer-motion";
import { ArrowBigLeft, FileUser, Github, Info, Linkedin } from "lucide-react";

const Home = () => {
    const [showText, setShowText] = useState<boolean>(false);

    return (

        <div className="pt-10 px-[1%] !select-none ">
            <div className="mt-20 relative ">
                <motion.h1
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-4xl uppercase"
                >
                    <span className="text-[30px]">the digital realm where</span>
                    <span className="block mt-2">creativity meets technology</span>
                </motion.h1>
                <div className="absolute top-[-100%] right-0">
                    <RotateTextMotion />
                </div>
            </div>

            <div className=" text-center font-semibold leading-tight text-7xl font-sans center flex justify-center">
                <h1>AUNG THU KHA</h1>
            </div>

            <motion.div
                className="w-full max-w-[500px] mx-auto h-[600px] relative"
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 3, ease: "easeOut" }}
            >
                <model-viewer
                    src="/me.glb"
                    alt="3D Avatar"
                    auto-rotate
                    camera-controls
                    disable-zoom
                    interaction-prompt="none"
                    interaction-policy="none"
                    style={{ width: "100%", height: "100%", zIndex: 100 }}
                ></model-viewer>

                <div className="absolute top-5 -right-60 w-[400px] z-[101]">
                    <button
                        className="  font-extrabold text-sm h-5 px-4 border-2 border-gray-50 flex justify-center items-center rounded-md "
                        onClick={() => setShowText(!showText)}
                    >
                        Info !
                    </button>
                    {showText && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className=" mt-2 text-gray-50  grid grid-cols-2 w-[300px] py-2 gap-y-2 "
                        >
                            <h1>My github</h1>
                            <a className="w-fit hover:scale-110 transition-all" target="_blank" href="https://github.com/aungthukha"> <Github /></a>
                            <h1>My linkedin</h1>
                            <a className="w-fit hover:scale-110 transition-all" target="_blank" href="https://www.linkedin.com/in/aungthukha"><Linkedin /></a>
                            <h1>My CV</h1>
                            <a className="w-fit hover:scale-110 transition-all" target="_blank" href="https://www.facebook.com/aungthukha"><FileUser /></a>
                        </motion.div>
                    )}

                </div>
            </motion.div>
        </div>
    );
};

export default Home;
