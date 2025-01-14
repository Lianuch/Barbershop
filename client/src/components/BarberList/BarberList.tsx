import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchBarbers } from "../../slices/barbersSlice";
import { Barber } from "../Barber/Barber";

export const BarberList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.barbers);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchBarbers());
    }
  }, [dispatch]);
  
  return (
    <div>
      <h1 className="text-5xl text-center mb-8">Meet the Masters</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* {
        list.map((barber) => (
          <Barber barber={barber} key={barber.id} />
        ))
      } */}
      {list.length === 0 && <p>No barbers found</p>}
    </div>
  );
};
