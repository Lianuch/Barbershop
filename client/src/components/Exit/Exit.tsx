import { IoMdExit } from "react-icons/io"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { logoutClient } from "../../slices/authThunks/logoutClient";

export const Exit = () => {

    const dispatch = useAppDispatch();

    return (
    <div >
        <IoMdExit onClick={()=> dispatch(logoutClient())} size={20} className="cursor-pointer" />

    </div>
  )
}
