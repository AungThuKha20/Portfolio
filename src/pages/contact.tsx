import { useState } from "react";
import { motion } from "framer-motion";
import contactImg from "../assets/contact.webp"

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
        console.log("Form submitted:", formData);
    };

    return (
        <section id="contact" className=" flex flex-col justify-center items-center px-4 py-16">
            <h1 className="lg:text-7xl md:text-6xl sm:text-5xl text-4xl text-white text-center mb-10">Get in Touch</h1>
            <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl h-[510px] bg-white/5 rounded-xl shadow-xl backdrop-blur-md z-[101]">
                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className=" max-w-[400px]  p-8  h-full caret-transparent flex justify-center items-center"
                >
                    <img
                        src={contactImg}
                        alt="Contact Illustration"
                        className="rounded-xl object-cover object-left w-full h-[60%]"
                    />
                </motion.div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full p-8 "
                >
                    <div className="mb-4">
                        <label className="block text-white mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md bg-white/5 text-white outline-none focus:ring-2 ring-cyan-400"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md bg-white/5 text-white outline-none focus:ring-2 ring-cyan-400"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-white mb-2">Message</label>
                        <textarea
                            name="message"
                            rows={5}
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md bg-white/5 text-white outline-none focus:ring-2 ring-cyan-400"
                        ></textarea>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="bg-cyan-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-cyan-500 transition-colors"
                    >
                        Send Message
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
