import { BarberProps } from "../../interfaces/BarberProps";
import { useLanguage } from "../../hooks/useLanguage";
export const Barber: React.FC<BarberProps> = ({ barber }) => {
  const {currentLanguage} = useLanguage()

  const barberTranslation = barber.translation.find((t) => t.language === currentLanguage);
  return (
    <div className="flex flex-col items-center rounded-lg p-4">
      <img src={barber.image} className="rounded-md h-[300px] w-[400px]" alt=' Barber image' />
      <h1 className="text-2xl font-bold my-2">
        {barberTranslation?.name} {barberTranslation?.surname}
      </h1>
      <h3>{barber.barberCategory.categoryName}</h3>
    </div>
  );
};
