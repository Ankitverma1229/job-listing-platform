import React, { useState } from "react";
import navbar from "../Assests/navbar.png";
import profileLogo from "../Assests/profile_logo.png";
import { useNavigate } from "react-router-dom";
import { PiCoinsFill } from "react-icons/pi";

const Navbar = ({ totalToken, name }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleDropdownClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div>
      <div className="relative">
        <nav className="h-24 ">
          <img src={navbar} alt="Navbar" className="h-[100%] w-[95%] mx-auto" />
        </nav>
        <div className="absolute top-5  flex justify-between items-center w-[90%] mx-20">
          <p
            className="text-white text-2xl font-bold cursor-pointer hover:bg-gray-500 hover:bg-opacity-25 hover:rounded-lg p-2"
            onClick={handleDropdownClick}
          >
            Job Portal
          </p>
          <div
            className="flex items-center cursor-pointer"
            onClick={handleDropdownClick}
          >
            <img
              src={profileLogo}
              alt="Profile Logo"
              className="h-8 w-8 mr-2"
            />
            <span className="text-white font-semibold hover:bg-gray-500 hover:bg-opacity-25 hover:rounded-lg p-2">
              Welcome {name}!
            </span>
          </div>
        </div>
        {isDropdownVisible && (
          <div className="bg-white absolute right-12 top-16 w-50 px-0.5 rounded-md shadow-md">
            <p
              className="cursor-pointer text-center p-2 rounded-md hover:bg-slate-800 hover:text-white"
              onClick={() => navigate("/profile")}
            >
              Profile
            </p>
            <hr />
            <p
              className="cursor-pointer text-center p-2 rounded-md hover:bg-slate-800 hover:text-white"
              onClick={() => {
                localStorage.clear();
                navigate("/")}}
            >
              Logout
            </p>
            <hr />

            <div className="flex gap-2 shadow-md  rounded-md  py-1 ">
              Coins:{" "}
              <p className="flex items-center gap-2">
                <PiCoinsFill className="text-[#92400e] text-xl" />{" "}
                <span>{totalToken || 0}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
