import { IoCall } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { MdOutlineEventNote } from "react-icons/md";
import { useEffect, useState } from "react";

const Footer = () => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 10000);
    return ()=> clearInterval(interval);
  })

  return (
    <div className=" bg-black text-white">

      <div className=" h-32 flex justify-center items-center gap-4">
        <a className="hover:scale-90 " >
        <FaInstagram  />
        </a>
        <a className="hover:scale-90 " >
        <IoCall />
        </a>
        <a className="hover:scale-90 " >
        <MdOutlineEventNote />
        </a>
        <a className="hover:scale-90 " >
    
        <MdLocationPin />
        </a>

        <p className="text-lg">© Bliss Barbershop {date.getFullYear()}</p>
      </div>
    </div>
  );
};

export default Footer;