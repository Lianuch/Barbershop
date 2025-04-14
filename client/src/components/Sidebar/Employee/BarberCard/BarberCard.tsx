import { useLanguage } from "../../../../hooks/useLanguage";
import { BarberCardProps } from "../../../../interfaces/BarberCardProps";

export const BarberCard: React.FC<BarberCardProps> = ({ barber, onSelect, isSelected }) => {
  const { currentLanguage } = useLanguage();

  const barberTranslation = barber.translation.find(
    (t) => t.language === currentLanguage
  );

  return (
    <div
      className={`bg-gray-100 rounded-lg cursor-pointer ${
        isSelected ? "border-2 border-blue-300" : ""
      }`}
    >
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
          checked={isSelected}
          value={barber._id} 
          onChange={() => onSelect(barber._id)} 
        />
      </div>
    </div>
  );
};
