import React, { useState } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import TrashIcon from "../assets/Trash.svg";
import EyeIcon from "../assets/eyei.svg";
import EditIcon from "../assets/edit.svg";
import ArrowBackIcon from "../assets/arrowback.svg";
import ArrowNextIcon from "../assets/nextarrow.svg";

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
  frecuencia: string;
  estado: string; // Pagada, Cancelada, Pendiente
}

interface ReservacionTableProps {
  reservaciones: Reservacion[];
  onEditReservacion: (reservacion: Reservacion) => void;
  onViewReservacion: (reservacion: Reservacion) => void;
}

const ReservacionTable: React.FC<ReservacionTableProps> = ({
  reservaciones,
  onEditReservacion,
  onViewReservacion,
}) => {
  const [selectedReservaciones, setSelectedReservaciones] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reservacionesPerPage = 6;

  // Paginación
  const indexOfLastReservacion = currentPage * reservacionesPerPage;
  const indexOfFirstReservacion = indexOfLastReservacion - reservacionesPerPage;
  const currentReservaciones = reservaciones.slice(
    indexOfFirstReservacion,
    indexOfLastReservacion
  );

  const handleSelectReservacion = (id: number) => {
    setSelectedReservaciones((prev) =>
      prev.includes(id) ? prev.filter((resId) => resId !== id) : [...prev, id]
    );
  };

  const isReservacionSelected = (id: number) => selectedReservaciones.includes(id);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Resumen de Reservaciones</h2>
        <div className="flex items-center gap-4">
          {/* Botón Ver Reserva */}
          <button
            onClick={() =>
              onViewReservacion(
                reservaciones.find((res) => res.id === selectedReservaciones[0])!
              )
            }
            className={`flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 ${
              selectedReservaciones.length === 1 ? "" : "opacity-50 pointer-events-none"
            }`}
          >
            <img src={EyeIcon} alt="View Reservation" className="w-5 h-5" />
            Ver Reservación
          </button>

          {/* Botón Eliminar */}
          <button
            className={`flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 ${
              selectedReservaciones.length === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <img src={TrashIcon} alt="Delete" className="w-5 h-5" />
            Eliminar seleccionadas
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-y-3">
          <thead>
            <tr className="text-gray-800">
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedReservaciones(
                      e.target.checked ? reservaciones.map((res) => res.id) : []
                    )
                  }
                  checked={
                    selectedReservaciones.length === reservaciones.length &&
                    reservaciones.length > 0
                  }
                />
              </th>
              <th className="px-4 py-2 bg-black text-white rounded-full">Tipo Documento</th>
              <th className="px-4 py-2 bg-black text-white rounded-full">
                Número Documento
              </th>
              <th className="px-4 py-2 bg-black text-white rounded-full">Nombre</th>
              <th className="px-4 py-2 bg-black text-white rounded-full">Apellido</th>
              <th className="px-4 py-2 bg-black text-white rounded-full">Ruta</th>
              <th className="px-4 py-2 bg-black text-white rounded-full">N° Bus</th>
              <th className="px-4 py-2 bg-black text-white rounded-full">
                Fecha de Reserva
              </th>
              <th className="px-4 py-2 bg-black text-white rounded-full">Teléfono</th>
              <th className="px-4 py-2 bg-black text-white rounded-full">Email</th>
              <th className="px-4 py-2 bg-black text-white rounded-full">Frecuencia</th>
              <th className="px-4 py-2 bg-black text-white rounded-full">Estado</th>
              <th className="px-4 py-2 bg-black text-white rounded-full">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentReservaciones.map((reservacion) => (
              <tr key={reservacion.id} className="bg-white hover:bg-gray-50">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={isReservacionSelected(reservacion.id)}
                    onChange={() => handleSelectReservacion(reservacion.id)}
                  />
                </td>
                <td className="px-4 py-2">{reservacion.tipoDocumento}</td>
                <td className="px-4 py-2">{reservacion.numeroDocumento}</td>
                <td className="px-4 py-2">{reservacion.nombre}</td>
                <td className="px-4 py-2">{reservacion.apellido}</td>
                <td className="px-4 py-2">{reservacion.ruta}</td>
                <td className="px-4 py-2">{reservacion.numeroBus}</td>
                <td className="px-4 py-2">{reservacion.fechaReserva}</td>
                <td className="px-4 py-2">{reservacion.telefono}</td>
                <td className="px-4 py-2">{reservacion.email}</td>
                <td className="px-4 py-2">{reservacion.frecuencia}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      reservacion.estado === "Pagada"
                        ? "bg-green-100 text-green-700"
                        : reservacion.estado === "Cancelada"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {reservacion.estado}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onEditReservacion(reservacion)}
                    className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <img src={EditIcon} alt="Edit" className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(reservaciones.length / reservacionesPerPage)}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              slots={{
                previous: () => (
                  <span className="flex items-center gap-2">
                    <img src={ArrowBackIcon} alt="Previous" className="w-4 h-4" />
                    Anterior
                  </span>
                ),
                next: () => (
                  <span className="flex items-center gap-2">
                    Siguiente
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
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default ReservacionTable;
