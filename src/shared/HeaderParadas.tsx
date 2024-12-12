import React from "react";
import AddIcon from "../assets/addi.svg";
import SearchIcon from "../assets/searchi.svg";

interface HeaderAndFiltersProps {
  title: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedEstado: string;
  setSelectedEstado: (value: string) => void;
  onAddStopClick: () => void;
}

const HeaderAndFilters: React.FC<HeaderAndFiltersProps> = ({
  title,
  searchTerm,
  setSearchTerm,
  selectedEstado,
  setSelectedEstado,
  onAddStopClick,
}) => {
  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <button
          onClick={onAddStopClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-black rounded-full hover:bg-blue-500 shadow-lg"
        >
          <img src={AddIcon} alt="Add" className="w-8 h-8" /> Agregar Parada
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-center">
          {/* Campo de búsqueda */}
          <div className="flex flex-col w-full max-w-md">
            <label className="text-sm text-gray-600 mb-1">Buscar Parada</label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black text-white placeholder-gray-400 rounded-full focus:outline-none"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <img src={SearchIcon} alt="Search" className="w-4 h-4 text-white" />
              </span>
            </div>
          </div>

          {/* Combobox de Estado */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Estado</label>
            <div className="relative">
              <select
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
                className="appearance-none w-full max-w-[18rem] px-6 py-3 bg-black text-white rounded-full focus:outline-none lg:w-72"
              >
                <option value="Todos">Todos</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 fill-current text-white"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAndFilters;