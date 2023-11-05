import React, { useEffect, useState } from "react";
import useURLLocation from "../Hooks/useURLLocation";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import toast, { LoaderIcon } from "react-hot-toast";
import { usebookmark } from "../Context/BookmarkListProvider";

export default function AddNewBookmark() {
  const [lat, lng] = useURLLocation();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState(null);
  const [isLoadingCountrySelected, setIsLoadingCountrySelected] =
    useState(false);
  const [errorStatuse, setErrorStatuse] = useState(null);
  const { createBookmark } = usebookmark();

  const BASE_GEOCODING_URL =
    "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const inputStyle =
    "w-full flex items-center px-2 relative bg-white rounded-lg overflow-hidden";

  useEffect(() => {
    async function fetchLocationData() {
      setIsLoadingCountrySelected(true);
      setErrorStatuse(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode) {
          throw new Error("this locationt in not valid");
        }
        setCityName(data.city || data.locality || "");
        setCountryName(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        toast.error(error.message);
        setErrorStatuse(error.message);
        setCityName("");
        setCountryName("");
      } finally {
        setIsLoadingCountrySelected(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !countryName) return;
    const newBookmark = {
      cityName,
      country: countryName,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + countryName,
    };
    await createBookmark(newBookmark);
    navigate("/bookmarks");
  };

  if (isLoadingCountrySelected)
    return (
      <div className="w-1/4 p-2 flex items-start justify-evenly">
        Loading <LoaderIcon />
      </div>
    );
  return (
    <div className="w-1/4 p-2">
      <h2 className="font-bold p-2">Add New Bookmark</h2>
      <form
        onSubmit={handleSubmit}
        className="p-3 border rounded-lg bg-slate-100 flex flex-col gap-2"
      >
        <div className="flex flex-col ">
          <label className="px-2 font-medium" htmlFor="cityName ">
            City Name
          </label>
          <input
            // className="rounded-lg py-1 px-2 border outline-none"
            className={` ${inputStyle} ${
              errorStatuse !== null
                ? "py-1 border border-red-400"
                : "py-1 border"
            }`}
            type="text"
            name="cityName"
            id="cityName"
            placeholder="City Name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          {errorStatuse !== null ? (
            <p className="text-red-500 text-xs px-2">{errorStatuse}</p>
          ) : null}
        </div>
        <div className="flex flex-col">
          <label className="px-2 font-medium " htmlFor="country ">
            Country Name
          </label>
          <div
            className={` ${inputStyle} ${
              errorStatuse !== null ? "border border-red-400" : "border"
            }`}
          >
            <input
              className="flex-1 py-1 outline-none"
              type="text"
              name="countryName"
              id="countryName"
              placeholder="Country Name"
              value={countryName}
              onChange={(e) => setCountryName(e.target.value)}
            />
            {errorStatuse !== null ? null : (
              <ReactCountryFlag svg countryCode={countryCode} />
            )}
          </div>
          {errorStatuse !== null ? (
            <p className="text-red-500 text-xs px-2">{errorStatuse}</p>
          ) : null}
        </div>
        <div className="flex p-2 justify-between">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="p-2 flex items-center justify-evenly bg-primary-700 text-white rounded-lg w-24 font-bold"
          >
            <ChevronLeftIcon className="w-5 h-5 font-bold" />
            <span>Back</span>
          </button>
          <button className="p-2 flex items-center justify-center bg-primary-700 text-white rounded-lg w-24 font-bold">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
