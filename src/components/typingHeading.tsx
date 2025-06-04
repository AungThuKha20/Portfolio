import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TypingHeading = () => {
    const fullText1 = "the digital realm where";
    const fullText2 = "creativity meets technology";

    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");

    useEffect(() => {
        if (text1.length < fullText1.length) {
            const timeout = setTimeout(() => {
                setText1(fullText1.slice(0, text1.length + 1));
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [text1]);

    useEffect(() => {
        if (text1 === fullText1 && text2.length < fullText2.length) {
            const timeout = setTimeout(() => {
                setText2(fullText2.slice(0, text2.length + 1));
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [text1, text2]);

    return (
        <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:text-4xl md:text-3xl text-xl md:text-start text-center uppercase md:h-[100px] h-[80px]"
        >
            <span className="lg:text-[30px] md:text-2xl text-xl block">{text1}</span>
            <span className="block">{text2}</span>
        </motion.h1>
    );
};

export default TypingHeading;
