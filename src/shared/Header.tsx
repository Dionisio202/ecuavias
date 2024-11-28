import React, { useState } from "react";
import User06 from "../assets/user-06.png";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-[999] flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            className="z-[99999] block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
            onClick={() => setSidebarToggle(!sidebarToggle)}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !sidebarToggle ? "!w-full delay-300" : ""
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !sidebarToggle ? "!w-full delay-400" : ""
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !sidebarToggle ? "!w-full delay-500" : ""
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* Dark Mode Toggle */}
            <li>
              <label
                className={`relative m-0 block h-7.5 w-14 rounded-full ${
                  darkMode ? "bg-primary" : "bg-stroke"
                }`}
              >
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
                />
                <span
                  className={`absolute left-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
                    darkMode ? "!right-1 !translate-x-full" : ""
                  }`}
                ></span>
              </label>
            </li>
          </ul>

          {/* User Area */}
          <div className="relative">
            <button
              className="flex items-center gap-4"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="hidden text-right lg:block">
                <span className="block text-sm font-medium text-black dark:text-black">
                  Thomas Anree
                </span>
                <span className="block text-xs font-medium">UX Designer</span>
              </span>
              <span className="h-12 w-12 rounded-full">
                <img src={User06} alt="User" />
              </span>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <ul className="flex flex-col gap-5 border-b px-6 py-7.5">
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    >
                      Account Settings
                    </Link>
                  </li>
                </ul>
                <button
                  className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                  onClick={async () => {
                    const { error } = await supabase.auth.signOut();
                    if (!error) {
                      window.location.href = "/";
                    } else {
                      console.error("Error al cerrar sesión:", error);
                    }
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
