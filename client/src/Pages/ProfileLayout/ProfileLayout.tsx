import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export const ProfileLayout = () => {
  return (
    <div className="bg-[linear-gradient(254deg,_rgba(2,0,36,1)_0%,_rgba(174,209,238,1)_0%,_rgba(199,211,231,1)_68%)]  min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto mt-8 flex-grow p-2">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
