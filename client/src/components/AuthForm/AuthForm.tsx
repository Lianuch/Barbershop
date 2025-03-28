import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { SignupPage } from "../../Pages/SignupPage/SignupPage";
import { LoginPage } from "../../Pages/LoginPage/LoginPage";
import { useAppSelector } from "../../hooks/useAppSelector";
import { UserProfile } from "../UserProfile/UserProfile";
import { useLocation } from "react-router-dom";

export const AuthForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const location = useLocation();

  const toggleProfile = (): void => {
    if(location.pathname !== "/profile"){
      
      setIsOpen(!isOpen);
      if (!isOpen) setIsLogin(true);
    }
  };
  const CloseModal = (): void => {
    setIsOpen(false);
    setTimeout(() => setIsLogin(true), 300);
  };

  const switchToSignup = (): void => {
    setIsLogin(false);
  };
  const switchToLogin = (): void => {
    setIsLogin(true);
  };

  const { isAuth } = useAppSelector((state) => state.auth);
  
  //disable scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <FaRegUser onClick={toggleProfile} size={18} className="cursor-pointer" />

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="top-12 right-0 p-6 rounded-lg">
          
            {isAuth ? (
              <UserProfile />
            ) : isLogin ? (
              <LoginPage
                closeModal={CloseModal}
                switchToSignup={switchToSignup}
              />
            ) : (
              <SignupPage
                closeModal={CloseModal}
                switchToLogin={switchToLogin}
              />
            )}
          </div>
        </div>
      )}
      

    </div>


  );
};
