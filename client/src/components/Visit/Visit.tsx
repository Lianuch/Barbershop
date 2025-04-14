import { useEffect, useState } from "react";
import IVisit from "../../interfaces/IVisit";
import VisitService from "../../Services/visitService";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchFavors } from "../../slices/favorsSlice";
import { useLanguage } from "../../hooks/useLanguage";
import moment from "moment";

export const Visit = () => {
  const { i18n } = useTranslation();
  const { currentLanguage } = useLanguage();

  const [visits, setVisits] = useState<IVisit[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    VisitService.fetchVisits().then((res) => {
      console.log("Visits:", res.data); // <- Check this
      setVisits(res.data);
    });
    dispatch(fetchFavors(i18n.language));
  }, [dispatch, i18n.language]);

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
            <div className=" mt-4">
              <div className="h-0.5 w-full bg-gray-300 my-2"></div>
              <p className="text-md font-medium">{favorTranslation?.name}</p>
              <p className="text-sm text-gray-500">{visit.favor.time}</p>
              <p className="text-lg font-bold">{visit.favor.price} ₴</p>
            </div>
            
            <div className="flex justify-end">
              <p className="text-sm text-gray-600">{formattedDate}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
