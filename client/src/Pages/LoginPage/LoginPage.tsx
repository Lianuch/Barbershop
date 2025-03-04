import { PasswordInput } from "../../components/PasswordInputButton/PasswordInput";
import { IoMdClose } from "react-icons/io";

import { useTranslation } from "react-i18next";
import { LoginProps } from "../../interfaces/LoginProps";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { loginClient } from "../../slices/authThunks/loginClient";



export const LoginPage: React.FC<LoginProps> = ({ closeModal, switchToSignup }) => {

  const { t } = useTranslation()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useAppDispatch();
  const {loading, error, isAuth} = useAppSelector((state) => state.auth)

    const handleLogin = (e:React.FormEvent)=>{
      e.preventDefault();
      setEmailError("");
      setPasswordError("");

      if (!email.trim()) {
        setEmailError(t("Email required"));
        return;
      }
      if (!password.trim()) {
        setPasswordError(t("Password required"));
        return;
      }
      if (password.length < 6) {
        setPasswordError(t("Password must be at least 6 characters"));
        return;
      }
      dispatch(loginClient({email, password}))
    }

  return (
    <form onSubmit={handleLogin} className="max-w-[400px] my-auto mx-auto ">
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
            {/* email */}
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value); 
              }}
              className={`text-black rounded-md px-2 py-0.5 ${emailError ? "border border-red-500" : ""
              }`}
              placeholder="Email"
            />

          {emailError && <div className="text-red-500">{emailError}</div>}

          {/* Password */}
            <PasswordInput
              name={"password"}
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
            />
          {passwordError && <div className="text-red-500">{passwordError}</div>}


            <button   type="submit" disabled={loading} className={`rounded-md bg-white text-black text-xl ${loading ? "opacity-50 cursor-not-allowed" : "hover:text-blue-700 hover:scale-95"}`}>
            {loading ? t("loading") : t("login")}
            </button>
            {error && <div className="text-red-500 text-center">{error}</div>}
          </div>
        </div>
      </div>
    </form>
  );
};
