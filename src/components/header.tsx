import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const [active, setActive] = useState<string>("PORTFOLIO");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Map labels to IDs (home = PORTFOLIO)
    const options: { label: string; id: string }[] = [
        { label: "PORTFOLIO", id: "home" },
        { label: "ABOUT", id: "about" },
        { label: "SKILLS", id: "skills" },
        { label: "PROJECTS", id: "projects" },
        { label: "CONTACT", id: "contact" },
    ];

    const sidebarVariants = {
        hidden: { x: "-100%" },
        visible: { x: 0 },
    };

    return (
        <>
            {/* Desktop / tablet nav */}
            <nav className="hidden md:flex w-full py-2 items-center justify-center fixed top-4 z-[999]">
                <div className="flex gap-2 bg-black/30 py-1 px-1 rounded-lg shadow-md backdrop-blur-md border border-white/20">
                    {options.map(({ label, id }) => (
                        <motion.a
                            href={`#${id}`}
                            key={label}
                            onClick={() => setActive(label)}
                            className={`relative px-5 h-9 text-sm font-semibold flex justify-center cursor-pointer items-center uppercase tracking-wider
                            transition-all duration-300 rounded-md overflow-hidden group
                            ${active === label
                                    ? "text-white"
                                    : "text-gray-400 hover:text-white"
                                }`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {active === label && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500 to-blue-700 opacity-30"
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                />
                            )}
                            {active === label && (
                                <div className="absolute inset-0 border border-cyan-400 rounded-md pointer-events-none" />
                            )}
                            <span className="relative z-10">{label}</span>
                        </motion.a>
                    ))}
                </div>
            </nav>

            {/* Mobile hamburger button */}
            <div className="md:hidden fixed top-4 left-4 z-[1000]">
                <button
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open Menu"
                    className="text-white bg-black/50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                    {/* Hamburger icon */}
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                    >
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </div>

            {/* Mobile sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                        />

                        {/* Sidebar panel */}
                        <motion.aside
                            className="fixed top-0 left-0 bottom-0 w-64 bg-black/90 backdrop-blur-md shadow-lg z-[1000] p-6 flex flex-col"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={sidebarVariants}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <button
                                onClick={() => setSidebarOpen(false)}
                                aria-label="Close Menu"
                                className="self-end mb-6 text-white p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                {/* Close icon */}
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>

                            {/* Sidebar nav buttons */}
                            <nav className="flex flex-col gap-4">
                                {options.map(({ label, id }) => (
                                    <a
                                        key={label}
                                        href={`#${id}`}
                                        onClick={() => {
                                            setActive(label);
                                            setSidebarOpen(false);
                                        }}
                                        className={`text-left text-lg font-semibold uppercase tracking-wide px-3 py-2 rounded-md
                      ${active === label ? "text-cyan-400" : "text-gray-400 hover:text-cyan-400"}`}
                                    >
                                        {label}
                                    </a>
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
