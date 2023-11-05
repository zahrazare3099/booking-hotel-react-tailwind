import React from "react";
import { Outlet } from "react-router-dom";
import Map from "../components/Map";
import { useHotels } from "../Context/HotelsProvider";

export default function Layout() {
  const { hotels } = useHotels();
  return (
    <div className="flex p-3" style={{ height: "85vh" }}>
      <Outlet />
      <Map MarkerLocation={hotels} />
    </div>
  );
}
