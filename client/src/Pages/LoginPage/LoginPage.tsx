import { PasswordInput } from "../../components/PasswordInputButton/PasswordInput";
import { IoMdClose } from "react-icons/io";

import { useTranslation } from "react-i18next";
import { LoginProps } from "../../interfaces/LoginProps";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { loginClient } from "../../slices/authThunks/loginClient";

import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import { ValidationSchema } from "../../schemas";

export const LoginPage: React.FC<LoginProps> = ({
  closeModal,
  switchToSignup,
}) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { loading, error, isAuth } = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: { email: string, password: string }) => {
    await dispatch(loginClient(values));
  }
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-[400px] my-auto mx-auto ">
          <div className=" bg-black border text-white p-6 rounded-lg shadow-lg shadow-black ">
            <div className="flex justify-end">
              <IoMdClose
                onClick={closeModal}
                size={20}
                className="hover:text-red-500 cursor-pointer"
              />
            </div>

            <div className="m-2">
              <div className="text-center text-semibold text-2xl mb-4">
                {t("loginTitle")}
              </div>
              <div className="text-center text-semibold text-lg mb-4">
                {t("dontHaveAccount")}{" "}
                <button
                  type="button"
                  className="text-blue-500 text-xl hover:scale-95"
                  onClick={() => {
                    console.log("Switch to Signup clicked");
                    switchToSignup();
                  }}
                >
                  {t("signup")}
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                {/* email */}
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

                {/* Password */}
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
                  className={`rounded-md bg-white text-black text-xl ${
                    loading || isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-blue-700 hover:scale-95"
                  }`}
                >
                  {loading ? t("loading") : t("login")}
                </button>
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
