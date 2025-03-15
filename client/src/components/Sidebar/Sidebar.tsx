import { useTranslation } from "react-i18next";
import { IoIosPeople, IoMdClose } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

export interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();

  return (
    <div className="relative flex items-center justify-center ">
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-40"
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full  w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-l-md bg-slate-300 shadow-lg p-5 transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end my-4">
          <button onClick={() => setIsOpen(false)} className="0">
            <IoMdClose
              size={25}
              className="hover:text-red-500 hover:scale-110"
            />
          </button>
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-2xl">{t("aboutTitle")}</h2>
          <p className="mt-1 text-gray-500 text-sm">{t("streetAdress")}</p>
        </div>
        <ul className="mt-5 space-y-3 ">
          {[
            { icon: <IoIosPeople size={20} />, text: "Вибрати співробітника" },
            { icon: <MdDateRange size={20} />, text: "Вибір дати та часу" },
            { icon: <FaList size={20} />, text: "Вибір послуг" },
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-center  p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div className="p-3 bg-gray-200 rounded-full flex items-center justify-center">
                <div>{item.icon}</div>
              </div>
              <p className="flex-1 ml-3">{item.text}</p>
              <FaChevronRight size={20} className="text-gray-400 ml-auto" />
            </li>
          ))}
        </ul>

        <div className="bg-black h-1"></div>
      </div>
    </div>
  );
};
