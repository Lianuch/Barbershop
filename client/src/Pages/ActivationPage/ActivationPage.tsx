import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { checkAuth } from "../../slices/authThunks/checkAuth";

export const ActivationPage: React.FC = () => {

  const navigate = useNavigate();
  const client = useAppSelector((state) => state.auth.client);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if(client?.isActivated){
      navigate("/profile");
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
