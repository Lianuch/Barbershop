import { ErrorMessage, Field, FieldProps, Formik, Form } from "formik";
import { IEdirUserData } from "../../interfaces/IEdirUserData";
import { PasswordInput } from "../PasswordInputButton/PasswordInput";
import { ValidationSchema } from "../../schemas";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";

export const EditUserData: React.FC<IEdirUserData> = ({
  isEditingOpen,
  setisEditingOpen,
}) => {
    const { t } = useTranslation();
  
  const handleCloseModal = () => setisEditingOpen(false);
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        toast.success("You successfully updated your data", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
        setisEditingOpen(false);
        setSubmitting(false);
      }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <Form className="w-full max-w-[400px] bg-slate-300 p-4 rounded-md shadow-lg">
          <div className="  text-black rounded-md ">
            <div className="flex justify-end">
              <button className="bg-gray-100 shadow-lg p-2 rounded-full hover:scale-110 hover:text-red-500">
                <IoMdClose onClick={handleCloseModal} size={25} />
              </button>
            </div>
            <h1 className="text-center text-2xl mt-2">{t("EditData")}</h1>
            <div className="flex flex-col p-4 gap-4 text-black">
              <Field
                type="text"
                name="email"
                className="text-black rounded-md px-2 py-0.5"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
              <Field name="password">
                {({ field }: FieldProps) => <PasswordInput {...field} />}
              </Field>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="w-1/3 bg-blue-500 hover:scale-95 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Formik>
  );
};
