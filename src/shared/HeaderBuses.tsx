import React from "react";
import AddIcon from "../assets/addi.svg";
import SearchIcon from "../assets/searchi.svg";

interface HeaderAndFiltersProps {
  title: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedCooperative: string;
  setSelectedCooperative: (value: string) => void;
  onAddBusClick: () => void;
}

const HeaderAndFilters: React.FC<HeaderAndFiltersProps> = ({
  title,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedCooperative,
  setSelectedCooperative,
  onAddBusClick,
}) => {
  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <button
          onClick={onAddBusClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-black rounded-full hover:bg-blue-500 shadow-lg"
        >
          <img src={AddIcon} alt="Add" className="w-8 h-8" /> Agregar Autobús
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-center">
          {/* Campo de búsqueda */}
          <div className="flex flex-col w-full max-w-md">
            <label className="text-sm text-gray-600 mb-1">Buscar Autobús</label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar por número, cooperativa, marca o modelo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black text-white placeholder-gray-400 rounded-full focus:outline-none"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="w-4 h-4 text-white mr-10"
                />
              </span>
            </div>
          </div>

          {/* Combobox de Cooperativa */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1 ml-8">Cooperativa</label>
            <div className="relative">
              <select
                value={selectedCooperative}
                onChange={(e) => setSelectedCooperative(e.target.value)}
                className="appearance-none w-full max-w-[18rem] px-6 py-3 bg-black text-white rounded-full focus:outline-none lg:w-72"
              >
                <option value="Todas">Todas</option>
                <option value="Ambato">Ambato</option>
                <option value="Quito">Quito</option>
                <option value="Guayaquil">Guayaquil</option>
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

          {/* Combobox de Categorías */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1 ml-8">Categorías</label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none w-full max-w-[18rem] px-6 py-3 bg-black text-white rounded-full focus:outline-none lg:w-72"
              >
                <option value="Todas">Todas</option>
                <option value="Operando">Operando</option>
                <option value="No operando">No operando</option>
                <option value="Mantenimiento">Mantenimiento</option>
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

          {/* Botón Buscar */}
          <div className="flex flex-col mt-4 lg:mt-0">
            <label className="text-sm text-gray-600 mb-1 invisible">.</label>
            <button className="px-6 py-3 bg-blue-400 text-black rounded-full hover:bg-blue-500 w-full max-w-[14rem] lg:w-56">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAndFilters;