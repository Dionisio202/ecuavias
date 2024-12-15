import React from "react";
import AddIcon from "../assets/addi.svg";
import SearchIcon from "../assets/searchi.svg";

interface HeaderAndFiltersProps {
  title: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  onAddReservationClick: () => void;
}

const HeaderAndFilters: React.FC<HeaderAndFiltersProps> = ({
  title,
  searchTerm,
  setSearchTerm,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  selectedStatus,
  setSelectedStatus,
  onAddReservationClick,
}) => {
  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <button
          onClick={onAddReservationClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-black rounded-full hover:bg-blue-500 shadow-lg w-full sm:w-auto"
        >
          <img src={AddIcon} alt="Add" className="w-6 h-6" /> Agregar Reserva
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          {/* Search Field */}
          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-600 mb-1">¿Qué estás buscando?</label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black text-white placeholder-gray-400 rounded-full focus:outline-none"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <img src={SearchIcon} alt="Search" className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Payment Method Filter */}
          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-600 mb-1">Método de Pago</label>
            <div className="relative">
              <select
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="appearance-none w-full px-6 py-3 bg-black text-white rounded-full focus:outline-none"
              >
                <option value="Todas">Todas</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Efectivo">Efectivo</option>
              </select>
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 fill-current text-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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

          {/* Status Filter */}
          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-600 mb-1">Estado</label>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none w-full px-6 py-3 bg-black text-white rounded-full focus:outline-none"
              >
                <option value="Todas">Todas</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Pagada">Pagada</option>
              </select>
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 fill-current text-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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

          {/* Search Button */}
          <div className="flex flex-col sm:w-auto w-full">
            <label className="text-sm text-gray-600 mb-1 invisible">Buscar</label>
            <button className="px-6 py-3 bg-blue-400 text-black rounded-full hover:bg-blue-500 w-full sm:w-56">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAndFilters;
