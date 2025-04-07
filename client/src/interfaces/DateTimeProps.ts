import  { Dayjs } from "dayjs";

export interface DateTimeProps {
    selectedTime: string | null;
    setSelectedTime: (time: string) => void;
    selectedDate: Dayjs | null;
    setSelectedDate:(date: Dayjs | null) => void

  }