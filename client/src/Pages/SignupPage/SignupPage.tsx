import { IoMdClose } from "react-icons/io";
import { PasswordInput } from "../../components/PasswordInputButton/PasswordInput";
import { SignupProps } from "../../interfaces/SignupProps";
import { useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { registerUser } from "../../slices/authThunks/registerClient";


export const SignupPage: React.FC<SignupProps> = ({ closeModal, switchToLogin }) => {

 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useAppDispatch();
 const {loading, error, isAuth} = useAppSelector((state) => state.auth)

 const handleRegister = (e:React.FormEvent)=>{
  e.preventDefault();
     setEmailError("");
        setPasswordError("");
  
        if (!email.trim()) {
          setEmailError("Email required");
          return;
        }
        if (!password.trim()) {
          setPasswordError(("Password required"));
          return;
        }
        dispatch(registerUser({email, password}))
 }

  return (
    <form onSubmit={handleRegister} className="max-w-[400px] my-auto mx-auto ">
      <div className=" bg-black border text-white p-6 rounded-lg shadow-lg shadow-black">
        <div className="flex justify-end">
          <IoMdClose onClick={closeModal} size={20} className="hover:text-red-500 cursor-pointer" />
        </div>

        <div className="m-2">
          <div className="text-center text-semibold text-2xl mb-4">Sign up</div>

          <div className="flex flex-col space-y-4">
            <input
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="text"
              className={`text-black rounded-md px-2 py-0.5 ${
                emailError  ? "border border-red-500" : ""
              }`}
              placeholder="Email"
            />

            {emailError && (
              <div className="text-red-500 text-sm">{emailError}</div>
            )}

            <PasswordInput
              name={"password"}
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
            />
                   {passwordError && <div className="text-red-500">{passwordError}</div>}


            <button
              type="submit"
              disabled={loading}
              className={`rounded-md bg-white text-lg text-black ${loading ? "opacity-50 cursor-not-allowed": "hover:text-blue-700 hover:scale-95"}` }
            >
              Create an account
            </button>
            <div className="text-center text-xl hover:scale-95 hover:text-blue-500">
              <button type="button" onClick={switchToLogin} >Login</button>
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}

          </div>
        </div>
      </div>
    </form>
  );
};
