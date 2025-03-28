import { useTranslation } from "react-i18next";
import { IoIosArrowRoundBack, IoIosPeople, IoMdClose } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { SidebarProps } from "../../interfaces/SidebarProps";
import { useState } from "react";
import { Employee } from "./Employee/Employee";
import { Services } from "./Servicess/Services";
import { DateTime } from "./DateTime/DateTime";
import { SelectButton } from "./SelectButton/SelectButton";

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);


  const handleItemClick = (item: string) => {
    setSelectedItem(item === selectedItem ? null : item);

  };
function test(){
  console.log(selectedEmployee, selectedTime, selectedService);
}
  const handleBackClick = () => {
    setSelectedItem(null);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Background Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-40"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-l-md bg-slate-300 shadow-lg p-5 transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto max-h-screen`}
      >
        {/* Close Button */}
        <div className="flex justify-end my-4">
          <button
            className="bg-gray-100 shadow-lg p-2 rounded-full hover:scale-110 hover:text-red-500"
            onClick={() => setIsOpen(false)}
          >
            <IoMdClose size={25} />
          </button>
        </div>

        {/* Main Content */}
        {selectedItem === null ? (
          <>
            <div className="flex flex-col items-start">
              <h2 className="text-2xl">{t("aboutTitle")}</h2>
              <p className="mt-1 text-gray-500 text-sm">{t("streetAdress")}</p>
            </div>

            <ul className="mt-5 space-y-3">
              {[ 
                {
                  icon: <IoIosPeople size={20} />,
                  text: t("selectEmployee"),
                  id: "employee",
                },
                {
                  icon: <MdDateRange size={20} />,
                  text: t("selectDateTime"),
                  id: "date",
                },
                {
                  icon: <FaList size={20} />,
                  text: t("selectService"),
                  id: "services",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleItemClick(item.id)}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <div className="p-3 bg-gray-200 rounded-full flex items-center justify-center">
                    <div>{item.icon}</div>
                  </div>
                  <p className="flex-1 ml-3">{item.text}</p>
                  <FaChevronRight size={20} className="text-gray-400 ml-auto" />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="mt-5">
            {/* Back Button */}
            <div className="flex gap-3 items-center">
              <button
                className="bg-gray-100 shadow-lg px-2 rounded-md hover:scale-110 hover:text-red-500 flex-grow-0"
                onClick={handleBackClick}
              >
                <IoIosArrowRoundBack size={30} />
              </button>
              <div className="flex flex-col items-start">
                <h2 className="text-2xl">{t("aboutTitle")}</h2>
                <p className="mt-1 text-gray-500 text-sm">{t("streetAdress")}</p>
              </div>
            </div>

            {/* Render selected content */}
            {selectedItem === "employee" && (
              <Employee
                setSelectedEmployee={setSelectedEmployee}
                selectedEmployee={selectedEmployee}
              />
            )}
            {selectedItem === "date" && (
              <DateTime
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            )}
            {selectedItem === "services" && (
              <Services
                setSelectedService={setSelectedService}
                selectedService={selectedService}
              />
            )}

            {/* Button to proceed or go back based on selection */}
            {selectedEmployee && selectedTime !== "services" && (
              <SelectButton
                text={
                  selectedItem === "services"
                    ? t("selectEmployee")
                    : selectedItem === "date"
                    ? t("selectService")
                    : t("selectService")
                }
                onClick={(e) => {
                  e.preventDefault();
                  if (selectedItem === "services") {
                    setSelectedItem("employee");
                  } else if (selectedItem === "employee") {
                    setSelectedItem("date");
                  } else {
                    setSelectedItem("services");
                  }
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
