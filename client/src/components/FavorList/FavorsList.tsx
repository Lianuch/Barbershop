import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Favors } from "../Favors/Favors";
import { fetchFavors } from "../../slices/favorsSlice";
import { useTranslation } from "react-i18next";

export const FavorsList = () => {
  const dispatch = useAppDispatch();
  const { favors, loading, error } = useAppSelector((state) => state.favors);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    dispatch(fetchFavors(i18n.language));
  }, [dispatch, i18n.language]);

  return (
    <div className="bg-black p-4">
      <h1 className="text-5xl text-center mb-8 text-white">{t("favors")}</h1>
      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}   {favors.length === 0 && (
        <p className="text-center text-white">No favors found</p>
      )} </p>}
    
      {/* <div className="hidden sm:flex flex-row justify-center text-white text-lg">
        <div className="flex jusfitify-between gap-4">
          <button className="text-2xl hover:scale-90 ">Barber</button>
          <button className="text-2xl hover:scale-90 ">Top barber</button>
          <button className="text-2xl hover:scale-90 ">Prime barber</button>
        </div>
      </div> */}
      <div className="sm:hidden mb-4 max-w-6xl mx-auto flex flex-row justify-center">
        <select className="p-1 rounded-md">
          <option className="text-black" value="barber">
            Barber
          </option>
          <option className="text-black" value="topBarber">
            Top barber
          </option>
          <option className="text-black" value="topBarber">
            Prime barber
          </option>
        </select>
      </div>
      <div className="flex justify-center items-center ">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
          {favors.map((favor) => (
            <Favors key={favor._id} favor={favor} />
          ))}
        </div>
      </div>
    </div>
  );
};
