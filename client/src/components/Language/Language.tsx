import { useAppDispatch } from "../../hooks/useAppDispatch";
import { changeLanguage } from "../../slices/languageSlice";
import { useLanguage } from "../../hooks/useLanguage";

export const Language = () => {
  useLanguage()
  const dispatch = useAppDispatch();
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeLanguage(e.target.value))
  };

  return (
    <div>
      <select onChange={handleLanguageChange} className="text-white bg-black">
        <option value="ua">UA</option>
        <option value="en">ENG</option>
      </select>
    </div>
  );
};
