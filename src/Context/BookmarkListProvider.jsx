import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URl = "http://localhost:5000/bookmarks";

// initial state for reducer
const initialState = {
  bookmarks: [],
  currentBookmark: null,
  isloadingBookmark: false,
};

export default function BookmarkListProvider({ children }) {
  // All bookmarks
  // const [bookmarks, setBookmarks] = useState([]);
  // single bookmark state isLoadingCurrBookmark
  // const [currentBookmark, setCurrentBookmark] = useState(null);
  // const [isloadingBookmark, setIsloadingBookmark] = useState(false);
  // bookmark base on search Do =>> we should fetch directly
  // const { isLoading, data: bookmarks } = useFetch(BASE_URl);

  // declare reducer function
  function bookmarkReducer(state, action) {
    switch (action.type) {
      case "loading":
        return {
          ...state,
          isloadingBookmark: true,
        };
      case "bookmarks/loaded":
        return {
          ...state,
          isloadingBookmark: false,
          bookmarks: action.payload,
        };
      case "bookmark/loaded":
        return {
          ...state,
          isloadingBookmark: false,
          currentBookmark: action.payload,
        };
      case "bookmark/created":
        return {
          ...state,
          isloadingBookmark: false,
          bookmarks: [...state.bookmarks, action.payload],
          currentBookmark: action.payload,
        };
      case "bookmark/deleted":
        return {
          ...state,
          isloadingBookmark: false,
          bookmarks: state.bookmarks.filter(
            (item) => item.id !== action.payload
          ),
          currentBookmark: null,
        };
      case "rejected":
        return {
          ...state,
          isloadingBookmark: false,
          error: action.payload,
        };
      default:
        throw new Error("Unkown action type");
    }
  }
  // main reducer
  const [{ bookmarks, currentBookmark, isloadingBookmark }, dispatch] =
    useReducer(bookmarkReducer, initialState);

  // fetch bookmarks
  useEffect(() => {
    async function fetchBookmarkList() {
      // setIsloadingBookmark(true);
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(BASE_URl);
        // setBookmarks(data);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({ type: "rejected", payload: "error in fetch bookmarks" });
      }
    }
    fetchBookmarkList();
  }, []);
  // get single bookmark Do
  async function getBookmark(id) {
    // setIsloadingBookmark(true);
    // can't reload the same fetch data with this line code
    if (currentBookmark?.id === Number(id)) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URl}/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: "error in get single bookmark" });
    }
  }
  // create||add bookmark
  async function createBookmark(newBookmark) {
    // setIsloadingBookmark(true);
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(BASE_URl, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
      // setBookmarks((pre) => [...pre, data]);
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }
  // delete bookmark
  async function deleteBookmark(id) {
    // setIsloadingBookmark(true);
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URl}/${id}`);
      // setBookmarks((pre) => pre.filter((item) => item.id !== id));
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        getBookmark,
        currentBookmark,
        isloadingBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function usebookmark() {
  const res = useContext(BookmarkContext);
  if (res === undefined) return new Error("outSide of the bookmarks context");
  return res;
}
