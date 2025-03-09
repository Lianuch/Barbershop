import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export const ProfileLayout = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-8">
        <Outlet />
      </div>
      {/* <Footer/> */}
    </div>
  );
};
