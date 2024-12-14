import React, { useState } from "react";
import SeatTable from "../shared/AsientosTable";
import Sidebar from "../shared/SideBar";
import Preloader from "../shared/Preloaded";
import HeaderAndFilters from "../shared/HeaderAsientos";
import SeatLayoutViewer from "../shared/SeatLayoutViewer"; // Componente para ver asientos
import SeatLayout from "../shared/SeatLayout"; // Componente para configurar un nuevo layout
import SeatLayoutEditor from "../shared/SeatLayoutEditor"; // Componente para editar el layout existente

interface Seat {
  id: number;
  numero: string;
  bus: string;
  categoria: string;
  totalAsientos: number;
  asientosVIP: number;
  asientosNormales: number;
  estado: string;
  floors: FloorData[]; // Agregado para soportar datos de pisos
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
    {
      id: 2,
      numero: "22",
      bus: "Quito",
      categoria: "Normal",
      totalAsientos: 50,
      asientosVIP: 10,
      asientosNormales: 40,
      estado: "Disponible",
      floors: [
        {
          floorNumber: 1,
          rows: 5,
          cols: 4,
          seats: [
            { fila: 0, columna: 0, tipo: "Normal" },
            { fila: 1, columna: 2, tipo: "VIP" },
          ],
          totalSeats: 20,
          totalVIPSeats: 5,
          totalNormalSeats: 15,
        },
      ],
    },
    {
      id: 3,
      numero: "23",
      bus: "Guayaquil",
      categoria: "VIP",
      totalAsientos: 70,
      asientosVIP: 30,
      asientosNormales: 40,
      estado: "Lleno",
      floors: [
        {
          floorNumber: 1,
          rows: 7,
          cols: 5,
          seats: [
            { fila: 0, columna: 3, tipo: "VIP" },
            { fila: 4, columna: 2, tipo: "Normal" },
          ],
          totalSeats: 35,
          totalVIPSeats: 15,
          totalNormalSeats: 20,
        },
        {
          floorNumber: 2,
          rows: 6,
          cols: 4,
          seats: [
            { fila: 2, columna: 0, tipo: "VIP" },
            { fila: 5, columna: 3, tipo: "Normal" },
          ],
          totalSeats: 35,
          totalVIPSeats: 15,
          totalNormalSeats: 20,
        },
      ],
    },
    {
      id: 4,
      numero: "24",
      bus: "Cuenca",
      categoria: "Normal",
      totalAsientos: 80,
      asientosVIP: 20,
      asientosNormales: 60,
      estado: "Disponible",
      floors: [
        {
          floorNumber: 1,
          rows: 8,
          cols: 5,
          seats: [
            { fila: 0, columna: 1, tipo: "Normal" },
            { fila: 7, columna: 3, tipo: "VIP" },
          ],
          totalSeats: 40,
          totalVIPSeats: 10,
          totalNormalSeats: 30,
        },
      ],
    },
    {
      id: 5,
      numero: "25",
      bus: "Loja",
      categoria: "VIP",
      totalAsientos: 55,
      asientosVIP: 25,
      asientosNormales: 30,
      estado: "Lleno",
      floors: [
        {
          floorNumber: 1,
          rows: 5,
          cols: 5,
          seats: [
            { fila: 1, columna: 4, tipo: "VIP" },
            { fila: 3, columna: 2, tipo: "Normal" },
          ],
          totalSeats: 25,
          totalVIPSeats: 10,
          totalNormalSeats: 15,
        },
      ],
    },
    {
      id: 6,
      numero: "26",
      bus: "Machala",
      categoria: "Normal",
      totalAsientos: 90,
      asientosVIP: 15,
      asientosNormales: 75,
      estado: "Disponible",
      floors: [
        {
          floorNumber: 1,
          rows: 9,
          cols: 5,
          seats: [
            { fila: 0, columna: 2, tipo: "VIP" },
            { fila: 8, columna: 4, tipo: "Normal" },
          ],
          totalSeats: 45,
          totalVIPSeats: 5,
          totalNormalSeats: 40,
        },
      ],
    },
    {
      id: 7,
      numero: "27",
      bus: "Riobamba",
      categoria: "VIP",
      totalAsientos: 100,
      asientosVIP: 40,
      asientosNormales: 60,
      estado: "Disponible",
      floors: [
        {
          floorNumber: 1,
          rows: 10,
          cols: 5,
          seats: [
            { fila: 2, columna: 1, tipo: "Normal" },
            { fila: 7, columna: 0, tipo: "VIP" },
          ],
          totalSeats: 50,
          totalVIPSeats: 20,
          totalNormalSeats: 30,
        },
        {
          floorNumber: 2,
          rows: 10,
          cols: 5,
          seats: [
            { fila: 4, columna: 2, tipo: "Normal" },
            { fila: 9, columna: 3, tipo: "VIP" },
          ],
          totalSeats: 50,
          totalVIPSeats: 20,
          totalNormalSeats: 30,
        },
      ],
    },
    {
      id: 8,
      numero: "28",
      bus: "Santo Domingo",
      categoria: "Normal",
      totalAsientos: 75,
      asientosVIP: 10,
      asientosNormales: 65,
      estado: "Lleno",
      floors: [
        {
          floorNumber: 1,
          rows: 8,
          cols: 4,
          seats: [
            { fila: 3, columna: 3, tipo: "VIP" },
            { fila: 6, columna: 2, tipo: "Normal" },
          ],
          totalSeats: 40,
          totalVIPSeats: 5,
          totalNormalSeats: 35,
        },
      ],
    },
    {
      id: 9,
      numero: "29",
      bus: "Esmeraldas",
      categoria: "VIP",
      totalAsientos: 65,
      asientosVIP: 30,
      asientosNormales: 35,
      estado: "Lleno",
      floors: [
        {
          floorNumber: 1,
          rows: 6,
          cols: 5,
          seats: [
            { fila: 0, columna: 0, tipo: "VIP" },
            { fila: 5, columna: 4, tipo: "Normal" },
          ],
          totalSeats: 30,
          totalVIPSeats: 15,
          totalNormalSeats: 15,
        },
      ],
    },
    {
      id: 10,
      numero: "30",
      bus: "Ibarra",
      categoria: "Normal",
      totalAsientos: 85,
      asientosVIP: 20,
      asientosNormales: 65,
      estado: "Disponible",
      floors: [
        {
          floorNumber: 1,
          rows: 9,
          cols: 5,
          seats: [
            { fila: 1, columna: 2, tipo: "VIP" },
            { fila: 8, columna: 3, tipo: "Normal" },
          ],
          totalSeats: 45,
          totalVIPSeats: 10,
          totalNormalSeats: 35,
        },
      ],
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("Todas");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isAdding, setIsAdding] = useState(false); // Para agregar un nuevo layout
  const [editingSeat, setEditingSeat] = useState<Seat | null>(null); // Para editar un layout existente
  const [viewingSeat, setViewingSeat] = useState<Seat | null>(null); // Para ver un asiento existente

