import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { useLanguage } from "../../../../hooks/useLanguage";
import { BarberProps } from "../../../../interfaces/BarberProps";
import { useTranslation } from "react-i18next";
import { fetchBarbers } from "../../../../slices/barbersSlice";
import BeatLoader from "react-spinners/BeatLoader";

export const BarberCards: React.FC = () => {
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
    <div className="flex flex-col  gap-2">
      {barbers.map((barber) => (
        <BarberCard key={barber._id} barber={barber} />
      ))}

      {loading && (
        <div className="flex justify-center">
          <BeatLoader />
        </div>
      )}
    </div>
  );
};

export const BarberCard: React.FC<BarberProps> = ({ barber }) => {
  const { currentLanguage } = useLanguage();

  const barberTranslation = barber.translation.find(
    (t) => t.language === currentLanguage
  );

  return (
    <div className="bg-gray-100 rounded-lg">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <img
            src={barber.image}
            style={{ borderRadius: "100%" }}
            height="50px"
            width="50px"
          />
          <div className="flex flex-col">
            <h1 className="text-md font-medium">
              {barberTranslation?.name} {barberTranslation?.surname}
            </h1>
            <p className="text-sm text-gray-600">
              {barber.barberCategory?.categoryName}
            </p>
          </div>
        </div>
        <input
          type="radio"
          className="w-6 h-6 border-2 border-gray-400 rounded-full"
          name="employee"
        />
      </div>
    </div>
  );
};
