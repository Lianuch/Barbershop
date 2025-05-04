import { BarberProps } from "../../interfaces/BarberProps";
import { useLanguage } from "../../hooks/useLanguage";
import { IoMdClose } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
export const AdminBarber: React.FC<BarberProps> = ({ barber }) => {
    const { currentLanguage } = useLanguage();
    const barberTranslation = barber.translation.find(
      (t) => t.language === currentLanguage
    );
  
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState("");
    const [name, setName] = useState(barberTranslation?.name || "");
    const [surname, setSurname] = useState(barberTranslation?.surname || "");
    const [category, setCategory] = useState(barber.barberCategory?.categoryName || "");
  
    const handleSave = () => {
      console.log("Saving updated barber:", {
        name,
        surname,
        category,
      });
      setIsEditing(false);
    };
  
    return (
      <div className="flex items-center bg-slate-200 rounded-lg p-4 gap-4 mb-4 shadow-sm">
        <img
          src={barber.image}
          alt="Barber"
          className="h-[70px] w-[70px] rounded-lg object-cover"
        />
  
        <div className="flex flex-col flex-1">
          {isEditing ? (
            <>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="text-xl font-bold bg-white rounded px-2 mb-1"
              />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-xl font-bold bg-white rounded px-2 mb-1"
              />
              <input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="text-xl font-bold bg-white rounded px-2 mb-1"
              />
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="text-sm bg-white rounded px-2"
              />
              <button
                onClick={handleSave}
                className="mt-2 px-2 py-1 bg-green-500 text-white rounded text-sm w-fit"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold">
                {barberTranslation?.name} {barberTranslation?.surname}
              </h3>
              <span className="text-sm text-gray-700">
                {barber.barberCategory?.categoryName}
              </span>
            </>
          )}
        </div>
  
        <div className="flex gap-2">
          <button onClick={() => setIsEditing(true)} type="button">
            <MdEdit size={23} />
          </button>
          <button className="text-red-500" type="button">
            <IoMdClose size={25} />
          </button>
        </div>
      </div>
    );
  };
  