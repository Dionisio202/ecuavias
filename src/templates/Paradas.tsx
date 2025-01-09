import React, { useState } from "react";
import Sidebar from "../shared/SideBar";
import Preloader from "../shared/Preloaded";
import HeaderAndFilters from "../shared/HeaderParadas";// Header and filters specific for stops
import DynamicTable from "../shared/DynamicTable";
import StopEditor from "../shared/ParadasEditor";// Component for adding/editing stops
import Header from "../shared/Header";

interface Stop {
  id?: number;
  nombre: string;
  estado: string; // Activo o Inactivo
}

const GestionParadas: React.FC = () => {
  const [stops, setStops] = useState<Stop[]>([
    {
      id: 1,
      nombre: "Terminal Norte",
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "Terminal Sur",
      estado: "Inactivo",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("Todos");
  const [editingStop, setEditingStop] = useState<Stop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStops = stops.filter((stop) => {
    const searchMatch = stop.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const estadoMatch = selectedEstado === "Todos" || stop.estado === selectedEstado;
    return searchMatch && estadoMatch;
  });

  const handleAddStop = () => {
    setEditingStop(null);
    setIsModalOpen(true);
  };

  const handleEditStop = (stop: Stop) => {
    setEditingStop(stop);
    setIsModalOpen(true);
  };

  const handleSaveStop = (updatedStop: Stop) => {
    if (updatedStop.id) {
      setStops((prev) =>
        prev.map((stop) => (stop.id === updatedStop.id ? updatedStop : stop))
      );
    } else {
      setStops((prev) => [...prev, { ...updatedStop, id: prev.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteStop = (selectedIds: number[]) => {
    setStops((prev) => prev.filter((stop) => !selectedIds.includes(stop.id!)));
  };

  const headers = ["Nombre", "Estado"];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Preloader />
      <Sidebar
        isSidebarOpen={isSidebarOpen} // Pasamos el estado al Sidebar
        setIsSidebarOpen={setIsSidebarOpen} // Función para actualizar el estado
      />

      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle del Sidebar
        />
        {isModalOpen && (
          <StopEditor
            initialStop={editingStop || undefined}
            onSave={handleSaveStop}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        <main className="p-6 bg-gray-100 min-h-screen">
          <HeaderAndFilters
            title="Paradas"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedEstado={selectedEstado}
            setSelectedEstado={setSelectedEstado}
            onAddStopClick={handleAddStop}
          />

          <DynamicTable
            headers={headers}
            tableTitle="Resumen de Paradas"
            data={filteredStops}
            keyExtractor={(stop) => stop.id!}
            renderRow={(stop) => [
              <td key="nombre">{stop.nombre}</td>,
              <td key="estado">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    stop.estado === "Activo"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {stop.estado}
                </span>
              </td>
            ]}
            onEditRow={handleEditStop}
            onDeleteSelected={handleDeleteStop}
          />
        </main>
      </div>
    </div>
  );
};

export default GestionParadas;