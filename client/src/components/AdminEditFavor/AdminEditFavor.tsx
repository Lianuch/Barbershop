import { IoMdClose } from "react-icons/io";
// import { MdEdit } from "react-icons/md";
import { useLanguage } from "../../hooks/useLanguage";
import { FavorProps } from "../../interfaces/FavorProps";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { removeFavor } from "../../slices/favorsSlice";
import { toast } from "react-toastify";
import { useState } from "react";

export const AdminEditFavors: React.FC<FavorProps> = ({ favor }) => {
  const { currentLanguage } = useLanguage();
  const translations = favor.translations?.find(
    (f) => f.language === currentLanguage
  );
  const dispatch = useAppDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);


  const handleDelete = () => {
    dispatch(removeFavor(favor._id));
    setShowDeleteConfirmation(false);

    setTimeout(() => {
      toast.success("Favor deleted successfully!", {
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
      <div className="flex flex-col flex-1 gap-2">
        <h3 className="text-xl font-bold">{translations?.name}</h3>
        <span className="text-sm text-gray-700">{favor.price}</span>
      </div>

      <div className="flex gap-2">
        {/* <button type="button">
          <MdEdit size={23} />
        </button> */}
        <button
          onClick={() => setShowDeleteConfirmation(true)}
          className="text-red-500"
          type="button"
        >
          <IoMdClose size={25} />
        </button>
        {showDeleteConfirmation && <div className="block bg-white p-4 rounded-md">
            <h1 className="text-xl">Delete Favor?</h1>
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
          </div>}
      </div>
    </div>
  );
};
