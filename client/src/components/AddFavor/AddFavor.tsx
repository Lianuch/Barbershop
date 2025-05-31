import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";

import { AddFavorSchema } from "../../schemas";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { addFavor } from "../../slices/favorsSlice";
import { FaListUl } from "react-icons/fa";
import { useState } from "react";
import { AdminEditFavorList } from "../AdminEditFavorList/AdminEditFavorList";

export const AddFavor = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.favors);
  const [showFavorList, setShowFavorList] = useState<Boolean>(false);

  const handleCreateSubmit = async (values: any) => {
    try {
      const translations = [
        {
          language: "en",
          name: values.nameEn,
        },
        {
          language: "ua",
          name: values.nameUa,
        },
      ];
      const payload = {
        time: values.time,
        price: values.price,
        translations: translations,
      };
      dispatch(addFavor(payload));
      toast.success("Favor added successfully!"
      );
    } catch (error) {   
      toast.error("Failed to add barber. Please try again.");
      console.log(error);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{ nameEn: "", nameUa: "", time: 0, price: 0 }}
        validationSchema={AddFavorSchema}
        onSubmit={handleCreateSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2 className="text-center text-xl font-bold">Add New Favor</h2>

            <div className="flex justify-between gap-2">
              <div className="w-1/2">
                <label className="block font-medium text-sm">
                  Name (English)
                </label>
                <Field
                  name="nameEn"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="nameEn"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-medium text-sm">
                  Name (Ukrainian)
                </label>
                <Field
                  name="nameUa"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="nameUa"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-sm">Time</label>
              <Field
                name="time"
                type="text"
                step="10.0"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="time"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block font-medium text-sm">Price</label>
              <Field
                name="price"
                type="number"
                min="300.0"
                step="50.0"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full mt-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Add Favor
            </button>
            <button
              onClick={() => setShowFavorList(!showFavorList)}
              type="button"
              className="w-full bg-lime-900 text-white p-2 rounded-md mt-4 hover:bg-lime-950 flex items-center justify-center gap-2"
            >
              {showFavorList ? (
                <>
                  <p>Hide Favor List</p>
                  <FaListUl size={20} />
                </>
              ) : (
                <>
                  <p>Favor List</p>
                  <FaListUl size={20} />
                </>
              )}
            </button>
            {showFavorList && <AdminEditFavorList />}
          </Form>
        )}
      </Formik>
    </div>
  );
};
