import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();
const BASE_URl = "http://localhost:5000/hotels";

export default function HotelsProvider({ children }) {
  // hotel base on search state
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("distination");
  const room = JSON.parse(searchParams.get("options"))?.Room;
  // single hotel state
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);
  // hotel base on search Do
  const { isLoading, data: hotels } = useFetch(
    BASE_URl,
    `host_location_like=${destination || ""}&accommodates_gte=${room || 1}`
  );
  //  single hotel Do
  async function getHotel(id) {
    setIsLoadingCurrHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URl}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrHotel(false);
    }
  }
  return (
    <HotelContext.Provider
      value={{ hotels, isLoading, getHotel, currentHotel, isLoadingCurrHotel }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotels() {
  const res = useContext(HotelContext);
  if (res === undefined) return new Error("outSide of the context");
  return res;
}
