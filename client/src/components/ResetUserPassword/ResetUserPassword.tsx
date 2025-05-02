import { ErrorMessage, Field, Formik, Form, FieldProps } from "formik";
import { IEdirUserData } from "../../interfaces/IEdirUserData";
import { PasswordInput } from "../PasswordInputButton/PasswordInput";
import { ResetPasswordSchema} from "../../schemas";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import AuthService from "../../Services/AuthService";
import { useEffect, useState } from "react";
import ClientService from "../../Services/clientService";
import IClient from "../../interfaces/IClient";

export const ResetUserPassword: React.FC<IEdirUserData> = ({
  isEditingOpen,
  setisEditingOpen,
}) => {
  const { t } = useTranslation();

  const [client, setClient] = useState<IClient | null>(null);
  const handleCloseModal = () => setisEditingOpen(false);

  const handleSubmit = async (
    values: { currentPassword: string; password: string },
    { setSubmitting }: any
  ) => {
    try {
      const clientId = localStorage.getItem("clientId");
      const token = localStorage.getItem("token");
  
      if (!clientId || !token) {
        throw new Error("Client ID or Token missing");
      }
  
      await AuthService.requestPasswordChange(clientId, values.currentPassword, values.password);
      await AuthService.passwordChange(token);
  
      toast.success("You successfully updated your data");
      setisEditingOpen(false);
      
    } catch (error: any) {
      console.error(error);
      toast.error("An error occurred while updating your data");
    } finally {
      setSubmitting(false);
    }
  };
  

  useEffect(() => {
    const fetchClient = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const response = await ClientService.fetchClient(token);

        if (response?.data) {
          setClient(response.data);
          localStorage.setItem("clientId", response.data.id);
          // console.log("Client data:", response.data);
        } else {
          setClient(null);
        }
      } catch (e) {
        console.log(e);
        setClient(null);
      }
    };

    fetchClient();
  }, []);

  return (
    <Formik
        initialValues={{ currentPassword: "", password: "" }}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="overflow-auto fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="w-full max-w-[400px] bg-[#cee0f3] p-4 rounded-md shadow-lg">
              <div className="text-black rounded-md">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-100 shadow-lg p-2 rounded-full hover:scale-110 hover:text-red-500"
                    onClick={handleCloseModal}
                  >
                    <IoMdClose size={25} />
                  </button>
                </div>
                <h1 className="text-center text-2xl mt-2">{t("EditData")}</h1>
                <div className="flex flex-col p-4 gap-4 text-black">
                  <Field name="currentPassword">
                    {({ field }: FieldProps) => (
                      <input
                        {...field}
                        type="password"
                        className="text-black rounded-md px-2 py-0.5"
                        placeholder="Current password"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="text-red-500"
                  />
                  <Field name="password">
                    {({ field }: FieldProps) => (
                      <input
                        {...field}
                        type="password"
                        className="text-black rounded-md px-2 py-0.5"
                        placeholder="New password"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-1/3 bg-blue-500 hover:scale-95 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
  
  );
};
