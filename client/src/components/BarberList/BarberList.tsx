import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { fetchBarbers } from "../../slices/barbersSlice";
import { Barber } from "../Barber/Barber";
import { useTranslation } from "react-i18next";

export const BarberList: React.FC = () => {
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
    <div className="my-8">
      <div className=" max-w-7xl mx-auto">
        <h1 className="text-5xl py-6 text-center mb-8">{t("meetBarbers")}</h1>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}   {barbers.length === 0 && (
          <p className="text-center text-black">No barbers found</p>
        )}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 px-4 lg:px-12">
          {barbers.map((barber) => (
            <Barber key={barber._id} barber={barber} />
          ))}
        </div>

      
      </div>
    </div>
  );
};
