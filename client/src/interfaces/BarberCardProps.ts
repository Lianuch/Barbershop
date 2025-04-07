import { Barbers } from "../Types/Barbers";

export interface BarberCardProps {
    barber: Barbers;
    onSelect: (barberId: string) => void;
    isSelected: boolean ;
  }