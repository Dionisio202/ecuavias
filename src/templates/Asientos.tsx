import React, { useState } from "react";
import SeatTable from "../shared/AsientosTable";
import Sidebar from "../shared/SideBar";
import Preloader from "../shared/Preloaded";
import Header from "../shared/Header"; // Importación del Header
import HeaderAndFilters from "../shared/HeaderAsientos";
import SeatLayoutViewer from "../shared/SeatLayoutViewer";
import SeatLayout from "../shared/SeatLayout";
import SeatLayoutEditor from "../shared/SeatLayoutEditor";

interface Seat {
  id: number;
  numero: string;
  bus: string;
  categoria: string;
  totalAsientos: number;
  asientosVIP: number;
  asientosNormales: number;
  estado: string;
  floors: FloorData[];
}

interface FloorData {
  floorNumber: number;
  rows: number;
  cols: number;
  seats: Cell[];
  totalSeats: number;
  totalVIPSeats: number;
  totalNormalSeats: number;
}

interface Cell {
  fila: number;
  columna: number;
  tipo: "VIP" | "Normal" | "Pasillo";
}

const Asiento: React.FC = () => {
  const [seats] = useState<Seat[]>([
    {
      id: 1,
      numero: "21",
      bus: "Ambato",
      categoria: "VIP",
      totalAsientos: 60,
      asientosVIP: 20,
      asientosNormales: 40,
      estado: "Disponible",
      floors: [
        {
          floorNumber: 1,
          rows: 5,
          cols: 4,
          seats: [
            { fila: 0, columna: 0, tipo: "VIP" },
            { fila: 0, columna: 1, tipo: "Normal" },
          ],
          totalSeats: 20,
          totalVIPSeats: 5,
          totalNormalSeats: 15,
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("Todas");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isAdding, setIsAdding] = useState(false);
  const [editingSeat, setEditingSeat] = useState<Seat | null>(null);
  const [viewingSeat, setViewingSeat] = useState<Seat | null>(null);

  const filteredSeats = seats.filter((seat) => {
    const searchMatch =
      seat.numero.includes(searchTerm) ||
      seat.bus.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = selectedRole === "Todas" || seat.estado === selectedRole;
    const categoryMatch =
      selectedCategory === "Todas" || seat.categoria === selectedCategory;
    return searchMatch && roleMatch && categoryMatch;
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Preloader */}
      <Preloader />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Condicional para ocultar Header */}
        {!isAdding && !editingSeat && !viewingSeat && <Header />}

        {/* Layout de Asientos a Pantalla Completa */}
        {isAdding && (
          <div className="fixed inset-0 bg-white z-50 overflow-auto">
            <button
              onClick={() => setIsAdding(false)}
              className="absolute top-8 right-8 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
            >
              Cerrar
            </button>
            <div className="p-8">
              <SeatLayout onClose={() => setIsAdding(false)} />
            </div>
          </div>
        )}

        {editingSeat && (
          <div className="fixed inset-0 bg-white z-50 overflow-auto">
            <button
              onClick={() => setEditingSeat(null)}
              className="absolute top-8 right-8 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
            >
              Cerrar
            </button>
            <div className="p-8">
              <SeatLayoutEditor
                initialBusNumber={editingSeat.numero}
                initialFloors={editingSeat.floors}
                onSave={() => setEditingSeat(null)}
              />
            </div>
          </div>
        )}

        {viewingSeat && (
          <div className="fixed inset-0 bg-white z-50 overflow-auto">
            <button
              onClick={() => setViewingSeat(null)}
              className="absolute top-8 right-8 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
            >
              Cerrar
            </button>
            <div className="p-8">
              <SeatLayoutViewer
                busNumber={viewingSeat.numero}
                floors={viewingSeat.floors}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        {!isAdding && !editingSeat && !viewingSeat && (
          <main className="p-6 bg-gray-100 min-h-screen">
            {/* Header y Filtros */}
            <HeaderAndFilters
              title="Gestión de Asientos"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedState={selectedRole}
              setSelectedState={setSelectedRole}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onAddUserClick={() => setIsAdding(true)}
            />

            {/* Tabla de Asientos */}
            <SeatTable
              seats={filteredSeats}
              onEditSeat={(seat) => setEditingSeat(seat)}
              onViewSeat={(seat) => setViewingSeat(seat)}
            />
          </main>
        )}
      </div>
    </div>
  );
};

export default Asiento;
