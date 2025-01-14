import { Barbers } from "../../Types/Barbers";

interface BarberProps {
  barber: Barbers;
}
export const Barber: React.FC<BarberProps> = ({ barber }) => {
  return (
    <div>
      <h1>Meet the Masters</h1>
      <h3>{barber.name} </h3>
      <h3>{barber.surname}</h3>
      <p>{barber.id}</p>
    </div>
  );
};
