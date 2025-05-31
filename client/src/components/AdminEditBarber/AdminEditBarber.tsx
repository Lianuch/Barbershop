import { BarberProps } from "../../interfaces/BarberProps";
import { useLanguage } from "../../hooks/useLanguage";
import { IoMdClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toast } from "react-toastify";
import { editBarber, removeBarber } from "../../slices/barbersSlice";
import { useAppSelector } from "../../hooks/useAppSelector";

export const AdminEditBarber: React.FC<BarberProps> = ({ barber }) => {
  const { currentLanguage } = useLanguage();
  const barberTranslation = barber.translation.find(
    (t) => t.language === currentLanguage
  );
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState("");
  const [coeficient, setCoeficient] = useState(barber.coef);

  const [category, setCategory] = useState(
    barber.barberCategory?.categoryName || ""
  );

  const { list } = useAppSelector((state) => state.barbers);

  const categories = list.map((barber) => ({
    id: barber.barberCategory?._id,
    name: barber.barberCategory?.categoryName,
  }));
  const handleEdit = () => {
    const updatedBarber = {
      ...barber,
      image,
      coef: coeficient,
      translation: barber.translation,
      barberCategory: {
        ...barber.barberCategory,
        categoryName: category || barber.barberCategory?.categoryName,
      },
    };
    dispatch(editBarber({ id: barber._id, barber: updatedBarber }));
    setIsEditing(false);

    setTimeout(() => {
      toast.success("Barber updated successfully!", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
    }, 1000);
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

      <div className="flex flex-col flex-1 gap-2">
        {isEditing ? (
          <>
            <input
              value={image}
              placeholder="Image URL"
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md "
            />

            <input
              name="coeficient"
              type="number"
              min="1.0"
              max="3.0"
              step="0.01"
              value={coeficient}
              onChange={(e) => setCoeficient(parseFloat(e.target.value))}
              className="w-full p-1 border text-black border-gray-300 rounded-md"
            />

            <select
              className="w-full p-2 border text-black border-gray-300 rounded-md"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat, index) => (
                <option value={cat.name} key={cat.id || index}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleEdit}
              className="mt-2 px-2 py-1 bg-green-700 hover:bg-green-800 text-white rounded text-sm w-fit"
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
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-blue-500 p-1 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
