import { Link } from "react-router-dom";
import { LoaderIcon } from "react-hot-toast";
import { useHotels } from "../Context/HotelsProvider";

export default function Hotels() {
  const { hotels, isLoading, currentHotel } = useHotels();

  if (isLoading)
    return (
      <div className="loading w-2/5">
        loading
        <LoaderIcon />
      </div>
    );
  return (
    <div
      className="w-2/5 p-1 bg-slate-200 rounded-xl"
      style={{ height: "78vh" }}
    >
      <h1 className="font-bold text-lg px-4 py-1 items-center ">
        Search Results : ( {hotels.length} )
      </h1>
      <div className="flex flex-col gap-3 px-2 max-h-[calc(100vh_-_200px)] overflow-y-scroll">
        {hotels?.map((item) => {
          return (
            <Link
              className="locationItem flex items-center "
              key={item.id}
              to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`flex items-center w-full p-2 border bg-white rounded-xl ${
                  item.id == currentHotel?.id
                    ? "border border-primary-700 shadow shadow-purple-500 bg-purple-100"
                    : null
                }`}
              >
                <img
                  className="h-24 w-24 rounded-lg"
                  src={item.picture_url.url}
                  alt={item.name}
                />
                <div className="locationItemDesc flex flex-col p-2">
                  <span className="font-medium text-lg">
                    {item.smart_location}
                  </span>
                  <span className="text-gray-500">{item.name}</span>
                  <span className="flex">
                    <span className="font-bold">€ {item.price}&nbsp;</span>
                    <span className="text-gray-500">night</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
