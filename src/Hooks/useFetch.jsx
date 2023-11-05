import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetch(url, quary = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchDate() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${quary}`);
        setData(data);
      } catch (err) {
        setData([]);
        toast.error(err?.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDate();
  }, [url, quary]);
  return { data, isLoading };
}
