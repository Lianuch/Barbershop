import {  NavLink } from 'react-router-dom'


export const Header = () => {
  return (
    <div className='flex gap-2 bg-black text-white h-10 p-2'>
        <div className='flex gap-2'>

        <NavLink to="/">Home</NavLink>
        <NavLink to="/barbers">Barbers</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
        </div>
        <div className='ml-auto'>
        <NavLink to="/booking">Book now</NavLink>

        </div>
    </div>
  )
}
