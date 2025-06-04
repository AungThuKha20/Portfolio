import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import contactImg from "../assets/contact.png";

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            Swal.fire({
                title: "Message Sent!",
                text: "Thanks for reaching out. I’ll get back to you soon.",
                icon: "success",
                confirmButtonColor: "#4ade80",
                background: "rgba(0, 0, 0, 0.8)",
                color: "#fff",
            });
            setFormData({ name: "", email: "", message: "" });
        }
    };

    return (
        <section
            id="contact"
            className="flex flex-col justify-center items-center px-4 py-16 lg:min-h-screen bg-transparent"
        >
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-gray-100 lg:text-5xl md:text-4xl text-3xl  sm:text-6xl font-extrabold md:mb-20 mb-10 text-center drop-shadow-lg leading-tight"
            >
                Get <span className="text-cyan-800">in</span> Touch
            </motion.h1>

            <motion.div
                whileHover={{ rotateY: 8 }}
                transition={{ type: "spring", stiffness: 150, damping: 12 }}
                className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl bg-white/5 rounded-xl shadow-xl backdrop-blur-md md:p-0"
            >
                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 flex justify-center items-center md:p-4 caret-transparent"
                >
                    <motion.img
                        src={contactImg}
                        alt="Contact Illustration"
                        className="rounded-xl object-cover w-full max-w-sm md:max-w-full h-auto"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </motion.div>
                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    className="w-full md:w-1/2 p-4 md:p-8"
                >
                    <motion.div variants={itemVariants} className="mb-4">
                        <label className="block text-white mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md bg-white/5 text-white outline-none focus:ring-2 ring-cyan-400"
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-4">
                        <label className="block text-white mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md bg-white/5 text-white outline-none focus:ring-2 ring-cyan-400"
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-6">
                        <label className="block text-white mb-2">Message</label>
                        <textarea
                            name="message"
                            rows={5}
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md bg-white/5 text-white outline-none focus:ring-2 ring-cyan-400"
                        />
                    </motion.div>

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="bg-cyan-600 text-white w-full md:w-fit px-6 md:py-3 py-2 rounded-md font-semibold hover:bg-cyan-500 transition-colors"
                    >
                        Send Message
                    </motion.button>
                </motion.form>


            </motion.div>
        </section>
    );
};

export default Contact;
