import { DateTimeProps } from "../../../interfaces/DateTimeProps";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import  { Dayjs } from "dayjs";

export const DateTime: React.FC<DateTimeProps> = ({
  selectedTime,
  setSelectedTime,
  selectedDate,
  setSelectedDate,
}) => {

  const timeSlots = [
    { label: "9:00", hour: 9 },
    { label: "10:00", hour: 10 },
    { label: "11:00", hour: 11 },
    { label: "12:00", hour: 12 },
    { label: "13:00", hour: 13 },
    { label: "14:00", hour: 14 },
    { label: "15:00", hour: 15 },
    { label: "16:00", hour: 16 },
    { label: "17:00", hour: 17 },
    { label: "18:00", hour: 18 },
    { label: "19:00", hour: 19 },
    { label: "20:00", hour: 20 },
  ];
const handleDateChange = (date: Dayjs | null) => {
  setSelectedDate(date);
  console.log("Selected Date:", date ? date.format("YYYY-MM-DD") : "None", "Selected Time:", selectedTime);

}
  const groupedSlots = {
    Morning: timeSlots.filter((slot) => slot.hour >= 9 && slot.hour < 12),
    Day: timeSlots.filter((slot) => slot.hour >= 12 && slot.hour <= 17),
    Evening: timeSlots.filter((slot) => slot.hour > 17 && slot.hour <= 20),
  };

  return (
    <form className="mt-5">
      <div className="overflow-hidden px-4 flex justify-center">

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar 
          value={selectedDate}
          onChange={handleDateChange}
          sx={{ width: "100%" }} />
        </LocalizationProvider>
      </div>
      {Object.entries(groupedSlots).map(([period, slots]) => (
        <div key={period}>
          <h3 className="text-lg font-semibold my-2">{period}</h3>
          <div className="grid grid-cols-3 gap-3">
            {slots.map((slot) => (
              <button
                type="button"
                key={slot.label}
                onClick={() => setSelectedTime(slot.label)}
                className={`px-4 py-2 rounded-2xl  font-medium transition ${
                  selectedTime === slot.label
                    ? "bg-black text-white"
                    : " hover:bg-gray-300"
                }`}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    
    </form>
  );
};
