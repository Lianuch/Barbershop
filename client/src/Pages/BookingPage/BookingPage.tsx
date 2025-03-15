import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export const BookingPage = () => {
  return (
    <div className=" min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto mt-8 flex-grow p-2">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
