import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import AuthService from "../../Services/AuthService";
import { toast } from "react-toastify";
export const ConfirmPasswordChange = () => {
    const [searchParams] = useSearchParams();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            AuthService.passwordChange(token)
                .then(() => {
                    toast.success("You successfully reset your password");
                })
                .catch((e)=>{
                    console.log(e);
                    toast.error("Failed to confirm password change");
                })
        }
    },[searchParams])

  return (
    <div><BeatLoader color="#60BDE6" /></div>
  )
}
