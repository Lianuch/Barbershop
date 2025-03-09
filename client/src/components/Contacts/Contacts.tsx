import { useTranslation } from "react-i18next";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";

export const Contacts = () => {
    const { t } = useTranslation();
  
  return (
    <div className=" bg-black text-white p-4 " id="contacts">
      <h1 className="text-5xl text-center mb-8">{t("contacts")}</h1>
      <div className="mt-4 grid sm:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col items-center">
          <LuMapPin style={{ fontSize: "40px" }} />
          <p className="mt-4"> {t("streetAdress")}</p>
        </div>
        <div className="flex flex-col items-center">
          <IoMdTime style={{ fontSize: "40px" }} />
          <p className="mt-4">10:00 - 21:00</p>
        </div>
        <div className="flex flex-col items-center">
          <FaPhoneAlt style={{ fontSize: "40px" }} />
          <p className="mt-4">{t("phone")}</p>
        </div>
      </div>

      <iframe
        className="opacity-70 hover:opacity-100"
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d4971.741468944678!2d24.021033!3d49.842895!3m2!1i1024!2i768!4f13.1!5e1!3m2!1suk!2sua!4v1736688387951!5m2!1suk!2sua"
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
