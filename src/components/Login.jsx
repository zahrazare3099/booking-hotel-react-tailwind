import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import LOGO from "../pictures/LOGO.png";
import { useAuth } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
const inputStyleBox =
  "flex items-center justify-between rounded-lg bg-white overflow-hidden ";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login({ email, password });
    setError("check input");
    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
      setError(null);
    }
  }, [isAuthenticated, error]);

  return (
    <div className="flex w-full h-auto justify-center mt-10 items-center">
      <div className="flex bg-white p-10 w-2/3 border shadow-lg rounded-xl">
        <div
          style={{ height: "60vh" }}
          className="bg-primary-700 rounded-xl text-white flex-1 justify-center items-center text-center"
        >
          <h1 className="p-3 mt-5 font-bold text-2xl">Login</h1>
          <form
            onSubmit={handleSubmit}
            style={{ height: "40vh" }}
            className="flex flex-col gap-3 items-center justify-center p-5"
          >
            {/* inputs */}
            <div className="flex flex-col text-start px-5 ">
              <label className="px-2 py-1 font-sans font-bold" htmlFor="email">
                Email
              </label>
              <div
                className={`${inputStyleBox} ${
                  error ? "border-2 border-red-500" : null
                }`}
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  className="outline-none pl-2 rounded-lg flex-1 text-black"
                  type="email"
                  placeholder="test@gmail.com"
                />
                <EnvelopeIcon className="w-9 h-9 text-orange-400 px-2" />
              </div>
              <p className="text-red-600 text-xs px-2">
                {error ? error : null}
              </p>
            </div>
            <div className="flex flex-col text-start px-5">
              <label
                className="px-2 py-1 font-sans font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <div
                className={`${inputStyleBox} ${
                  error ? "border-2 border-red-500" : null
                }`}
              >
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  className="outline-none pl-2 rounded-lg flex-1 text-black"
                  type="password"
                  placeholder="0000"
                />
                <KeyIcon className="w-9 h-9 text-orange-400 px-2" />
              </div>
              <p className="text-red-600 text-xs px-2">
                {error ? error : null}
              </p>
            </div>
            {/* button */}
            <div className="flex p-3 items-center justify-center w-full">
              <button className="bg-red-950 px-3 py-2 rounded-lg w-3/4">
                Submit
              </button>
            </div>
          </form>
          <div className="text-xs pt-3 px-9 w-full text-start">
            <p className="px-9">
              Your entry means acceptance of Zishvadi goods conditions and
              privacy rules.
            </p>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center text-center">
          <img src={LOGO} alt="LOGO" className="w-2/3 h-auto" />
        </div>
      </div>
    </div>
  );
}
