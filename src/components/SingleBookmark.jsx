import React, { useEffect } from "react";
import { usebookmark } from "../Context/BookmarkListProvider";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderIcon } from "react-hot-toast";
import { BackwardIcon } from "@heroicons/react/24/solid";
import ReactCountryFlag from "react-country-flag";

export default function SingleBookmark() {
  const { getBookmark, currentBookmark, isloadingBookmark } = usebookmark();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isloadingBookmark || !currentBookmark)
    return (
      <div className="w-1/3 flex justify-center font-bold px-4 mt-5 rounded-lg">
        loading <LoaderIcon />
      </div>
    );
  return (
    <div className="w-1/3 mt-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold px-3">Bookmark Item</h1>
        <button
          onClick={() => navigate(-1)}
          className="m-2 flex justify-evenly bg-primary-700 w-28 text-white rounded-lg px-2 py-1"
        >
          <BackwardIcon className="w-5 h-5 text-white" />
          <span className="px-1">Back</span>
        </button>
      </div>

      <div className="bg-white border flex flex-col font-bold px-4 py-3 rounded-lg">
        <div>
          <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
          <strong className="pl-2">{currentBookmark.cityName}</strong>&minus;
          <span className="">{currentBookmark.countryCode}</span>
        </div>
        <div className="py-1">{currentBookmark.host_location}</div>
      </div>
    </div>
  );
}