  const filteredSeats = seats.filter((seat) => {
    const searchMatch =
      seat.numero.includes(searchTerm) ||
      seat.bus.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = selectedRole === "Todas" || seat.estado === selectedRole;
    const categoryMatch =
      selectedCategory === "Todas" || seat.categoria === selectedCategory;
    return searchMatch && roleMatch && categoryMatch;
  });

  const handleAddSeatLayout = () => {
    setIsAdding(true);
    setEditingSeat(null); // Asegúrate de que no se esté editando nada
  };

  const handleEditSeatLayout = (seat: Seat) => {
    setEditingSeat(seat); // Configura el asiento a editar
    setIsAdding(false); // Asegúrate de que no esté en modo agregar
  };

  const handleViewSeat = (seat: Seat) => {
    setViewingSeat(seat); // Configura el asiento a ver
  };

  const handleSaveLayout = (updatedLayout: any) => {
    console.log("Layout actualizado:", updatedLayout);
    setIsAdding(false);
    setEditingSeat(null);
    // Aquí puedes actualizar los datos en `seats` si es necesario.
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Preloader */}
      <Preloader />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
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
                onSave={handleSaveLayout}
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
              onAddUserClick={handleAddSeatLayout}
            />

            {/* Tabla de Asientos */}
            <SeatTable
              seats={filteredSeats}
              onEditSeat={handleEditSeatLayout}
              onViewSeat={handleViewSeat} // Nuevo callback para ver asientos
            />
          </main>
        )}
      </div>
    </div>
  );
};

export default Asiento;
