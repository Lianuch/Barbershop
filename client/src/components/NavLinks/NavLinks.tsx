import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Language } from "../Language/Language";

export const NavLinks = () => {
  const { t } = useTranslation();

  return (
    <>
      <NavLink to="/">{t("home")}</NavLink>
      <NavLink to="/barbers">{t("barbers")}</NavLink>
      <NavLink to="/about">{t("about")}</NavLink>
      <NavLink to="/contacts">{t("contacts")}</NavLink>
      <NavLink to="/booking">{t("booking")}</NavLink>
      <Language/>
    </>
  );
};
