import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AdminEditFavors } from "../AdminEditFavor/AdminEditFavor";
import { fetchFavors } from "../../slices/favorsSlice";
import { useTranslation } from "react-i18next";

export const AdminEditFavorList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { favors } = useAppSelector((state) => state.favors);
    const { i18n } = useTranslation();
  useEffect(() => {
      dispatch(fetchFavors(i18n.language));
  },[dispatch, i18n.language]);
  return (
    <div>
      <ul className="gap-2 px-4">
            {favors.map((favor) => (
                <li key={favor._id}>
                    <AdminEditFavors favor={favor}/>
                </li>
            ))}
      </ul>
    </div>
  );
};
