import { useTranslation } from "react-i18next";
import {motion} from 'framer-motion'


const aboutAnimation = {
  hidden:{
    x:- 100,
    opacity:0
  },
  visible: (custom: number)=>({
    x: 0,
    opacity:1,
    transition:{delay: custom * 0.2}
  })
}
export const About = () => {
  const { t } = useTranslation();
  return (
   
<motion.div 
  id="about"
  initial="hidden"
  whileInView={"visible"}
    viewport={{ once: true }}

className="w-full p-4 py-4">
  <div className="mx-auto ps-4 max-w-4xl">
    <div className="flex flex-col lg:flex-row items-center justify-between h-auto lg:h-80 space-y-4 lg:space-y-0 lg:space-x-6">
      <div className="flex w-full justify-center lg:justify-start">
      <motion.h1   variants={aboutAnimation} custom={1} className="text-5xl text-center">{t("aboutTitle")}</motion.h1>
      </div>
      <div>
        <motion.p   variants={aboutAnimation} custom={2} className="text-xl max-w-xl lg:max-w-2xl text-justify ">
        {t("aboutDescription")}
        </motion.p>
      </div>
    </div>
  </div>
</motion.div>


  
  );
};
