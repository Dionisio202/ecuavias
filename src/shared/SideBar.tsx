import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Sidebar = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [selected, setSelected] = useState("");

  const handleOutsideClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!e.currentTarget.contains(e.target as Node)) {
      setSidebarToggle(false);
    }
  };

  return (
    <aside
      className={`absolute left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black transition-transform duration-300 ease-linear ${
        sidebarToggle ? "translate-x-0" : "-translate-x-full"
      } lg:static lg:translate-x-0`}
      onClick={(e) => handleOutsideClick(e)}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 mt-2">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <button
          className="block lg:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setSidebarToggle(!sidebarToggle);
          }}
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* Sidebar Header */}

      {/* Sidebar Content */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* Menu Group */}
          <div>
            <h3
              className="mb-4 ml-4 text-sm font-medium"
              style={{ color: "#DEE4EE" }}
            >
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* Menu Item Usuarios */}
              <li>
                <Link
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-cyan-50 duration-300 ease-in-out ${
                    selected === "Dashboard"
                      ? "bg-[rgba(128,128,128,0.5)] hover:bg-[rgba(128,128,128,0.5)]"
                      : "hover:bg-[rgba(128,128,128,0.5)]"
                  }`}
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected(selected === "Dashboard" ? "" : "Dashboard");
                  }}
                >
                  Usuarios
                  <svg
                    className={`ml-auto h-6 w-6 transition-transform duration-300 ${
                      selected === "Dashboard" ? "rotate-180" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 14.828l-4.95-4.95a.75.75 0 111.06-1.06L12 12.707l3.89-3.89a.75.75 0 111.06 1.06l-4.95 4.95z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                {selected === "Dashboard" && (
                  <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                    <li>
                      <Link
                        className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-cyan-50 duration-300 ease-in-out hover:text-white"
                        to="/Perfil"
                      >
                        Perfil
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* Menu Item Buses */}
              <li>
                <Link
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-cyan-50 duration-300 ease-in-out ${
                    selected === "Buses"
                      ? "bg-[rgba(128,128,128,0.5)] hover:bg-[rgba(128,128,128,0.5)]"
                      : "hover:bg-[rgba(128,128,128,0.5)]"
                  }`}
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected(selected === "Buses" ? "" : "Buses");
                  }}
                >
                  Buses
                  <svg
                    className={`ml-auto h-6 w-6 transition-transform duration-300 ${
                      selected === "Buses" ? "rotate-180" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 14.828l-4.95-4.95a.75.75 0 111.06-1.06L12 12.707l3.89-3.89a.75.75 0 111.06 1.06l-4.95 4.95z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                {selected === "Buses" && (
                  <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                    <li>
                      <Link
                        className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-cyan-50 duration-300 ease-in-out hover:text-white"
                        to="/Asientos"
                      >
                        Asientos
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* Menu Item Reservaciones */}
              <li>
                <Link
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-cyan-50 duration-300 ease-in-out ${
                    selected === "Reservaciones"
                      ? "bg-[rgba(128,128,128,0.5)] hover:bg-[rgba(128,128,128,0.5)]"
                      : "hover:bg-[rgba(128,128,128,0.5)]"
                  }`}
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected(
                      selected === "Reservaciones" ? "" : "Reservaciones"
                    );
                  }}
                >
                  Reservaciones
                  <svg
                    className={`ml-auto h-6 w-6 transition-transform duration-300 ${
                      selected === "Reservaciones" ? "rotate-180" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 14.828l-4.95-4.95a.75.75 0 111.06-1.06L12 12.707l3.89-3.89a.75.75 0 111.06 1.06l-4.95 4.95z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                {selected === "Reservaciones" && (
                  <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                    <li>
                      <Link
                        className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-cyan-50 duration-300 ease-in-out hover:text-white"
                        to="/ListaReservaciones"
                      >
                        Lista de Reservaciones
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
