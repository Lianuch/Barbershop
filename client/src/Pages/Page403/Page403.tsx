import { useNavigate } from "react-router-dom";
import err403 from "../../assets/images/403err.png";

export const Page403 = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundImage: `url(${err403})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
      className="h-screen flex justify-center items-center"
    >
      <button
        onClick={() => navigate("/")}
        className="absolute text-rose-700 border text-4xl border-blue-700 rounded-lg hover:scale-95 px-4 py-2 bottom-10 md:bottom-20 lg:bottom-16"
        type="button"
      >
        Go Home
      </button>
    </div>
  );
};
