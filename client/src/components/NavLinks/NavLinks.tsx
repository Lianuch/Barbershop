import { useTranslation } from "react-i18next";
import { Language } from "../Language/Language";
import { motion } from "framer-motion";
import { scrollToSection } from "../Header/Header";

interface NavProps{
  openSidebar:any
}
export const NavLinks:React.FC<NavProps>= ({openSidebar}) => {

  const { t } = useTranslation();

  const onButton=(id:string)=>{
    id === "booking" ? openSidebar() : scrollToSection(id)
  }

  return (
    <>
      {[
        { id: "barbers", label: t("barbers") },
        { id: "about", label: t("about") },
        { id: "contacts", label: t("contacts") },
        { id: "booking", label: t("booking") },
      ].map(({ id, label }) => (
        <motion.button
          key={id}
          onClick={(event) => {
            event.preventDefault(); 
            onButton(id);
          }}          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hover:scale-95 transition-transform duration-200"
        >
          {label}
        </motion.button>
      ))}

      <Language />
    </>
  );
};
