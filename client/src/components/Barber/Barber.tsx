import { Barbers } from "../../Types/Barbers";

interface BarberProps {
  barber: Barbers;
}
export const Barber: React.FC<BarberProps> = ({ barber }) => {
  return (
      <div className="flex flex-col items-center rounded-lg p-4">
        <img src="https://picsum.photos/200/300?random=1" className="rounded-md" alt="barberImage" />
        <img src="assets/images/logo.png" alt="" />
        <h1 className="text-2xl font-bold my-2">
          {barber.name} {barber.surname}
        </h1>
        <h3>{barber.barberCategory}</h3>
    </div>
  );
};
