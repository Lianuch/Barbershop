import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchBarbers } from "../../slices/barbersSlice";
import { Barber } from "../Barber/Barber";

export const BarberList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    list: barbers,
    loading,
    error,
  } = useAppSelector((state) => state.barbers);

  useEffect(() => {
    dispatch(fetchBarbers());
  }, [dispatch]);

  return (
    <div >
      <h1 className="text-5xl text-center mb-8">Meet the Masters</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {barbers.map((barber) => (
          <Barber key={barber.id} barber={barber} />
        ))}
      </div>

      {barbers.length === 0 && <p>No barbers found</p>}
    </div>
  );
};
