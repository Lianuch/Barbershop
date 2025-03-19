import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { ServiceProps } from "../../../interfaces/ServiceProps";
import { SelectButton } from "../SelectButton/SelectButton";
import { Employee } from "../Employee/Employee";

export const Services = ({
  selectedService,
  setSelectedService,
}: ServiceProps) => {
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  return (
    <form
      className="mt-5"
      onChange={(e) => setSelectedService((e.target as HTMLInputElement).value)}
    >
      <h3 className="text-2xl">{t("selectService")}</h3>
      <div className="flex items-center justify-between  my-4">
        <div className="relative w-full">
          <CiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 "
            size={20}
          />
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:border-black w-full p-2 ps-10"
            placeholder="Search..."
            
          />
        </div>
      </div>

      <h1 className="text-2xl my-2">Barber</h1>

      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-col">
          <h1 className="text-md font-medium">Haircut</h1>
          <p className="text-sm text-gray-600">1 h 30 min</p>
          <h1 className="text-md font mt-1">450 ₴</h1>
        </div>
        <input
          type="checkbox"
          onChange={handleChange}
          checked={isChecked}
          className="appearance-none w-6 h-6 border-2 border-gray-400 rounded-md checked:bg-black checked:border-black checked:ring-2 checked:ring-black relative transition-all
          before:content-['✔'] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:text-white before:opacity-0 checked:before:opacity-100"          size={40}
        />
      </div>
      {/* {selectedService && (
        <SelectButton text={t("selectEmployee")} onClick={(e) => { e.preventDefault();
        }} />
      )} */}
    </form>
  );
};
