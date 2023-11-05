import { Outlet } from "react-router-dom";
import Map from "../components/Map";
import { usebookmark } from "../Context/BookmarkListProvider";

export default function BookmarkLayout() {
  const { bookmarks } = usebookmark();
  return (
    <div className="w-full flex ">
      <Outlet />
      <Map MarkerLocation={bookmarks} />
    </div>
  );
}
