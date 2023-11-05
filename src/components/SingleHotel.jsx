import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderIcon } from "react-hot-toast";
import TabComponent from "./commonComponent/TabComponent";
import { useHotels } from "../Context/HotelsProvider";
import { BackwardIcon } from "@heroicons/react/24/solid";

export default function SingleHotel() {
  const { id } = useParams();
  const {
    getHotel,
    currentHotel: singleData,
    isLoadingCurrHotel,
  } = useHotels();

  // get hotel data by id
  useEffect(() => {
    getHotel(id);
  }, [id]);
  const navigate = useNavigate();
  if (isLoadingCurrHotel || !singleData)
    return (
      <div className="w-2/5 flex justify-center px-2 items-center">
        loading <LoaderIcon />
      </div>
    );
  return (
    <div
      style={{ height: "78vh" }}
      className="w-2/5 p-2 flex flex-col  rounded-lg relative"
    >
      <button
        onClick={() => navigate(-1)}
        className="m-2 absolute flex justify-evenly bg-primary-700 w-28 text-white rounded-lg px-2 py-1"
      >
        <BackwardIcon className="w-5 h-5 text-white" />
        <span className="px-1">Back</span>
      </button>

      <img
        className="h-52 w-full rounded-t-lg"
        src={singleData.picture_url?.url}
        alt="picture"
      />
      <div className="flex flex-col w-full">
        <TabComponent singleData={singleData} />
      </div>
    </div>
  );
}
