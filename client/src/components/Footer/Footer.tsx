import { IoCall } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { MdOutlineEventNote } from "react-icons/md";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const footerAnimation = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.18 },
  }),
};
const Footer = () => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 10000);
    return () => clearInterval(interval);
  });

  return (
    <motion.div
      initial="hidden"
      whileInView={"visible" }
      viewport={{ amount: 0.3, once: true }}
      className=" bg-black text-white"
    >
      <div className=" h-32 flex justify-center items-center gap-4">
        <motion.a
          variants={footerAnimation}
          custom={1}
          className="hover:scale-90 "
        >
          <FaInstagram />
        </motion.a>
        <motion.a
          variants={footerAnimation}
          custom={2}
          className="hover:scale-90 "
        >
          <IoCall />
        </motion.a>
        <motion.a
          variants={footerAnimation}
          custom={3}
          className="hover:scale-90 "
        >
          <MdOutlineEventNote />
        </motion.a>
        <motion.a
          variants={footerAnimation}
          custom={4}
          className="hover:scale-90 "
        >
          <MdLocationPin />
        </motion.a>

        <motion.p variants={footerAnimation} custom={5} className="text-lg">© Bliss Barbershop {date.getFullYear()}</motion.p>
      </div>
    </motion.div>
  );
};

export default Footer;
