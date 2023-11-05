import React, { useState } from "react";
import useFetch from "../Hooks/useFetch";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router-dom";

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
      <div className="locationList grid grid-cols-4 gap-4 px-3">
        {hotels?.map((item) => {
          return <LocationItem item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
}

function LocationItem({ item }) {
  return (
    <Link
      className={`locationItem border bg-white rounded-xl overflow-hidden hover:shadow hover:outline-offset-0 hover:outline hover:shadow-primary-600 hover:outline-2 hover:outline-primary-600`}
      to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
    >
      <div className="flex flex-col">
        <img
          className="w-full h-60"
          src={item.picture_url.url}
          alt={item.name}
        />
        <div className="locationItemDesc flex flex-col p-2">
          <span className="font-medium">{item.smart_location}</span>
          <span className="text-gray-500">{item.name}</span>
          <span className="flex">
            $&nbsp;{item.price}&nbsp;
            <span className="text-gray-500">night</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
