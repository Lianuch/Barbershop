import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { ServiceProps } from "../../../interfaces/ServiceProps";
import { useAppSelector } from "../../../hooks/useAppSelector";
import BeatLoader from "react-spinners/BeatLoader";

export const Services = ({ setSelectedService }: ServiceProps) => {
  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState<{ [key: string]: boolean }>({});

  const { list: barbers, loading } = useAppSelector((state) => state.barbers);
  const { favors } = useAppSelector((state) => state.favors);

  const categories = [
    ...new Set(barbers.map((barber) => barber.barberCategory?.categoryName)),
  ];

  const handleChange = (barberId: string, favorId: string) => {
    const key = `${barberId}_${favorId}`;
    setIsChecked((prev) => {
      const newChecked = { ...prev, [key]: !prev[key] };
      const selected = newChecked[key] ? favorId : null;
      setSelectedService(selected);
      return newChecked;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <BeatLoader />
      </div>
    );
  }

  return (
    <form className="mt-5">
      <h3 className="text-2xl">{t("selectService")}</h3>
      <div className="flex items-center justify-between my-4">
        <div className="relative w-full">
          <CiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
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

      {categories.map((category) => (
        <div key={category}>
          <h1 className="text-2xl my-2">{category}</h1>
          {barbers
            .filter((barber) => barber.barberCategory?.categoryName === category)
            .map((barber) => (
              <div key={barber._id}>
                {favors
                  .filter((favor) => favor.translations.length > 0)
                  .map((favor) => {
                    const key = `${barber._id}_${favor._id}`;
                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between mt-2 p-2"
                      >
                        <div className="flex flex-col">
                          <h1 className="text-md font-medium">
                            {favor.translations.find((t) => t.language === "en")?.name}
                          </h1>
                          <p className="text-sm text-gray-600">{favor.time}</p>
                          <h1 className="text-md font mt-1">
                            {(favor.price * (barber.coef || 1))} ₴
                          </h1>
                        </div>
                        <input
                          type="checkbox"
                          value={favor._id} 
                          onChange={() => handleChange(barber._id, favor._id)}
                          checked={isChecked[key] || false}
                          className="appearance-none w-6 h-6 border-2 border-gray-400 rounded-md checked:bg-black checked:border-black checked:ring-2 checked:ring-black relative transition-all
                            before:content-['✔'] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:text-white before:opacity-0 checked:before:opacity-100"
                        />
                      </div>
                    );
                  })}
              </div>
            ))}
        </div>
      ))}
    </form>
  );
};