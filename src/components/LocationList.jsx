import React, { useState } from "react";
import useFetch from "../Hooks/useFetch";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useHotels } from "../Context/HotelsProvider";

export default function LocationList() {
  const { data: hotels, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    ""
  );

  if (isLoading)
    return (
      <div className="loading w-full">
        loading
        <LoaderIcon />
      </div>
    );
  return (
    <div className="NearbyLocationList">
      <h1 className="text-center font-bold py-3">Nearby Locations</h1>
      <div className="locationList grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-16 gap-x-5 px-3">
        {hotels?.map((item) => {
          return <LocationItem item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
}

function LocationItem({ item }) {
  const { currentHotel } = useHotels();
  return (
    <div className="relative">
      <Link
        to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
      >
        <div className="h-64 rounded-xl  overflow-hidden">
          <div className="h-full hover:scale-125 transition duration-700">
            <img
              className="h-full w-full"
              src={item.picture_url.url}
              alt={item.name}
            />
          </div>
        </div>
        <div className="w-full sm:h-24 md:h-24 flex justify-center absolute top-52">
          <div
            className={`border-2 ${
              item.id == currentHotel?.id ? "border-primary-700" : null
            } w-11/12 locationItemDesc bg-neutral-200 flex flex-col p-2  rounded-xl `}
          >
            <span className="font-bold text-sm">{item.smart_location}</span>
            <span className="text-gray-500 text-sm break-words">
              {item.name}
            </span>
            <div className="flex text-sm ">
              $&nbsp;{item.price}&nbsp;
              <span className="text-primary-700 text-xs self-end">
                (per night)
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
