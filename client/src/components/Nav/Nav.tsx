import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { NavLinks } from "../NavLinks/NavLinks";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="w-1/3 flex justify-end">
        <div className="hidden w-full md:flex justify-evenly">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>{isOpen ? "" : <IoMenu />}</button>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col items-center md:hidden">
          <NavLinks />
        </div>
      )}
    </>
  );
};
