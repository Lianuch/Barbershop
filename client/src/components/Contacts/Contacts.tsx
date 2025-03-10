import { useTranslation } from "react-i18next";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const contactsAnimation = {
  hidden:{
    y:- 100,
    opacity:0
  },
  visible:{
    y: 0,
    opacity:1,
    transition:{delay: 0.6}
  }
}
const iconAnimation = {
  hidden:{
    x:- 100,
    opacity:0
  },
  visible: (custom: number)=>({
    x: 0,
    opacity:1,
    transition:{delay: custom * 0.3}
  })
}

export const Contacts:React.FC = () => {
    const { t } = useTranslation();

    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  return (
    <motion.div 
    initial="hidden"
    whileInView={"visible"}
    viewport={{ amount:0.3 ,once: true }}
    className=" bg-black text-white p-4 " id="contacts">
      <motion.h1 variants={contactsAnimation} className="text-5xl text-center mb-8">{t("contacts")}</motion.h1>
      <div className="mt-4 grid sm:grid-cols-3 gap-4 mb-4">
        <motion.div variants={iconAnimation} custom={1} className="flex flex-col items-center">
          <LuMapPin style={{ fontSize: "40px" }} />
          <p className="mt-4"> {t("streetAdress")}</p>
        </motion.div>
        <motion.div variants={iconAnimation} custom={2} className="flex flex-col items-center">
          <IoMdTime style={{ fontSize: "40px" }} />
          <p className="mt-4">10:00 - 21:00</p>
        </motion.div>
        <motion.div variants={iconAnimation} custom={3} className="flex flex-col items-center">
          <FaPhoneAlt style={{ fontSize: "40px" }} />
          <p className="mt-4">{t("phone")}</p>
        </motion.div>
      </div>

      <motion.iframe
        className="opacity-70 hover:opacity-100"
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d4971.741468944678!2d24.021033!3d49.842895!3m2!1i1024!2i768!4f13.1!5e1!3m2!1suk!2sua!4v1736688387951!5m2!1suk!2sua"
        width="100%"
        height="450"
        style={{ border: 0, scale, opacity }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></motion.iframe>
    </motion.div>
  );
};
