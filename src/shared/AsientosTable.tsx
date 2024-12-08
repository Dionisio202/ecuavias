import React, { useState } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import TrashIcon from "../assets/Trash.svg";
import ArrowBackIcon from "../assets/arrowback.svg";
import ArrowNextIcon from "../assets/nextarrow.svg";
import EditIcon from "../assets/edit.svg";
import EyeIcon from "../assets/eyei.svg";
import { Seat } from "../shared/interfaces"; // Import the shared Seat interface

interface SeatTableProps {
  seats: Seat[]; // Use the imported Seat interface
  onDeleteSelected: () => void;
  onEditSeat: (seat: Seat) => void;
  onViewSeat: (seat: Seat) => void; // Nuevo callback para ver el asiento
}

const SeatTable: React.FC<SeatTableProps> = ({
  seats,
  onDeleteSelected,
  onEditSeat,
  onViewSeat,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const seatsPerPage = 6;

  // Pagination logic
  const indexOfLastSeat = currentPage * seatsPerPage;
  const indexOfFirstSeat = indexOfLastSeat - seatsPerPage;
  const currentSeats = seats.slice(indexOfFirstSeat, indexOfLastSeat);

  const handleSelectSeat = (id: number) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((seatId) => seatId !== id) : [...prev, id]
    );
  };

  const isSeatSelected = (id: number) => selectedSeats.includes(id);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Resumen de Asientos</h2>
        <div className="flex items-center gap-4">
          {/* View Seats Button */}
          <button
            onClick={() => onViewSeat(seats.find((seat) => seat.id === selectedSeats[0])!)} // Encuentra y pasa el asiento seleccionado
            className={`flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 ${
              selectedSeats.length === 1 ? "" : "opacity-50 pointer-events-none"
            }`}
          >
            <img src={EyeIcon} alt="View Seats" className="w-5 h-5" />
            Ver asientos
          </button>

          {/* Delete Button */}
          <button
            onClick={onDeleteSelected}
            className={`flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 ${
              selectedSeats.length === 0 && "opacity-50 pointer-events-none"
            }`}
          >
            <img src={TrashIcon} alt="Delete" className="w-5 h-5" />
            Eliminar seleccionados
          </button>

          {/* Pagination */}
          <Pagination
            count={Math.ceil(seats.length / seatsPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                slots={{
                  previous: () => (
                    <span className="flex items-center gap-2">
                      <img src={ArrowBackIcon} alt="Previous" className="w-4 h-4" />
                      <span>Anterior</span>
                    </span>
                  ),
                  next: () => (
                    <span className="flex items-center gap-2">
                      <span>Siguiente</span>
                      <img src={ArrowNextIcon} alt="Next" className="w-4 h-4" />
                    </span>
                  ),
                }}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "12px",
                  },
                  borderRadius: "12px",
                }}
              />
            )}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white p-6 rounded-3xl shadow-md">
        <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-2">
          <thead className="text-white">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedSeats(
                      e.target.checked ? seats.map((seat) => seat.id) : []
                    )
                  }
                  checked={selectedSeats.length === seats.length && seats.length > 0}
                />
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">Número</th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">Bus</th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">Categoría</th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">T. Asientos</th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">Asientos VIP</th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">Asientos N</th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">Estado</th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentSeats.map((seat) => (
              <tr key={seat.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={isSeatSelected(seat.id)}
                    onChange={() => handleSelectSeat(seat.id)}
                  />
                </td>
                <td className="px-4 py-2">{seat.numero}</td>
                <td className="px-4 py-2">{seat.bus}</td>
                <td className="px-4 py-2">{seat.categoria}</td>
                <td className="px-4 py-2">{seat.totalAsientos}</td>
                <td className="px-4 py-2">{seat.asientosVIP}</td>
                <td className="px-4 py-2">{seat.asientosNormales}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      seat.estado === "Disponible"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {seat.estado}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onEditSeat(seat)}
                    className="flex items-center justify-center w-8 h-8 bg-transparent hover:bg-gray-200 rounded-full"
                  >
                    <img src={EditIcon} alt="Edit" className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeatTable;
