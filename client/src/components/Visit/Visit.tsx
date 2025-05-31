import { useEffect } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useLanguage } from "../../hooks/useLanguage";
import moment from "moment";
import { useAppSelector } from "../../hooks/useAppSelector";
import BeatLoader from "react-spinners/BeatLoader";
import { fetchVisits, fetchAllVisits } from "../../slices/visitSlice";

export const Visit = () => {
  const { currentLanguage } = useLanguage();

  const { visits, loading, error } = useAppSelector((state) => state.visits);
  const dispatch = useAppDispatch();
  const { isAuth, client } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth && client?.role === "admin") {
      dispatch(fetchAllVisits());
    } else {
      dispatch(fetchVisits());
    }
  }, [dispatch, isAuth, client]);

  if (loading) {
    return (
      <p>
        <BeatLoader color="#60BDE6" />
      </p>
    );
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {visits.map((visit) => {
        const barberTranslation = visit.barber.translation?.find(
          (t) => t.language === currentLanguage
        );
        const favorTranslation = visit.favor.translations?.find(
          (t) => t.language === currentLanguage
        );
        const formattedDate = moment(visit.date).format("MMMM Do YYYY, HH:mm");

        return (
          <div key={visit._id} className="bg-white p-4 rounded-lg shadow-lg ">
            <div className="flex justify-between">
              <div className="flex items-start gap-4">
                <img
                  src={visit.barber.image}
                  alt="Barber"
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold">
                    {barberTranslation?.name} {barberTranslation?.surname}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {visit.barber.barberCategory?.categoryName}
                  </p>
                </div>
              </div>
            </div>
            <hr className="my-2" />

            <div className="mt-2">
              <p className="text-md font-medium">{favorTranslation?.name}</p>
              <p className="text-sm text-gray-500">{visit.favor.time}</p>
              <p className="text-lg font-bold">{visit.favor.price} ₴</p>
            </div>
            <hr className="my-2" />

            {isAuth && client?.role === "admin" && (
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{visit.client.name}</p>
                  <p className="text-sm text-gray-500">{visit.client.email}</p>
                </div>

                <p className="text-sm text-gray-600 whitespace-nowrap">
                  {formattedDate}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
