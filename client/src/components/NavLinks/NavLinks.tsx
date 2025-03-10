import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Language } from "../Language/Language";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { scrollToSection } from "../Header/Header";

export const NavLinks = forwardRef((_props, ref) => {
  const { t } = useTranslation();

  return (
    <>
      {[
        { id: "home", label: t("home") },
        { id: "barbers", label: t("barbers") },
        { id: "about", label: t("about") },
        { id: "contacts", label: t("contacts") },
        { id: "booking", label: t("booking") },
      ].map(({ id, label }) => (
        <motion.button
          key={id}
          onClick={() => scrollToSection(id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hover:scale-95 transition-transform duration-200"
        >
          {label}
        </motion.button>
      ))}

      <Language />
    </>
  );
});

export const MNavLinks = motion(NavLinks);