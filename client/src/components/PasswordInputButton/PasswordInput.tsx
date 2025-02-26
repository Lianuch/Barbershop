import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PasswordProps } from "../../interfaces/PasswordProps";


export const PasswordInput: React.FC<PasswordProps> = ({ name, onChange, onBlur, value }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center">
      <input
        type={showPassword ? "text" : "password"}
        name={name} 
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className="text-black rounded-md  flex-grow outline-none px-2 py-0.5"
        placeholder="Password"
      />
      <button
        type="button"
        className="px-2 hover:text-yellow-500 text-blue-400"
        onClick={togglePassword}
      >
        {showPassword ? <FaRegEyeSlash size={25} /> : <FaRegEye size={25} />}
      </button>
    </div>
  );
};
