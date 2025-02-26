import { PasswordInput } from "../../components/PasswordInputButton/PasswordInput";
import { IoMdClose } from "react-icons/io";
import { basicSchema } from "../../schemas";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { LoginProps } from "../../interfaces/LoginProps";



export const LoginPage: React.FC<LoginProps> = ({ closeModal, switchToSignup }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: basicSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  const { t } = useTranslation()

  return (
    <div className="max-w-[400px] my-auto mx-auto ">
      <div className=" bg-black border  text-white  p-6 rounded-lg shadow-lg shadow-black ">
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
              <button className="text-blue-500 text-xl hover:scale-95" onClick={switchToSignup}>{t("signup")}</button>
          </div>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-black rounded-md px-2 py-0.5 ${
                errors.email && touched.email ? "border border-red-500" : ""
              }`}
              placeholder="Email"
            />

            {errors.email && touched.email && (
              <div className="text-red-500">{errors.email}</div>
            )}

            <PasswordInput
              name={"password"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && (
              <div className="text-red-500  ">{errors.password}</div>
            )}

            <button type="submit" disabled={!values.email || !values.password} className={`rounded-md bg-white text-black text-xl  ${!values.email || !values.password ? "opacity-50 cursor-not-allowed" : "hover:text-blue-700 hover:scale-95"}`}>
              {t("login")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
