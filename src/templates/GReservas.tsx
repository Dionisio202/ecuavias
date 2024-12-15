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

  // Estados para los filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Todas");
  const [selectedStatus, setSelectedStatus] = useState("Todas");

  const [modalOpen, setModalOpen] = useState(false);
  const [currentReservacion, setCurrentReservacion] = useState<Reservacion | null>(null);

  // Filtrar las reservaciones con base en los filtros seleccionados
  const filteredReservaciones = reservaciones.filter((reservacion) => {
    const matchesSearch =
      searchTerm === "" ||
      reservacion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservacion.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservacion.numeroDocumento.includes(searchTerm);
    const matchesPayment =
      selectedPaymentMethod === "Todas" || reservacion.metodoPago === selectedPaymentMethod;
    const matchesStatus =
      selectedStatus === "Todas" || reservacion.estado === selectedStatus;

    return matchesSearch && matchesPayment && matchesStatus;
  });

  const handleEditReservacion = (reservacion: Reservacion) => {
    setCurrentReservacion(reservacion);
    setModalOpen(true);
  };

  const handleSaveReservacion = (updatedData: {
    estado: string;
    numeroBus: string;
    ruta: string;
    fechaReserva: string;
  }) => {
    if (currentReservacion) {
      setReservaciones((prev) =>
        prev.map((r) =>
          r.id === currentReservacion.id ? { ...r, ...updatedData } : r
        )
      );
    }
    setModalOpen(false);
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
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm} // Pasar la función de estado
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod} // Pasar la función de estado
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus} // Pasar la función de estado
            onAddReservationClick={() => alert("Agregar nueva reservación")}
          />
          {/* Tabla de Reservaciones */}
          <ReservacionTable
            seats={filteredReservaciones} // Usar las reservaciones filtradas
            onEditSeat={handleEditReservacion}
            onViewSeat={(reservacion) =>
              alert(`Ver reservación de ${reservacion.nombre}`)
            }
          />
        </main>
      </div>
      {/* Modal de edición */}
      <EditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveReservacion}
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
