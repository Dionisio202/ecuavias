import React, { useState } from "react";
import ReservacionTable from "../shared/ReservasTable";
import Sidebar from "../shared/SideBar";
import Preloader from "../shared/Preloaded";
import HeaderAndFilters from "../shared/Headerreservas";
import EditModal from "../shared/EditModal";

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
  estado: string;
}

const Reservaciones: React.FC = () => {
  const [reservaciones, setReservaciones] = useState<Reservacion[]>([
    {
      id: 1,
      tipoDocumento: "Cédula",
      numeroDocumento: "1805273396",
      nombre: "Jairo",
      apellido: "Freire",
      ruta: "Ambato-Quito",
      numeroBus: "21",
      fechaReserva: "2023-04-02",
      telefono: "0999309622",
      email: "jairofreireortiz10@gmail.com",
      metodoPago: "Efectivo",
      estado: "Pagada",
    },
    {
      id: 2,
      tipoDocumento: "Cédula",
      numeroDocumento: "1805273397",
      nombre: "María",
      apellido: "Pérez",
      ruta: "Quito-Guayaquil",
      numeroBus: "15",
      fechaReserva: "2023-05-10",
      telefono: "0999309623",
      email: "mariaperez@gmail.com",
      metodoPago: "Tarjeta",
      estado: "Pendiente",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentReservacion, setCurrentReservacion] = useState<Reservacion | null>(null);

  // Función para manejar el botón "Editar" y abrir el modal con los datos seleccionados
  const handleEditReservacion = (reservacion: Reservacion) => {
    setCurrentReservacion(reservacion); // Guardar la reservación seleccionada en el estado
    setModalOpen(true); // Abrir el modal
  };

  // Función para guardar los cambios realizados en el modal
  const handleSaveReservacion = (updatedData: {
    estado: string;
    numeroBus: string;
    ruta: string;
    fechaReserva: string;
  }) => {
    if (currentReservacion) {
      // Actualizar la reservación en el estado
      setReservaciones((prev) =>
        prev.map((r) =>
          r.id === currentReservacion.id
            ? { ...r, ...updatedData } // Actualizar los datos de la reservación seleccionada
            : r
        )
      );
    }
    setModalOpen(false); // Cerrar el modal
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Preloader />
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <main className="p-6 bg-gray-100 min-h-screen">
          {/* Header y Filtros */}
          <HeaderAndFilters
            title="Gestión de Reservaciones"
            searchTerm=""
            setSearchTerm={() => {}}
            selectedPaymentMethod="Todas"
            setSelectedPaymentMethod={() => {}}
            selectedStatus="Todas"
            setSelectedStatus={() => {}}
            onAddReservationClick={() => alert("Agregar nueva reservación")}
          />
          {/* Tabla de Reservaciones */}
          <ReservacionTable
            seats={reservaciones}
            onEditSeat={handleEditReservacion} // Pasar la función de editar
            onViewSeat={(reservacion) =>
              alert(`Ver reservación de ${reservacion.nombre}`)
            }
          />
        </main>
      </div>
      {/* Modal de edición */}
      <EditModal
        isOpen={modalOpen} // Determinar si el modal está abierto
        onClose={() => setModalOpen(false)} // Función para cerrar el modal
        onSave={handleSaveReservacion} // Guardar los cambios del modal
        initialData={{
          estado: currentReservacion?.estado || "",
          numeroBus: currentReservacion?.numeroBus || "",
          ruta: currentReservacion?.ruta || "",
          fechaReserva: currentReservacion?.fechaReserva || "",
        }}
      />
    </div>
  );
};

export default Reservaciones;
