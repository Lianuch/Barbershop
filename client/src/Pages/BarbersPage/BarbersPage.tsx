import { useBarbers } from "../../hooks/useBarbers";

export const BarbersPage = () => {
  const { barber } = useBarbers();

  return (
    <div >

      <ul>
        {barber.map((b) => {
          return (
            <li key={b.id}>
              {b.name} | {b.surname}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
