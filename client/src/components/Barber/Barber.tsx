import { Barbers } from "../../Types/Barbers";

interface BarberProps {
  barber: Barbers;
}
export const Barber: React.FC<BarberProps> = ({ barber }) => {
  return (
      <div className="flex flex-col justify-center items-center">
        <img src="https://picsum.photos/200/300?random=1" alt="barberImage" />
        <h1 className="text-2xl font-bold my-2">
          {barber.name} {barber.surname}{" "}
        </h1>
    </div>
  );
};
