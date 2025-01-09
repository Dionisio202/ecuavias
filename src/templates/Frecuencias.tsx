import React, { useState } from "react";
import Sidebar from "../shared/SideBar";
import Preloader from "../shared/Preloaded";
import HeaderAndFilters from "../shared/HeeaderFrecuencias"; // Header and filters specific for frequencies
import DynamicTable from "../shared/DynamicTable";
import FrequencyEditor from "../shared/FrecuenciasEditor"; // Component for adding/editing frequency
import Header from "../shared/Header";

interface Frequency {
  id?: number;
  nombre: string;
  costo: number;
  paradas: string[];
  estado: string;
}

const GestionFrecuencias: React.FC = () => {
  const [frequencies, setFrequencies] = useState<Frequency[]>([
    {
      id: 1,
      nombre: "Ambato - Quito",
      costo: 40,
      paradas: ["Ambato", "Latacunga", "Quito"],
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "Ambato - Riobamba",
      costo: 20,
      paradas: ["Ambato", "Latacunga", "Riobamba"],
      estado: "Inactivo",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("Todos");
  const [editingFrequency, setEditingFrequency] = useState<Frequency | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredFrequencies = frequencies.filter((frequency) => {
    const searchMatch = frequency.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const estadoMatch =
      selectedEstado === "Todos" || frequency.estado === selectedEstado;
    return searchMatch && estadoMatch;
  });

  const handleAddFrequency = () => {
    setEditingFrequency(null);
    setIsModalOpen(true);
  };

  const handleEditFrequency = (frequency: Frequency) => {
    setEditingFrequency(frequency);
    setIsModalOpen(true);
  };

  const handleSaveFrequency = (updatedFrequency: Frequency) => {
    if (updatedFrequency.id) {
      setFrequencies((prev) =>
        prev.map((frequency) =>
          frequency.id === updatedFrequency.id ? updatedFrequency : frequency
        )
      );
    } else {
      setFrequencies((prev) => [
        ...prev,
        { ...updatedFrequency, id: prev.length + 1 },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteFrequency = (selectedIds: number[]) => {
    setFrequencies((prev) => prev.filter((frequency) => !selectedIds.includes(frequency.id!)));
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const headers = ["Nombre", "Salida", "Destino", "Estado", "Valor"];

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
          <FrequencyEditor
            initialFrecuencia={editingFrequency || undefined}
            onSave={handleSaveFrequency}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        <main className="p-6 bg-gray-100 min-h-screen">
          <HeaderAndFilters
            title="Frecuencias"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedEstado={selectedEstado}
            setSelectedEstado={setSelectedEstado}
            onAddFrequencyClick={handleAddFrequency}
          />

          <DynamicTable
            headers={headers}
            tableTitle="Resumen de Frecuencias"
            data={filteredFrequencies}
            keyExtractor={(frequency) => frequency.id!}
            renderRow={(frequency) => [
              <td key="nombre">{frequency.nombre}</td>,
              <td key="salida">{frequency.paradas[0]}</td>,
              <td key="destino">{frequency.paradas[frequency.paradas.length - 1]}</td>,
              <td key="estado">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    frequency.estado === "Activo"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {frequency.estado}
                </span>
              </td>,
              <td key="valor">${frequency.costo}</td>,
            ]}
            onEditRow={handleEditFrequency}
            onDeleteSelected={handleDeleteFrequency}
          />
        </main>
      </div>
    </div>
  );
};

export default GestionFrecuencias;