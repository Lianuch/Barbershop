import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Language } from "../Language/Language";

export const NavLinks = () => {
  const { t } = useTranslation();

  return (
    <>
      {[
        { to: "/", label: t("home") },
        { to: "/barbers", label: t("barbers") },
        { to: "/about", label: t("about") },
        { to: "/contacts", label: t("contacts") },
        { to: "/booking", label: t("booking") },
      ].map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className="hover:scale-95 transition-transform duration-200"
        >
          {label}
        </NavLink>
      ))}

      <Language />
    </>
  );
};
