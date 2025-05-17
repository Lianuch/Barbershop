import { BarberProps } from "../../interfaces/BarberProps";
import { useLanguage } from "../../hooks/useLanguage";
import { IoMdClose } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Barbers } from "../../Types/Barbers";
import { toast } from "react-toastify";
import { removeBarber } from "../../slices/barbersSlice";

export const AdminBarber: React.FC<BarberProps> = ({ barber }) => {
  const { currentLanguage } = useLanguage();
  const barberTranslation = barber.translation.find(
    (t) => t.language === currentLanguage
  );
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState(barberTranslation?.name || "");
  const [surname, setSurname] = useState(barberTranslation?.surname || "");
  const [category, setCategory] = useState(
    barber.barberCategory?.categoryName || ""
  );

  const handleSave = () => {
    console.log("Saving updated barber:", {
      name,
      surname,
      category,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(removeBarber(barber._id));
    setShowDeleteConfirmation(false);
    setTimeout(() => {
      toast.success("Barber deleted successfully!", {
        autoClose: 2000, 
        hideProgressBar: true,
        closeOnClick: true, 
        pauseOnHover: false, 
        draggable: false,
        theme: "dark", 
      });
    }, 1000);

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
            <select value={category}>
              <option>1</option>
            </select>
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
        <button
          onClick={() => setShowDeleteConfirmation(true)}
          className="text-red-500"
          type="button"
        >
          <IoMdClose size={25} />
        </button>
        {showDeleteConfirmation && (
          <div className="block bg-white p-4 rounded-md">
            <h1 className="text-xl">Delete Barber?</h1>
            <div className="flex justify-between">
              <button
                className="bg-red-500 p-1 rounded-md"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button onClick={() => setShowDeleteConfirmation(false)} className="bg-blue-500 p-1 rounded-md">No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
