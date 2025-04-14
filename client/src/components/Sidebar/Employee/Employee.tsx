import { useTranslation } from "react-i18next";
import { EmployeeProps } from "../../../interfaces/EmployeeProps";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {  useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { BarberCards } from "./BarberCards/BarberCards";

export const Employee = ({
  selectedEmployee,
  setSelectedEmployee,
}: EmployeeProps) => {
  const { t } = useTranslation();

  const { list: barbers, loading } = useAppSelector((state) => state.barbers);
  const categories = [
    ...new Set(barbers.map((barber) => barber.barberCategory?.categoryName)),
  ];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const handleEmployeeSection = (barberId: string)=>{
    console.log("barberId",barberId);
    setSelectedEmployee(barberId);
  }
useEffect(()=>{

  console.log("Updated selectedEmployee in Employee:", selectedEmployee);

},[selectedEmployee])

const handleClick = (e: React.MouseEvent<HTMLButtonElement>,category: string)=>{
  e.preventDefault();
  setSelectedCategory(category)
}
  return (
    <div>
      <form
        onChange={(e) =>
          setSelectedEmployee((e.target as HTMLInputElement).value)
        }
        className="mt-5"
      >
        <div className="overflow-x-auto whitespace-nowrap flex gap-3 p-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={(e) =>handleClick(e,category)}
              className={`px-4 py-2 rounded-md bg-gray-200 font-medium transition ${
                selectedCategory === category
                  ? "bg-blue-500"
                  : "hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {loading && (
          <div>
            <BeatLoader />
          </div>
        )}
        <h3 className="text-2xl mb-4">{t("selectEmployee")}</h3>

        <BarberCards onSelect={handleEmployeeSection} selectedEmployee={selectedEmployee} selectedCategory={selectedCategory} />
      </form>
    </div>
  );
};
