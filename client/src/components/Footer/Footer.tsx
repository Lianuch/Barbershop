import { IoCall } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { MdOutlineEventNote } from "react-icons/md";

const Footer = () => {
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

        <p className="text-lg">© Bliss BARBERSHOP 2025</p>
      </div>
    </div>
  );
};

export default Footer;