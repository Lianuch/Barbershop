import { FavorProps } from "../../interfaces/FavorProps";

export const Favors: React.FC<FavorProps> = ({favor}) => {
  return (
  
      <div className="my-4 max-w-[500px] relative text-white p-4 mx-4 rounded-md shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-stone-800 opacity-50 rounded-md pointer-events-none"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-lg font-medium">{favor.name}</p>
            <p className="text-sm text-gray-400">{favor.time}</p>
          </div>
          <p className="text-2xl mx-2">{favor.price}</p>
        </div>
      </div>

  );
};

{

}
