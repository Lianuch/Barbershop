import { useState } from "react";
import AddBarber from "../AddBarber/AddBarber";
import { AddFavor } from "../AddFavor/AddFavor";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/");
  };
  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-center text-3xl font-bold mb-2">Admin Panel</h2>
      <div>
        <button onClick={handleExit}>
          <IoMdExit size={25} />
        </button>
      </div>
      <div className="space-y-4 p-6 rounded-lg shadow-lg bg-slate-200">
        <AddBarber />
        <AddFavor />
      </div>
    </div>
  );
};
