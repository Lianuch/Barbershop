import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { AdminBarberList } from "../AdminBarberList/AdminBarberList";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addBarber } from "../../slices/adminSlice";
import { useAppSelector } from "../../hooks/useAppSelector";

const AddBarberSchema = Yup.object().shape({
  image: Yup.string().url("Invalid URL").required("Image is required"),
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  coef: Yup.number().min(0.1).required("Coefficient is required"),
});


const AddBarber = () => {
  const dispatch = useAppDispatch();
const { list, loading } = useAppSelector((state) => state.barbers);
 const categories = list.map((barber)=>barber.barberCategory?.categoryName)
  const handleCreateSubmit = async (values: any) => {
    try {
      await dispatch(addBarber(values));
      toast.success("Barber added successfully!");
    } catch (error) {
      toast.error("Failed to add barber. Please try again.");
    }
  };

  return (
    <div className="w-1/2 mx-auto mt-8 ">
      <h2 className="text-center text-3xl font-bold">Admin Panel</h2>

      <Formik
        initialValues={{
          image: "",
          name: "",
          surname: "",
          category: "",
          coef: 1.0,
        }}
        validationSchema={AddBarberSchema}
        onSubmit={handleCreateSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 p-6 rounded-lg shadow-lg bg-gray-100">
            <h2 className="text-center text-xl font-bold">Add New Barber</h2>

            <div>
              <label className="block font-medium text-sm">Image URL</label>
              <Field
                name="image"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block font-medium text-sm">Name</label>
              <Field
                name="name"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block font-medium text-sm">Surname</label>
              <Field
                name="surname"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="surname"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium text-sm">Category</label>
              <Field
                as="select"
                name="category"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                   {categories.map((category, id) => (
                  <option key={id} value={category} >
                    {category}
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
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              {loading ? "Adding..." : "Add Barber"}
            </button>
          </Form>
        )}
      </Formik>
      <AdminBarberList />
    </div>
  );
};

export default AddBarber;
