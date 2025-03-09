import { IoMdExit } from "react-icons/io"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { logoutClient } from "../../slices/authThunks/logoutClient";
import { ExitProps } from "../../interfaces/ExitProps";

export const Exit:React.FC<ExitProps> = ({setIsExitVisible}) => {

    const dispatch = useAppDispatch();
    const handleLogout=()=>{
        dispatch(logoutClient())
        setIsExitVisible(false)
    }
    return (
    <div >
        <IoMdExit onClick={handleLogout} size={20} className="cursor-pointer" />
    </div>
  )
}
