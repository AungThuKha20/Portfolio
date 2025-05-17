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
        <section className="py-14 px-4 text-white relative h-full flex flex-col justify-center items-center">
            <h2 className="lg:text-7xl md:text-6xl sm:text-5xl text-4xl text-white text-center mb-20">
                Latest Projects
            </h2>

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
                        className="h-[70vh] flex justify-center items-center"
                        key={index}
                        ref={ref}
                    >
                        <motion.div
                            transition={{ duration: 5 }}
                            style={{ scale, opacity }}
                            className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                } gap-10 items-center w-full max-w-6xl max-h-[700px]`}
                        >
                            <div className="text-lg max-w-xl px-4">
                                <h3 className="text-3xl font-semibold text-gray-100">
                                    {project.title}
                                </h3>
                                <p className="mt-5 text-gray-300">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Cupiditate ducimus architecto temporibus distinctio eligendi
                                    voluptas ex.
                                </p>
                                <div className="flex gap-3 items-center mt-6">
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
                                        className="flex items-center justify-center px-4 py-2 border-2 border-cyan-700 rounded-lg shadow-md bg-black/40 backdrop-blur-md group text-white"
                                    >
                                        <Github size={22} className="font-bold group-hover:scale-101 transition" />
                                    </motion.a>
                                </div>

                            </div>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="aspect-video object-cover w-full max-w-xl h-[300px] rounded-lg shadow-md"
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
            className={`relative px-${paddingX} py-1.5 font-bold text-white border-2 border-cyan-700 rounded-lg shadow-md bg-black/40 backdrop-blur-md group`}
        >
            <span className="relative z-10">{buttonTxt}</span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></span>
            <span className="absolute -inset-[1px] rounded-lg border border-cyan-500 opacity-0 group-hover:opacity-100 animate-pulse pointer-events-none"></span>
        </motion.a>
    );
}



