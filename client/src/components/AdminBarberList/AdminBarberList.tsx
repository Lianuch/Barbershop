import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchBarbers } from "../../slices/barbersSlice";
import { useTranslation } from "react-i18next";
import { AdminBarber } from "../AdminBarber/AdminBarber";

export const AdminBarberList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    list: barbers,
    loading,
    error,
  } = useAppSelector((state) => state.barbers);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(fetchBarbers(i18n.language));
  }, [dispatch, i18n.language]);

  return (
    <div id="barbers" className="my-8">
      <div className=" max-w-7xl mx-auto">

        {loading && <p className="text-center">Loading...</p>}
        {error && (
          <p className="text-center text-red-500">
            Error: {error}{" "}
            {barbers.length === 0 && (
              <p className="text-center text-black">No barbers found</p>
            )}
          </p>
        )}

        <ul className="gap-2 px-4 ">
          {barbers.map((barber) => (
            <li key={barber._id}>
              <AdminBarber  barber={barber} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
