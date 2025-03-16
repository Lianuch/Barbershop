import { useTranslation } from "react-i18next";

interface EmployeeProps {
  selectedEmployee: string | null;
  setSelectedEmployee: (selectedEmployee: string | null) => void;
}

export const Employee = ({ selectedEmployee, setSelectedEmployee }: EmployeeProps) => {
  const { t } = useTranslation();
  const timeSlots = ["11:00", "12:00", "13:00", "15:00", "16:00"];

  return (
    <div>
      <form
        onChange={(e) =>
          setSelectedEmployee((e.target as HTMLInputElement).value)
        }
        className="mt-5"
      >
        <h3 className="text-2xl">{t("selectEmployee")}</h3>
        <div className="bg-gray-100 rounded-lg">
          <div className="flex items-center justify-between p-3 mt-4">
            <div className="flex flex-col">
              <h1 className="text-md font-medium">Name Surname</h1>
              <h3 className="text-sm text-gray-500">Category</h3>
            </div>
            <input type="radio" size={40} name="employee" />
          </div>
        </div>
        <p className="mt-4 text-gray-700">
          {t('timeForBooking')}
          <span className="ml-2 text-zinc-900 font-bold">
            21 березня, п’ятниця:
          </span>
        </p>
        <div className="mt-3 flex gap-3 flex-wrap">
          {timeSlots.map((time) => (
            <button
              key={time}
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
          <button className="bg-black text-white w-full py-2 rounded-lg mt-5">
            {t("selectService")}
          </button>
        )}
      </form>
    </div>
  );
};
