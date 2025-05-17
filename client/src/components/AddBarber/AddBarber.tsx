import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { AdminBarberList } from "../AdminBarberList/AdminBarberList";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addBarber } from "../../slices/barbersSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useState } from "react";
import { IoIosPeople } from "react-icons/io";

const AddBarberSchema = Yup.object().shape({
  image: Yup.string().url("Invalid URL").required("Image is required"),
  nameEn: Yup.string().required("Name is required"),
  nameUa: Yup.string().required("Name is required"),
  surnameEn: Yup.string().required("Surname is required"),
  surnameUa: Yup.string().required("Surname is required"),
  coef: Yup.number().min(0.1).required("Coefficient is required"),
});

const AddBarber = () => {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.barbers);
  const categories = list.map((barber) => ({
    id: barber.barberCategory?._id,
    name: barber.barberCategory?.categoryName,
  }));
  const handleCreateSubmit = async (values: any) => {
    try {
      const translation = [
        {
          language: "en",
          name: values.nameEn,
          surname: values.surnameEn,
        },
        {
          language: "ua",
          name: values.nameUa,
          surname: values.surnameUa,
        },
      ];
      const payload = {
        image: values.image,
        barberCategory: values.category,
        translation: translation,
        coef: values.coef,
        visits: [],
      };

      dispatch(addBarber(payload));
      toast.success("Barber added successfully!");
    } catch (error) {
      toast.error("Failed to add barber. Please try again.");
    }
  };

  const [showBarberList, setShowBarberList] = useState(false);

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-center text-3xl font-bold mb-2">Admin Panel</h2>

      <Formik
        initialValues={{
          image: "",
          nameEn: "",
          surnameEn: "",
          nameUa: "",
          surnameUa: "",
          category: "",
          coef: 1.0,
        }}
        validationSchema={AddBarberSchema}
        onSubmit={handleCreateSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 p-6 rounded-lg shadow-lg bg-slate-200">
            <h2 className="text-center text-xl font-bold">Add New Barber</h2>
            <div>
              <label className="block font-medium text-sm">Image URL</label>
              <Field
                name="image"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

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

            <div className="flex justify-between gap-2">
              <div className="w-1/2">
                <label className="block font-medium text-sm">
                  Surname (English)
                </label>
                <Field
                  name="surnameEn"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="surnameEn"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-medium text-sm">
                  Surname (Ukrainian)
                </label>
                <Field
                  name="surnameUa"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="surnameUa"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-sm">Category</label>
              <Field
                as="select"
                name="category"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a category</option>
                {categories.map(({ id, name }, index) => (
                  <option key={`${id}-${index}`} value={id}>
                    {name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block font-medium text-sm">Coefficient</label>
              <Field
                name="coef"
                type="number"
                step="0.1"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="coef"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              {loading ? "Adding..." : "Add Barber"}
            </button>

            <button
              type="button"
              onClick={() => setShowBarberList(!showBarberList)}
              className="w-full bg-lime-900 text-white p-2 rounded-md mt-4 hover:bg-lime-950 flex items-center justify-center gap-2"
            >
              {showBarberList ? (
                <>
                  <p>Hide Barber List</p>
                  <IoIosPeople size={25} />
                </>
              ) : (
                <>
                  <p>Show Barber List</p>
                  <IoIosPeople size={25} />
                </>
              )}
            </button>

            {showBarberList && <AdminBarberList />}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBarber;
