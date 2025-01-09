import React, { useState } from "react";
import SearchIcon from "../assets/searchi.svg";

interface HeaderBoletosProps {
  title: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCooperative: string;
  setSelectedCooperative: (value: string) => void;  
  onSearchClick: () => void;
}

const HeaderBoletos: React.FC<HeaderBoletosProps> = ({
  title,
  searchTerm,
  setSearchTerm,
  selectedCooperative,
  setSelectedCooperative,
  onSearchClick,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="mb-6">
      {/* Sección Superior: Perfil */}
      <div className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              src="https://via.placeholder.com/40" // Reemplaza con la URL real del avatar
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-right">
              <p className="font-bold">Edison Ortiz</p>
              <p className="text-sm text-gray-400">Admin</p>
            </div>
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Mi Perfil</li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Configuración</li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Cerrar sesión</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Sección Inferior: Controles */}
      <div className="flex items-center justify-between bg-gray-900 text-white p-4 rounded-b-lg">
        <div className="flex items-center gap-4">
          {/* Campo de búsqueda */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por cooperativa o usuario"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 bg-black text-white placeholder-gray-400 rounded-full focus:outline-none"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <img src={SearchIcon} alt="Search" className="w-4 h-4 text-white" />
            </span>
          </div>

          {/* Selector de cooperativa */}
          <select
            value={selectedCooperative}
            onChange={(e) => setSelectedCooperative(e.target.value)}
            className="appearance-none bg-black text-white rounded-full px-4 py-2 focus:outline-none"
          >
            <option value="Todas">Todas</option>
            <option value="Cooperativa A">Cooperativa A</option>
            <option value="Cooperativa B">Cooperativa B</option>
            <option value="Cooperativa C">Cooperativa C</option>
          </select>

          {/* Botón de búsqueda */}
          <button
            onClick={onSearchClick}
            className="px-4 py-2 bg-blue-500 rounded-full hover:bg-blue-600"
          >
            Buscar
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default HeaderBoletos;
