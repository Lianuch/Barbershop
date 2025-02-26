import { IoMdClose } from "react-icons/io";
import { useFormik } from "formik";
import { PasswordInput } from "../../components/PasswordInputButton/PasswordInput";
import { basicSchema } from "../../schemas";
import { SignupProps } from "../../interfaces/SignupProps";


export const SignupPage: React.FC<SignupProps> = ({ closeModal, switchToLogin }) => {
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

  console.log(errors);

  return (
    <form onSubmit={handleSubmit} className="max-w-[400px] my-auto mx-auto ">
      <div className=" bg-black border text-white p-6 rounded-lg shadow-lg shadow-black">
        <div className="flex justify-end">
          <IoMdClose onClick={closeModal} size={20} className="hover:text-red-500 cursor-pointer" />
        </div>

        <div className="m-2">
          <div className="text-center text-semibold text-2xl mb-4">Sign up</div>

          <div className="flex flex-col space-y-4">
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className={`text-black rounded-md px-2 py-0.5 ${
                errors.email && touched.email ? "border border-red-500" : ""
              }`}
              placeholder="Email"
            />

            {errors.email && touched.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
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

            <button
              type="submit"
              disabled={!values.email || !values.password}
              className={`rounded-md bg-white text-lg text-black ${!values.email || !values.password ? "opacity-50 cursor-not-allowed": "hover:text-blue-700 hover:scale-95"}` }
            >
              Create an account
            </button>
            <div className="text-center text-xl hover:scale-95 hover:text-blue-500">
              <button onClick={switchToLogin} >Login</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
