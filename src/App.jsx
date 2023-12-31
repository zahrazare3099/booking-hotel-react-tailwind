import { Toaster } from "react-hot-toast";
import HeaderPage from "./components/HeaderPage";
import LocationList from "./components/LocationList";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Hotels from "./components/Hotels";
import HotelsProvider from "./Context/HotelsProvider";
import "./App.css";
import SingleHotel from "./components/SingleHotel";
import BookmarkLayout from "./Layout/BookmarkLayout";
import BookmarkListProvider from "./Context/BookmarkListProvider";
import Bookmark from "./components/Bookmark";
import SingleBookmark from "./components/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark";
import Login from "./components/Login";
import AuthProvider from "./Context/AuthProvider";
import PorotectedRoute from "./Layout/PorotectedRoute";

function App() {
  return (
    <AuthProvider>
      <BookmarkListProvider>
        <HotelsProvider>
          <div className="App ">
            <HeaderPage />
            <Routes>
              <Route path="/" element={<LocationList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/hotels" element={<Layout />}>
                <Route index element={<Hotels />} />
                <Route path=":id" element={<SingleHotel />} />
              </Route>
              <Route
                path="/bookmarks"
                element={
                  <PorotectedRoute>
                    <BookmarkLayout />
                  </PorotectedRoute>
                }
              >
                <Route index element={<Bookmark />} />
                <Route path=":id" element={<SingleBookmark />} />
                <Route path="add" element={<AddNewBookmark />} />
              </Route>
            </Routes>
            <Toaster />
          </div>
        </HotelsProvider>
      </BookmarkListProvider>
    </AuthProvider>
  );
}

export default App;
