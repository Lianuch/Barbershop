import { BarberProps } from "../../interfaces/BarberProps";

export const Barber: React.FC<BarberProps> = ({ barber }) => {
  return (
    <div className="flex flex-col items-center rounded-lg p-4">
      <img src={barber.image} className="rounded-md h-[300px] w-[400px]" alt=' Barber image' />
      <h1 className="text-2xl font-bold my-2">
        {barber.name} {barber.surname}
      </h1>
      <h3>{barber.barberCategory}</h3>
    </div>
  );
};
