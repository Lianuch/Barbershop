import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { SignupPage } from "../../Pages/SignupPage/SignupPage";
import { LoginPage } from "../../Pages/LoginPage/LoginPage";

export const UserProfile = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const toggleProfile = (): void => {
    setIsOpen(!isOpen);
    if(!isOpen) setIsLogin(true);
  };
  const CloseModal = ():void => {
    setIsOpen(false);
    setTimeout(() => setIsLogin(true),300)
  };

  const switchToSignup = ():void => {
    setIsLogin(false);
  }
  const switchToLogin = ():void => {
    setIsLogin(true);
  }
  

  //disable scrolling
  useEffect(()=>{
    if(isOpen){
      document.body.style.overflow = 'hidden';
    }
    else{
      document.body.style.overflow = '';

    }

    return()=>{
      document.body.style.overflow = '';
    }

  },[isOpen])

  return (
    <div className="relative">
      <FaRegUser onClick={toggleProfile} size={18} className="cursor-pointer" />

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className=" top-12 right-0 p-6 rounded-lg ">
            {isLogin ? (
            <LoginPage closeModal={CloseModal} switchToSignup={switchToSignup} />) : <SignupPage closeModal={CloseModal} switchToLogin={switchToLogin}  />}
          </div>
        </div>
      )}
    </div>
  );
};
