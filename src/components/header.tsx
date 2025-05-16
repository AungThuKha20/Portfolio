import { useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
    const [active, setActive] = useState<string>("PORTFOLIO");
    const options: string[] = ["PORTFOLIO", "ABOUT", "SKILLS", "PROJECTS", "CONTACT"];

    return (
        <nav className="w-full py-2 flex items-center justify-center fixed top-4 z-[999]">
            <div className="flex gap-2 bg-black/30 py-1 rounded-lg shadow-md backdrop-blur-md border border-white/20">
                {options.map((label) => (
                    <motion.button
                        key={label}
                        onClick={() => setActive(label)}
                        className={`relative px-5 h-9 text-sm font-semibold uppercase tracking-wider
                            transition-all duration-300 rounded-md overflow-hidden group
                            ${active === label
                                ? "text-white"
                                : "text-gray-400 hover:text-white"}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Background highlight animation */}
                        {active === label && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500 to-blue-700 opacity-30"
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />
                        )}

                        {/* Static border glow (no animation) */}
                        {active === label && (
                           <div className="absolute inset-0 border border-cyan-400 rounded-md pointer-events-none" />
                        )}

                        <span className="relative z-10">{label}</span>
                    </motion.button>
                ))}
            </div>
        </nav>
    );
};

export default Header;
