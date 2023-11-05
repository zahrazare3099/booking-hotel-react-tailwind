import React from "react";
import { usebookmark } from "../Context/BookmarkListProvider";
import { LoaderIcon } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import {
  BackwardIcon,
  NoSymbolIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

export default function Bookmark() {
  const { bookmarks, isloadingBookmark, currentBookmark, deleteBookmark } =
    usebookmark();
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isloadingBookmark)
    return (
      <div className="w-1/3">
        loading <LoaderIcon />
      </div>
    );
  if (bookmarks?.lenght < 1)
    return (
      <div className="w-1/3 flex justify-center mt-5 text-red-500 font-bold">
        You don't have any Bookmark now
        <NoSymbolIcon className="w-7 h-7  px-1" />
      </div>
    );
  return (
    <div className="p-2 flex flex-col gap-2 w-1/3">
      <div className="flex justify-between items-center">
        <h1 className="font-bold px-3">Bookmarks list</h1>
        <button
          onClick={() => navigate(-1)}
          className="m-2 flex justify-evenly bg-primary-700 w-28 text-white rounded-lg px-2 py-1"
        >
          <BackwardIcon className="w-5 h-5 text-white" />
          <span className="px-1">Back</span>
        </button>
      </div>

      {bookmarks?.map((item) => {
        return (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`bg-white flex justify-between items-center border p-2 rounded-lg ${
                item.id === currentBookmark?.id
                  ? "border border-primary-700 shadow shadow-purple-500 bg-purple-100"
                  : null
              }`}
            >
              <div>
                <ReactCountryFlag svg countryCode={item.countryCode} />
                <strong className="pl-2">{item.cityName}</strong>&minus;
                <span className="">{item.countryCode}</span>
              </div>
              <TrashIcon
                onClick={(e) => handleDelete(e, item.id)}
                className="w-7 h-7 px-1 text-red-500"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
