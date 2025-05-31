import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchBarbers } from "../../slices/barbersSlice";
import { useTranslation } from "react-i18next";
import { AdminEditBarber } from "../AdminEditBarber/AdminEditBarber";
import BeatLoader from "react-spinners/BeatLoader";

export const AdminEditBarberList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    list: barbers,
    loading,
    error,
    lastUpdated,
  } = useAppSelector((state) => state.barbers);
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(fetchBarbers(i18n.language));
  }, [dispatch, i18n.language]);

  return (
    <div
      id="barbers"
      className={`my-8 min-h-[200px] ${
        barbers.length === 0 && !loading ? "bg-[#cad2c5]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {loading && (
          <p className="text-center">
            <BeatLoader color="#60BDE6" />
          </p>
        )}
        {!loading && error && (
          <p className="text-center text-red-500">Error: {error}</p>
        )}
        {!loading && !error && barbers.length === 0 && (
          <p className="text-center text-black">No barbers found</p>
        )}
        {!loading && barbers.length > 0 && (
          <ul className="gap-2 px-4">
            {barbers.map((barber) => (
              <li key={barber._id}>
                <AdminEditBarber barber={barber} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
