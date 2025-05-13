import { useEffect, useState } from "react";
import { Exit } from "../Exit/Exit";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import IClient from "../../interfaces/IClient";
import ClientService from "../../Services/clientService";
import { useTranslation } from "react-i18next";
import { Visit } from "../Visit/Visit";
import { useAppSelector } from "../../hooks/useAppSelector";
// import { EditUserData } from "../EditUserData/EditUserData";

export const UserProfile: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [client, setClient] = useState<IClient | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { visits } = useAppSelector((state) => state.visits);

  useEffect(() => {
    const fetchClient = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await ClientService.fetchClient(token);

        if (response?.data) {
          setClient(response.data);
        } else {
          setClient(null);
        }
      } catch (e) {
        console.log(e);
        setClient(null);
      }
    };

    fetchClient();
    const interval = setInterval(() => {
      setDate(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, [navigate]);

  const cardAnimation = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.4, duration: 0.55 },
    },
  };
  const textAnimation = {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.47 },
    }),
  };
  return (
    <motion.div
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true }}
      variants={cardAnimation}
      className="text-black flex justify-center "
    >
      <div className="max-w-[1000px] w-full  bg-slate-200 rounded-lg p-6">
        <div>
          <motion.h1
            variants={textAnimation}
            custom={1}
            className="text-3xl mb-4"
          >
            {t("welcome")}
          </motion.h1>
          <motion.p
            variants={textAnimation}
            custom={2}
            className="text-gray-700 text-sm"
          >
            {date.toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </motion.p>
        </div>
        <hr />

        <motion.div
          variants={textAnimation}
          custom={3}
          className="mt-2 mb-2 w-full rounded-md h-10 bg-gradient-to-br from-[#4f4654] via-[#625867] to-[#625867]"
        ></motion.div>

        <hr />

        <div className="flex flex-col gap-6">

          <motion.div
            variants={textAnimation}
            custom={4}
            className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow"
          >
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{client?.name}</h2>

              <p className="text-gray-500 text-sm">{client?.email}</p>
            </div>
            <div>
              <div
                className="flex justify-end mt-4"
                onClick={() => navigate("/")}
              >
                <Exit setIsExitVisible={() => {}} />
              </div>
            </div>
          </motion.div>

          <motion.h1
            variants={textAnimation}
            custom={5}
            className="text-3xl text-center"
          >
            {visits.length === 0 ? t("areVisits") : t("visits")}
          </motion.h1>
          <motion.div
            variants={textAnimation}
            custom={5}
            className="flex flex-col gap-4 items-center justify-center"
          >
            <div className="p-4 w-full">
              <Visit />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
