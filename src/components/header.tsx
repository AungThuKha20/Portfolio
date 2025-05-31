import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const [active, setActive] = useState<string>("PORTFOLIO");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const options = [
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

    useEffect(() => {
        const sectionIds = options.map(({ id }) => id);
        const observers: IntersectionObserver[] = [];

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const matched = options.find(opt => opt.id === entry.target.id);
                    if (matched) setActive(matched.label);
                }
            });
        };

        const observerOptions = {
            root: null,
            threshold: 0.4,
            rootMargin: "0px 0px -35% 0px",
        };

        sectionIds.forEach((id) => {
            const section = document.getElementById(id);
            if (section) {
                const observer = new IntersectionObserver(handleIntersect, observerOptions);
                observer.observe(section);
                observers.push(observer);
            }
        });

        return () => observers.forEach(obs => obs.disconnect());
    }, []);

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex fixed top-4 z-[999] w-full justify-center items-center py-2">
                <div className="flex gap-2 bg-black/30 py-1 px-1 rounded-lg shadow-md backdrop-blur-md border border-white/20">
                    {options.map(({ label, id }) => (
                        <motion.a
                            key={label}
                            href={`#${id}`}
                            onClick={() => setActive(label)}
                            className={`relative px-5 h-9 text-sm font-semibold flex items-center justify-center uppercase tracking-wider rounded-md overflow-hidden group transition-all duration-300 ${
                                active === label ? "text-white" : "text-gray-400 hover:text-white"
                            }`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {active === label && (
                                <>
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-700 opacity-30 rounded-md"
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    />
                                    <div className="absolute inset-0 border border-cyan-400 rounded-md pointer-events-none" />
                                </>
                            )}
                            <span className="relative z-10">{label}</span>
                        </motion.a>
                    ))}
                </div>
            </nav>

            {/* Mobile Toggle Button */}
            <div className="md:hidden fixed top-4 left-4 z-[1000]">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="text-white bg-black/50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    aria-label="Open Menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-[999]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                        />

                        {/* Sidebar Panel */}
                        <motion.aside
                            className="fixed top-0 left-0 bottom-0 w-64 bg-black/90 backdrop-blur-md p-6 z-[1000] shadow-lg flex flex-col"
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
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>

                            {/* Sidebar Nav Links */}
                            <nav className="flex flex-col gap-4">
                                {options.map(({ label, id }) => (
                                    <a
                                        key={label}
                                        href={`#${id}`}
                                        onClick={() => {
                                            setActive(label);
                                            setSidebarOpen(false);
                                        }}
                                        className={`text-left text-lg font-semibold uppercase tracking-wide px-3 py-2 rounded-md ${
                                            active === label ? "text-cyan-400" : "text-gray-400 hover:text-cyan-400"
                                        }`}
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
