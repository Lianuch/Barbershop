import { useEffect, useState } from "react";
import { Exit } from "../Exit/Exit";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const [date, setDate] = useState(new Date());
  useEffect(()=>{
    const interval = setInterval(() => {
      setDate(new Date());
    }, 10000);
    return () => clearInterval(interval);
  },[])

 const navigate =  useNavigate(); 
  return (
    <div className=" text-black flex justify-center ">
      <div className="max-w-[1200px] w-full   rounded-lg p-6">
        <div>
          <h1 className="text-3xl mb-4">Welcome</h1>
          <p className="text-gray-700 text-sm">
            {date.toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <hr />

        <div className="mt-2 mb-2 w-full rounded-md h-10 bg-[linear-gradient(90deg,rgba(2,0,36,1)_0%,rgba(174,209,238,1)_0%,rgba(193,148,233,1)_58%)]"></div>

        <hr />

        <div className="flex flex-col gap-6">
          {/* Profile Section */}

          <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow">
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">Andrew</h2>
              <p className="text-gray-500 text-sm">email@gmail.com</p>
            </div>
            <div>
              <button className="w-[80px] bg-blue-500 hover:scale-95 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>

            </div>
          </div>

          {/* Information Boxes */}
          <h1 className="text-3xl text-center">Your visits</h1>
          <div className="flex flex-col">
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <p>
                JavaScript arrays are resizable and can contain a mix of
                different data types.
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <p>
                When those characteristics are undesirable, use typed arrays
                instead.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4" onClick={()=>navigate("/")}>
          <Exit setIsExitVisible={() => {}} />
        </div>
      </div>
    </div>
  );
};
