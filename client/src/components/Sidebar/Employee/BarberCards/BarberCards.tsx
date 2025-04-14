import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { BarberCardsProps } from "../../../../interfaces/BarberCardsProps";
import { useEffect } from "react";
import { fetchBarbers } from "../../../../slices/barbersSlice";
import { BarberCard } from "../BarberCard/BarberCard";
import BeatLoader from "react-spinners/BeatLoader";

export const BarberCards: React.FC<BarberCardsProps> = ({ onSelect, selectedEmployee, selectedCategory}) => {
    const dispatch = useAppDispatch();
    const {
      list: barbers,
      loading,
    } = useAppSelector((state) => state.barbers);
    const { i18n } = useTranslation();
  
    useEffect(() => {
      dispatch(fetchBarbers(i18n.language));
    }, [dispatch, i18n.language]);
  
    const filteredBarbers = selectedCategory ? barbers.filter((barber)=>barber.barberCategory?.categoryName===selectedCategory):barbers
  
    return (
      <div className="flex flex-col  gap-2">
        {filteredBarbers.map((barber) => (
          <BarberCard key={barber._id} barber={barber} onSelect={onSelect} isSelected={selectedEmployee === barber._id} />
        ))}
  
        {loading && (
          <div className="flex justify-center">
            <BeatLoader />
          </div>
        )}
      </div>
    );
  };