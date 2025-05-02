import { IoMdExit } from "react-icons/io";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logoutClient } from "../../slices/authThunks/logoutClient";
import { ExitProps } from "../../interfaces/ExitProps";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Exit: React.FC<ExitProps> = ({ setIsExitVisible }) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
 
    dispatch(logoutClient());
    setIsExitVisible(false);
    setTimeout(() => {
      toast.success("You successfully logged out", {
        position: "top-right", 
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: false,
        theme: "dark", 
      });
    }, 1000);
  };
  return (
    <div>
      <IoMdExit
        onClick={handleLogout}
        size={30}
        className="cursor-pointer hover:scale-110 hover:text-blue-500"
      />
    </div>
  );
};
