import { IoMenu } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { NavLinks } from "../NavLinks/NavLinks";
import { useState } from "react";
import { IoIosArrowRoundForward, IoMdClose } from "react-icons/io";
import { Language } from "../Language/Language";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { t } = useTranslation();


  return (
     <nav className="w-full z-20 sticky top-0 bg-black text-white "> 
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="md:hidden">
            <h1 className="text-xl flex items-center font font-medium ">
              {t("menu")} <IoIosArrowRoundForward size={25} />
            </h1>
          </div>

          <div className="text-xl flex flex-row w-full justify-between ">
            <div className=" hidden md:flex font-bold space-x-4">
              <NavLink to="/">{t("home")}</NavLink>
              <NavLink to="/barbers">{t("barbers")}</NavLink>
              <NavLink to="/about">{t("about")}</NavLink>
              <NavLink to="/contacts">{t("contacts")}</NavLink>
            </div>
            <div className="hidden md:block">
              <div className="flex ml-10 items-baseline space-x-2">
                <NavLink to="/booking">{t("booking")}</NavLink>
                <Language/>

              </div>
            </div>
          </div>
          <div className="md:hidden ">
            <button type="button" onClick={toggleMenu}>
              {isOpen ? <IoMdClose size={25} /> : <IoMenu size={25} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col justify-center items-center gap-y-2 md:hidden ps-4 sm:px-6 pb-10">
          <NavLinks />
        </div>
      )}
    </nav>
  );
};
