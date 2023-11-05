import {
  MapIcon,
  MapPinIcon,
  NewspaperIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  StarIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

export default function TabComponent({ singleData }) {
  const [itemSelected, setItemSelected] = useState(1);
  const items = [
    { name: "OverView", id: 1 },
    { name: "Amenities", id: 2 },
    { name: "Location", id: 3 },
    { name: "AboutHotel", id: 4 },
  ];
  const handlItem = (id) => {
    setItemSelected(id);
  };

  return (
    <div className="TabComponent flex flex-col w-full">
      <div className="bg-white flex items-center">
        {items?.map((t) => {
          return (
            <TabItem
              key={t.id}
              id={t.id}
              name={t.name}
              handlItem={handlItem}
              itemSelected={itemSelected}
            />
          );
        })}
      </div>
      <div className="p-2 bg-white rounded-b-xl">
        <Content itemSelected={itemSelected} singleData={singleData} />
      </div>
    </div>
  );
}
function TabItem({ id, name, handlItem, itemSelected }) {
  return (
    <div
      id={id}
      className={`flex grow font-bold text-sm ${
        itemSelected === id ? "text-orange-700" : null
      }`}
    >
      <button onClick={() => handlItem(id)} className="p-2 border grow">
        {name}
      </button>
    </div>
  );
}
function Content({ itemSelected, singleData }) {
  switch (itemSelected) {
    case 1:
      return <OverView singleData={singleData} />;
    case 2:
      return <Amenities singleData={singleData} />;
    case 3:
      return <Location singleData={singleData} />;
    case 4:
      return <AboutHotel singleData={singleData} />;
    default:
      return <OverView singleData={singleData} />;
  }
}
function OverView({ singleData }) {
  return (
    <div className="bg-white overflow-auto" style={{ height: "37vh" }}>
      <div className="flex justify-between items-center">
        <h1 className=" px-1 flex items-center">
          <h1 className="font-bold text-lg px-1 flex ">
            {singleData.host_name}
          </h1>
          <p className="px-2 text-sm">(per night) {singleData.price} $</p>
        </h1>
        <p className="px-4">
          {singleData.host_response_rate == 100 ? (
            <div className="flex">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-yellow-400" />
            </div>
          ) : singleData.host_response_rate >= 70 &&
            singleData.host_response_rate < 100 ? (
            <div className="flex">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-slate-400" />
            </div>
          ) : singleData.host_response_rate >= 50 &&
            singleData.host_response_rate < 70 ? (
            <div className="flex">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-slate-400" />
              <StarIcon className="w-5 h-5 text-slate-400" />
            </div>
          ) : singleData.host_response_rate < 50 ? (
            <div className="flex">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <StarIcon className="w-5 h-5 text-slate-400" />
              <StarIcon className="w-5 h-5 text-slate-400" />
              <StarIcon className="w-5 h-5 text-slate-400" />
            </div>
          ) : null}
        </p>
      </div>
      <h3 className="font-bold text-sm px-1"> {singleData.name}</h3>
      <div className="m-2 grid grid-rows-6 grid-flow-col border-2 rounded-lg ">
        <p className="bg-slate-100 px-2 py-1">Accommodates :</p>
        <p className="px-2 py-1">Bathrooms :</p>
        <p className="bg-slate-100 px-2 py-1">Bedtype :</p>
        <p className="px-2 py-1">Bedrooms :</p>
        <p className="bg-slate-100 px-2 py-1">Beds :</p>
        <p className="px-2 py-1">Roomtype :</p>
        <p className="bg-slate-100 px-2 py-1">{singleData.accommodates}</p>
        <p className="px-2 py-1">{singleData.bathrooms}</p>
        <p className="bg-slate-100 px-2 py-1">{singleData.bed_type}</p>
        <p className="px-2 py-1">{singleData.bedrooms}</p>
        <p className="bg-slate-100 px-2 py-1">{singleData.beds}</p>
        <p className="px-2 py-1">{singleData.room_type}</p>
      </div>
      {/* <p className="grid grid-rows-2 grid-flow-col">
        {singleData?.features?.map((item, id) => (
          <p key={id} className="text-center bg-slate-100 border p-1">
            {item}
          </p>
        ))}
      </p> */}
      <p className="p-2 text-slate-600 text-sm"> {singleData.description}</p>
    </div>
  );
}
function Location({ singleData }) {
  return (
    <div className="bg-white overflow-auto" style={{ height: "37vh" }}>
      <div className="font-bold flex items-center">
        <MapIcon className="w-6 h-6 text-primary-700 pr-1" />
        <p>{singleData.smart_location}</p>
      </div>
      <p className="">
        Experiences offered :
        <p className="text-slate-500 inline px-1">
          {singleData.experiences_offered}
        </p>
      </p>
      <p className="font-light text-sm pt-1"> {singleData.summary}</p>
    </div>
  );
}
function Amenities({ singleData }) {
  return (
    <div
      className="bg-white px-1 overflow-y-auto flex flex-col gap-2"
      style={{ height: "37vh" }}
    >
      <h1 className="font-bold text-lg  flex flex-col">Amenities</h1>
      <div className="font-bold text-sm flex items-center">
        <UsersIcon className="w-6 h-6 text-primary-700 pr-1" />
        <p className="">Extra people :</p>
        <p className="px-1"> {singleData.extra_people}</p>
      </div>
      <div className="text-sm ">
        <div className="flex font-bold text-sm">
          <PaperClipIcon className="w-6 h-6 text-primary-700 pr-1" />
          <p className="font-bold ">House rules </p>
        </div>
        <p className="font-light ">
          {singleData.house_rules ? singleData.house_rules : "--"}
        </p>
      </div>

      <p className="py-1 px-2 grid grid-rows-6  grid-cols-3 gap-1  text-sm  ">
        {singleData?.amenities?.map((item, id) => (
          <div
            key={id}
            className="border border-orange-700 text-center p-2 bg-slate-100 rounded-lg"
          >
            {item}
          </div>
        ))}
      </p>
    </div>
  );
}
function AboutHotel({ singleData }) {
  return (
    <div
      className="bg-white overflow-auto flex flex-col gap-2"
      style={{ height: "37vh" }}
    >
      <div className="font-bold text-black text-lg px-1">
        <div className="flex items-center">
          <NewspaperIcon className="w-6 h-6 text-primary-700 pr-1" />
          Neighborhood overview
        </div>
        <p className="text-sm font-thin">{singleData.neighborhood_overview}</p>
      </div>
      <div className="font-bold text-black text-lg px-1">
        <div className="flex items-center">
          <MapPinIcon className="w-6 h-6 text-primary-700 pr-1" />
          Location
        </div>
        <p className="text-sm font-thin">
          {singleData.city},{singleData.street}
        </p>
      </div>
      <div className="font-bold text-black text-lg px-1">
        Transit
        <p className="text-sm font-thin">
          {singleData.transit ? singleData.transit : "--"}
        </p>
      </div>
      <div className="font-bold text-black text-lg px-1">
        Property type
        <p className="text-sm font-thin">
          {singleData.property_type ? singleData.property_type : "--"}
        </p>
      </div>
      <div className="font-bold text-black text-lg px-1">
        Space
        <p className="text-sm font-thin">
          {singleData.space ? singleData.space : "--"}
        </p>
      </div>
    </div>
  );
}
