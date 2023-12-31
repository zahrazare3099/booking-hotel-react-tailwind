import {
  MapPinIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  MinusIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import useOutsideclick from "../Hooks/UseOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import logo from "../pictures/LOGO.png";
import logoSecend from "../pictures/LOGOSecend.png";
import { useAuth } from "../Context/AuthProvider";
import toast from "react-hot-toast";

export default function HeaderPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [distination, setDistination] = useState(
    searchParams.get("distination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({ Adult: 1, Children: 0, Room: 1 });
  const handlOption = (type, str) => {
    setOptions((pre) => {
      return {
        ...pre,
        [type]: str === "Inc" ? options[type] + 1 : options[type] - 1,
      };
    });
  };
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [errorLogout, setErrorLogout] = useState(null);
  useEffect(() => {
    try {
      setErrorLogout(null);
    } catch (error) {
      toast.error(errorLogout);
    }
  }, [errorLogout]);
  // dateRangePicker
  const dateRangeRef = useRef();
  useOutsideclick(dateRangeRef, "dateRangePicker", () => setOpenDate(false));
  // handleSearch
  const navigateParams = useNavigate();
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      distination,
      date: JSON.stringify(date),
      options: JSON.stringify(options),
    });
    navigateParams({ pathname: "/hotels", search: encodedParams.toString() });
  };
  // Auth
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="flex items-center mb-3">
      {/* LOGO */}
      <div className="w-48 flex flex-col text-orange-700 items-center justify-center pr-3 cursor-pointer">
        {isAuthenticated ? (
          <div className="flex flex-col items-center justify-center cursor-pointer">
            <img
              src={logoSecend}
              alt="logoSecend"
              onClick={() => navigate("/")}
            />
            <p
              onClick={(e) => {
                e.preventDefault();
                navigate({ pathname: "/bookmarks" });
              }}
              className="text-xs font-serif px-1 text-right w-full font-bold"
            >
              list of your Bookmarks
            </p>
          </div>
        ) : (
          <img src={logo} alt="LOGO" />
        )}
      </div>
      <div className="border top-2 sticky z-10 bg-white px-3 py-4 rounded-2xl w-full flex items-center justify-between">
        {/* search input */}
        <div className="px-2 py-1 flex items-center border-gray-400 rounded-lg overflow-hidden">
          <MapPinIcon className="h-6 w-6  text-orange-500" />
          <input
            className="outline-none pl-1"
            placeholder="Where do you to go ?"
            value={distination}
            name="distination"
            id="distination"
            onChange={(e) => setDistination(e.target.value)}
          />
        </div>
        <div className=" border-r-2 text-gray-800 p-3 mx-2 " />
        {/* date picker */}
        <div
          id="dateRangePicker"
          className="picDate flex cursor-pointer relative"
          onClick={() => setOpenDate((pre) => !pre)}
        >
          <CalendarDaysIcon
            id="dateRangePicker"
            className="h-6 w-6 text-primary-600"
          />
          <span id="dateRangePicker" className="px-2">{`${format(
            date[0].startDate,
            "MM/dd/yyyy"
          )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
          <div className="bodyOfCalender" ref={dateRangeRef}>
            {openDate && (
              <DateRange
                className="absolute top-6 -right-16"
                ranges={date}
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                moveRangeOnFirstSelection={true}
              />
            )}
          </div>
        </div>
        <div className=" border-r-2 text-gray-800 p-3 mx-2 " />
        {/* insert member */}
        <div className="pickRoom items-center relative">
          <div
            className=" cursor-pointer"
            id="optionDropDown"
            onClick={() => setOpenOptions((prev) => !prev)}
          >
            {options.Adult} adult &nbsp;&bull;&nbsp; {options.Children} children
            &nbsp;&bull;&nbsp;
            {options.Room} room
          </div>
          <div className="">
            {openOptions && (
              <GuestOptionList
                options={options}
                handlOption={handlOption}
                setOpenOptions={setOpenOptions}
              />
            )}
          </div>
        </div>
        {/* search distination */}
        <div
          onClick={handleSearch}
          className="searchIcon cursor-pointer bg-primary-700 rounded-xl p-1"
        >
          <MagnifyingGlassIcon className="h-6 w-6 p-1 text-white" />
        </div>
      </div>
      {/* login&logout */}
      <div className="flex justify-around px-2 items-center text-primary-700 font-sans">
        <div className="bg-white border rounded-xl flex justify-around px-2 py-5 items-center">
          {isAuthenticated ? (
            <div className="flex items-center justify-center">
              <div className="px-1 font-bold">
                {user.email.split("@")[0].slice(0, 8)}
              </div>
              <div className="h-4 border-r-2 " />
              <button
                onClick={() => {
                  logout();
                  navigate("/", { replace: true });
                  setErrorLogout("You are logout from website!");
                }}
                className="flex justify-center items-center"
              >
                <span className="pl-1">Logout</span>
                <ArrowUpTrayIcon className="w-6 h-6 p-1 text-red-500 rotate-90" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Link to={"/login"} className="px-1 ">
                Login
              </Link>
              <ArrowDownTrayIcon className="w-5 h-5 text-red-500" />
            </div>
          )}

          {/* {user ? (
            <div className="px-1 font-bold text-sm">
              {user.email.split("@")[0].slice(0, 8)}
            </div>
          ) : (
            <Link to={"/login"} className="px-1 ">
              Login
            </Link>
          )} */}

          {/* <div className="h-4 border-r-2 " />
          {isAuthenticated ? (
            <ArrowDownTrayIcon className="w-6 h-6 p-1 text-primary-600" />
          ) : (
            <button
              onClick={() => {
                logout();
                navigate("/", { replace: true });
                setErrorLogout("You are logout from website!");
              }}
              className="flex justify-center items-center"
            >
              <span className="pl-1">Logout</span>
              <ArrowUpTrayIcon className="w-6 h-6 p-1 text-red-500" />
            </button>
          )} */}
        </div>
      </div>
    </nav>
  );
}

function GuestOptionList({ options, handlOption, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideclick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div
      ref={optionsRef}
      className="GuestOptionList absolute bg-white border border-gray-200 w-full top-6  rounded-2xl p-2"
    >
      <OptionItem
        type="Adult"
        options={options}
        minLimit={1}
        handlOption={handlOption}
      />
      <OptionItem
        type="Children"
        options={options}
        minLimit={0}
        handlOption={handlOption}
      />
      <OptionItem
        type="Room"
        options={options}
        minLimit={1}
        handlOption={handlOption}
      />
    </div>
  );
}
function OptionItem({ options, type, minLimit, handlOption }) {
  return (
    <div className="GuestOptionItem py-1 flex items-center justify-between ">
      <div className="w-1/2 px-1 items-center text-sm">{type}</div>
      <div className="w-1/2 flex items-center justify-center">
        <button
          className={`Dec ${
            options[type] == minLimit ? "disabled:cursor-not-allowed" : ""
          }`}
          disabled={options[type] <= minLimit}
          onClick={() => handlOption(type, "dec")}
        >
          <MinusIcon className="h-6 w-6 p-1 bg-slate-200 text-slate-400 rounded-lg" />
        </button>
        <span className="px-2">{options[type]}</span>
        <button className="Inc" onClick={() => handlOption(type, "Inc")}>
          <PlusIcon className="h-6 w-6 p-1 bg-slate-200 text-slate-400 rounded-lg" />
        </button>
      </div>
    </div>
  );
}
