import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();
  return (
   
<div className="w-full p-4 py-4">
  <div className="mx-auto ps-4 max-w-4xl">
    <div className="flex flex-col lg:flex-row items-center justify-between h-auto lg:h-80 space-y-4 lg:space-y-0 lg:space-x-6">
      <div className="flex w-full justify-center lg:justify-start">
      <h1 className="text-5xl text-center">{t("aboutTitle")}</h1>
      </div>
      <div>
        <p className="text-xl max-w-xl lg:max-w-2xl text-justify ">
        {t("aboutDescription")}
        </p>
      </div>
    </div>
  </div>
</div>


  
  );
};
