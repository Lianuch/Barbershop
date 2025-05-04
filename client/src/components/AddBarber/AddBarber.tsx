import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { AdminBarberList } from "../AdminBarberList/AdminBarberList";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const AddBarberSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  specialization: Yup.string().required("Specialization is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  experience: Yup.number()
    .required("Experience is required")
    .positive("Experience must be a positive number")
    .integer("Experience must be an integer"),
});

const AddBarber = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // Call the action to add the barber (you will need to implement this action)
      //   await dispatch(addBarber(values));
      toast.success("Barber added successfully!");
    } catch (error) {
      toast.error("Failed to add barber. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-1/2 mx-auto mt-8 ">
      <h2 className="text-center text-3xl font-bold">Menu</h2>

      <Formik
        initialValues={{
          image: "",
          name: "",
          surname: "",
          category: "",
          coef: 1.0,
        }}
        validationSchema={AddBarberSchema}
        onSubmit={handleSubmit}
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
                <option value="barber">Barber</option>
                <option value="top_barber">Top Barber</option>
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
