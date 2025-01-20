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
    <div className="">
      <div className=" max-w-7xl mx-auto">
        <h1 className="text-5xl py-6 text-center mb-8">Meet the Masters</h1>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red">Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 px-4 lg:px-12">
          {barbers.map((barber) => (
            <Barber key={barber._id} barber={barber} />
          ))}
        </div>

        {barbers.length === 0 && (
          <p className="text-center ">No barbers found</p>
        )}
      </div>
    </div>
  );
};
