import { IoMenu } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { MNavLinks, NavLinks } from "../NavLinks/NavLinks";
import { useState } from "react";
import { IoIosArrowRoundForward, IoMdClose } from "react-icons/io";
import { Language } from "../Language/Language";
import { useTranslation } from "react-i18next";
import { AuthForm } from "../AuthForm/AuthForm";
import { Exit } from "../Exit/Exit";
import { useAppSelector } from "../../hooks/useAppSelector";
import { motion } from "framer-motion";
import { Sidebar } from "../Sidebar/Sidebar";

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [IsExitVisible, setIsExitVisible] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { t } = useTranslation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { isAuth } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleProfile = () => {
    if (isAuth) {
      navigate("/profile");
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <nav className="w-full z-20 sticky top-0 bg-black text-white rounded-b-lg ">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="md:hidden">
              <h1 className="text-xl flex items-center font font-medium ">
                {t("menu")} <IoIosArrowRoundForward size={25} />
              </h1>
            </div>

            <div className="text-xl flex flex-row w-full justify-between ">
              <div className="hidden md:flex font-bold space-x-4">
                {[
                  { id: "home", label: t("home") },
                  { id: "barbers", label: t("barbers") },
                  { id: "about", label: t("about") },
                  { id: "contacts", label: t("contacts") },
                ].map(({ id, label }) => (
                  <motion.button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="hover:scale-95 transition-transform "
                  >
                    {label}
                  </motion.button>
                ))}
              </div>

              <div className="hidden md:block">
                <div className="flex ml-10 items-baseline space-x-2">
                  <button onClick={() => setIsOpen(true)}>
                    {t("booking")}
                  </button>
                  <Language />

                  <div onClick={handleProfile}>
                    <AuthForm />
                  </div>

                  {/* {isAuth && <Exit setIsExitVisible={setIsExitVisible} />} */}
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
            <MNavLinks />
          </div>
        )}
      </nav>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
