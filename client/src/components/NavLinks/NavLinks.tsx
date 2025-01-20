import { NavLink } from "react-router-dom";

export const NavLinks = () => {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/barbers">Barbers</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contacts">Contacts</NavLink>
      <NavLink to="/booking">Book now</NavLink>

    </>
  );
};
