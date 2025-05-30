import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github } from "lucide-react";

type Project = {
    title: string;
    tag: string;
    image: string;
    header?: boolean;
};

const projects: Project[] = [
    {
        title: "AI Portfolio Website",
        tag: "Web Dev",
        image:
            "https://plus.unsplash.com/premium_photo-1681400690940-8eff232a8f7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmVvbiUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        title: "3D Product Configurator",
        tag: "3D Experience",
        image:
            "https://plus.unsplash.com/premium_photo-1661909976446-3d686365b6f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmVvbiUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        title: "Fullstack Booking App",
        tag: "MERN Stack",
        image:
            "https://images.unsplash.com/photo-1581181780490-cd1df3c8ee40?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5lb24lMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
    },
];

const Projects = () => {
    return (
        <section id="projects" className=" lg:py-30 px-4 text-white bg-transparent relative h-full flex flex-col justify-center gap-10 items-center">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-gray-100 lg:text-5xl md:text-4xl text-3xl  sm:text-6xl font-extrabold mb-10 text-center drop-shadow-lg leading-tight"
            >
                Latest <span className="text-cyan-800">Projects</span>
            </motion.h1>

            {projects.map((project, index) => {
                const ref = useRef(null);
                const { scrollYProgress } = useScroll({
                    target: ref,
                    offset: ["start end", "center center"],
                });

                const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
                const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

                return (
                    <div
                        className="lg:h-[60vh]  h-full w-full flex gap-10 justify-center items-center"
                        key={index}
                        ref={ref}
                    >
                        <motion.div
                            transition={{ duration: 5 }}
                            style={{ scale, opacity }}
                            className={`flex flex-col-reverse md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                } lg:gap-10 gap-5 items-center w-full max-w-6xl md:max-h-[700px]`}
                        >
                            <div className="text-lg max-w-xl px-4">
                                <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-gray-100">
                                    {project.title}
                                </h3>
                                <p className="md:mt-5 mt-2 text-gray-300 md:text-md text-sm">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Cupiditate ducimus architecto temporibus distinctio eligendi
                                    voluptas ex.
                                </p>
                                <div className="flex gap-3 items-center lg:mt-6 md:mt-5 mt-4">
                                    <LinkBtn buttonTxt="Demo" paddingX="4" />
                                    <motion.a
                                        href="#"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 15,
                                        }}
                                        className="flex items-center justify-center px-4 md:py-2 py-[0.15rem] border-2 border-cyan-700 rounded-lg shadow-md bg-black/40 backdrop-blur-md group text-white"
                                    >
                                        <Github size={22} className="font-bold group-hover:scale-101 transition" />
                                    </motion.a>
                                </div>

                            </div>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="aspect-video object-cover w-full lg:max-w-xl max-w-[500px] rounded-lg shadow-md"
                            />
                        </motion.div>
                    </div>
                );
            })}
        </section>
    );
};

export default Projects;
export function LinkBtn({ buttonTxt, paddingX = "4" }: { buttonTxt: string; paddingX?: string }) {
    return (
        <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
            }}
            className={`relative px-${paddingX} md:py-2.5 py-1 font-bold text-white md:text-md text-sm border-2 border-cyan-700 rounded-lg shadow-md bg-black/40 backdrop-blur-md group`}
        >
            <span className="relative z-10">{buttonTxt}</span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></span>
            <span className="absolute -inset-[1px] rounded-lg border border-cyan-500 opacity-0 group-hover:opacity-100 animate-pulse pointer-events-none"></span>
        </motion.a>
    );
}



