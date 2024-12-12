import React, { useState } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import TrashIcon from "../assets/Trash.svg";
import ArrowBackIcon from "../assets/arrowback.svg";
import ArrowNextIcon from "../assets/nextarrow.svg";
import EditIcon from "../assets/edit.svg";
import EyeIcon from "../assets/eyei.svg";

interface Reservacion {
  id: number;
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  apellido: string;
  ruta: string;
  numeroBus: string;
  fechaReserva: string;
  telefono: string;
  email: string;
  metodoPago: string;
  estado: string; // Pagada, Cancelada, Pendiente
}

interface ReservacionTableProps {
  seats: Reservacion[]; // Cambiado para usar la nueva interfaz Reservacion
  onEditSeat: (seat: Reservacion) => void;
  onViewSeat: (seat: Reservacion) => void;
}

const ReservacionTable: React.FC<ReservacionTableProps> = ({
  seats,
  onEditSeat,
  onViewSeat,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const seatsPerPage = 6;

  // Lógica de paginación
  const indexOfLastSeat = currentPage * seatsPerPage;
  const indexOfFirstSeat = indexOfLastSeat - seatsPerPage;
  const currentSeats = seats.slice(indexOfFirstSeat, indexOfLastSeat);

  const handleSelectSeat = (id: number) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((seatId) => seatId !== id) : [...prev, id]
    );
  };

  const isSeatSelected = (id: number) => selectedSeats.includes(id);

  const handleDeleteConfirmation = () => {
    if (selectedSeats.length === 0) {
      alert("No hay reservaciones seleccionadas para eliminar.");
      return;
    }

    const confirmation = window.confirm(
      "¿Estás seguro de que deseas eliminar las reservaciones seleccionadas?"
    );

    if (confirmation) {
      const selectedSeatDetails = seats
        .filter((seat) => selectedSeats.includes(seat.id))
        .map(
          (seat) =>
            `Documento: ${seat.tipoDocumento} - ${seat.numeroDocumento}, Ruta: ${seat.ruta}`
        )
        .join("\n");

      alert(`Reservaciones eliminadas:\n${selectedSeatDetails}`);

      // Aquí puedes implementar la lógica real de eliminación si es necesario
      setSelectedSeats([]); // Desmarcar seleccionados
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Reservaciones</h2>
        <div className="flex items-center gap-4">
          {/* Botón Ver Reservaciones */}
          <button
            onClick={() =>
              onViewSeat(seats.find((seat) => seat.id === selectedSeats[0])!)
            }
            className={`flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 ${
              selectedSeats.length === 1 ? "" : "opacity-50 pointer-events-none"
            }`}
          >
            <img src={EyeIcon} alt="View" className="w-5 h-5" />
            Ver reservación
          </button>

          {/* Botón Eliminar */}
          <button
            onClick={handleDeleteConfirmation}
            className={`flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-red-500 ${
              selectedSeats.length === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <img src={TrashIcon} alt="Delete" className="w-5 h-5" />
            Eliminar seleccionadas
          </button>

          {/* Paginación */}
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
                      <img
                        src={ArrowBackIcon}
                        alt="Previous"
                        className="w-4 h-4"
                      />
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

      {/* Tabla */}
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
                  checked={
                    selectedSeats.length === seats.length && seats.length > 0
                  }
                />
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Documento
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Nombre
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Ruta
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Número de Bus
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Fecha Reserva
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Método de Pago
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Estado
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Acciones
              </th>
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
                <td className="px-4 py-2">{`${seat.tipoDocumento} - ${seat.numeroDocumento}`}</td>
                <td className="px-4 py-2">{`${seat.nombre} ${seat.apellido}`}</td>
                <td className="px-4 py-2">{seat.ruta}</td>
                <td className="px-4 py-2">{seat.numeroBus}</td>
                <td className="px-4 py-2">{seat.fechaReserva}</td>
                <td className="px-4 py-2">{seat.metodoPago}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      seat.estado === "Pagada"
                        ? "bg-green-100 text-green-800"
                        : seat.estado === "Pendiente"
                        ? "bg-yellow-100 text-yellow-800"
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

export default ReservacionTable;
