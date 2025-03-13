import { IoMdClose } from "react-icons/io";
import { PasswordInput } from "../../components/PasswordInputButton/PasswordInput";
import { SignupProps } from "../../interfaces/SignupProps";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { registerUser } from "../../slices/authThunks/registerClient";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { ValidationSchema } from "../../schemas";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const SignupPage: React.FC<SignupProps> = ({
  closeModal,
  switchToLogin,
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    await dispatch(registerUser(values));
    navigate("/activation");
  };
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-[400px] my-auto mx-auto ">
          <div className=" bg-black border text-white p-6 rounded-lg shadow-lg shadow-black">
            <div className="flex justify-end">
              <IoMdClose
                onClick={closeModal}
                size={20}
                className="hover:text-red-500 cursor-pointer"
              />
            </div>

            <div className="m-2">
              <div className="text-center text-semibold text-2xl mb-4">
                {t("signup")}
              </div>

              <div className="flex flex-col space-y-4">
                {/* Name */}
                <Field
                  text="text"
                  name="name"
                  className="text-black rounded-md px-2 py-0.5"
                  placeholder="Name"
                />
                  <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 "
                />
                {/* Email */}

                <Field
                  type="text"
                  name="email"
                  className="text-black rounded-md px-2 py-0.5"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 "
                />

                <Field name="password">
                  {({ field }: FieldProps) => <PasswordInput {...field} />}
                </Field>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 "
                />

                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className={`rounded-md bg-white text-lg text-black ${
                    loading || isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-blue-700 hover:scale-95"
                  }`}
                >
                  {t("createAccount")}
                </button>
                <div className="text-center text-xl hover:scale-95 hover:text-blue-500">
                  <button type="button" onClick={switchToLogin}>
                    {t("login")}
                  </button>
                </div>
                {/* {error && (
                  <div className="text-red-500 text-center">{error}</div>
                )} */}
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
