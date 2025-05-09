import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect } from "react";

export const ActivationPage: React.FC = () => {

  const navigate = useNavigate();
  const client = useAppSelector((state) => state.auth.client);

  useEffect(() => {
    if(client?.isActivated){
      navigate("/")
    }
  },[client, navigate]);
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        background:
          "linear-gradient(254deg, rgba(2,0,36,1) 0%, rgba(174,209,238,1) 0%, rgba(205,230,202,1) 68%)",
      }}
    >
      <h1 className="text-4xl text-slate-950">Confirm Your Gmail Account</h1>
    </div>
  );
};
