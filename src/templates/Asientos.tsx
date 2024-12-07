import React, { useState } from "react";
import SeatTable from "../shared/AsientosTable";
import Sidebar from "../shared/SideBar";
import Header from "../shared/Header";
import Preloader from "../shared/Preloaded";
import HeaderAndFilters from "../shared/HeaderAsientos";

interface Seat {
  id: number;
  numero: string;
  bus: string;
  posicion: string;
  categoria: string;
  cooperativa: string;
  registro: string;
  modelo: string;
  chasis: string;
  totalAsientos: number;
  asientosVIP: number;
  asientosNormales: number;
  estado: string;
}

const Asiento: React.FC = () => {
  const [seats, setSeats] = useState<Seat[]>([
    {
      id: 1,
      numero: "21",
      bus: "Ambato",
      posicion: "Ventana",
      categoria: "VIP",
      cooperativa: "29687",
      registro: "00001",
      modelo: "AKBJ",
      chasis: "VF9YBMCA4EH12345",
      totalAsientos: 60,
      asientosVIP: 20,
      asientosNormales: 40,
      estado: "Disponible",
    },
    {
      id: 2,
      numero: "22",
      bus: "Ambato",
      posicion: "Pasillo",
      categoria: "Normal",
      cooperativa: "29687",
      registro: "00002",
      modelo: "AKBJ",
      chasis: "VF9YBMCA4EH12345",
      totalAsientos: 60,
      asientosVIP: 20,
      asientosNormales: 40,
      estado: "Ocupado",
    },
    // Agrega más asientos según sea necesario...
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("Todas");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filteredSeats = seats.filter((seat) => {
    const searchMatch =
      seat.numero.includes(searchTerm) ||
      seat.bus.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = selectedRole === "Todas" || seat.bus === selectedRole;
    const categoryMatch =
      selectedCategory === "Todas" || seat.categoria === selectedCategory;
    return searchMatch && roleMatch && categoryMatch;
  });

  const handleDeleteSelected = () => {
    console.log("Eliminar seleccionados");
  };

  const handleEditSeat = (seat: Seat) => {
    console.log("Editar asiento:", seat);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Preloader */}
      <Preloader />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="p-6 bg-gray-100 min-h-screen">
          {/* Header y Filtros */}
          <HeaderAndFilters
            title="Gestión de Asientos"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddUserClick={() => console.log("Añadir asiento clickeado")}
          />

          {/* Tabla de Asientos */}
          <SeatTable
            seats={filteredSeats}
            onDeleteSelected={handleDeleteSelected}
            onEditSeat={handleEditSeat}
          />
        </main>
      </div>
    </div>
  );
};

export default Asiento;
