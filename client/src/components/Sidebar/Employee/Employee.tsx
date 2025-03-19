import { useTranslation } from "react-i18next";
import { EmployeeProps } from "../../../interfaces/EmployeeProps";
import { SelectButton } from "../SelectButton/SelectButton";

export const Employee = ({
  selectedEmployee,
  setSelectedEmployee,
}: EmployeeProps) => {
  const { t } = useTranslation();
  const timeSlots = ["11:00", "12:00", "13:00", "15:00", "16:00"];
  const masters = ["Barber", "Top Barber", "Prime Barber"];

  return (
    <div>
      <form
        onChange={(e) =>
          setSelectedEmployee((e.target as HTMLInputElement).value)
        }
        className="mt-5"
      >
        <div className="overflow-x-auto whitespace-nowrap flex gap-3 p-2">
        {masters.map((master) => (
            <button
              key={master}
              onClick={() => setSelectedEmployee(master)}
              className={`px-4 py-2 rounded-md bg-gray-200 font-medium transition ${
                selectedEmployee === master
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-300"
              }`}
            >
              {master}
            </button>
          ))}
        </div>

        <h3 className="text-2xl">{t("selectEmployee")}</h3>
        <div className="bg-gray-100 rounded-lg">
          <div className="flex items-center justify-between p-3 mt-4">
            <div className="flex flex-col">
              <h1 className="text-md font-medium">Serhii Bondarenko</h1>
              <p className="text-sm text-gray-600">Barber</p>
            </div>
            <input
              type="radio"
              className="w-6 h-6 border-2 border-gray-400 rounded-full "
              size={40}
              name="employee"
            />
          </div>
        </div>
        <p className="mt-4 text-gray-700">
          {t("timeForBooking")}
          <span className="ml-2 text-zinc-900 font-bold">
            21 березня, п’ятниця:
          </span>
        </p>
        <div className="mt-3 flex gap-3 flex-wrap">
          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              className={`px-4 py-2 rounded-md bg-gray-200 font-medium transition ${
                selectedEmployee === time
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-300"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        {selectedEmployee && (
          <SelectButton text={t("selectService")} onClick={(e) => {e.preventDefault()}} />
        )}
      </form>
    </div>
  );
};
