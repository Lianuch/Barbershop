import { SelectButtonProps } from "../../../interfaces/SelectButtonProps";

export const SelectButton: React.FC<SelectButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white w-full py-2 rounded-lg mt-5 hover:scale-95"
    >
      {text}
    </button>
  );
};
