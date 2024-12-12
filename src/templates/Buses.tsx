import React, { useState } from "react";
import Sidebar from "../shared/SideBar";
import Preloader from "../shared/Preloaded";
import HeaderAndFilters from "../shared/HeaderBuses"; // Encabezado y filtros específicos para buses
import DynamicTable from "../shared/DynamicTable";
import BusEditor from "../shared/BusEditor"; // Componente para agregar/editar un autobús
import Header from "../shared/Header";

interface Bus {
  id?: number;
  numero: string;
  cooperativa: string;
  marca: string;
  modelo: string;
  nCoop: string;
  nRegistro: string;
  bModelo: string;
  chasis: string;
  totalAsientos: number;
  asientosVIP: number;
  asientosNormales: number;
  estado: string;
}

const GestionBuses: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>([
    {
      id: 1,
      numero: "21",
      cooperativa: "Ambato",
      marca: "Hino",
      modelo: "AK83",
      nCoop: "29687",
      nRegistro: "00001",
      bModelo: "AK83",
      chasis: "VF9VBMCA4EHM12455",
      totalAsientos: 60,
      asientosVIP: 20,
      asientosNormales: 40,
      estado: "Operando",
    },
    {
      id: 2,
      numero: "22",
      cooperativa: "Quito",
      marca: "Hino",
      modelo: "AK90",
      nCoop: "29688",
      nRegistro: "00002",
      bModelo: "AK90",
      chasis: "VF9VBMCA4EHM12456",
      totalAsientos: 50,
      asientosVIP: 15,
      asientosNormales: 35,
      estado: "No operando",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedCooperative, setSelectedCooperative] = useState("Todas");
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBuses = buses.filter((bus) => {
    const searchMatch =
      bus.numero.includes(searchTerm) ||
      bus.cooperativa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.modelo.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch =
      selectedCategory === "Todas" || bus.estado === selectedCategory;
    const cooperativeMatch =
      selectedCooperative === "Todas" ||
      bus.cooperativa === selectedCooperative;
    return searchMatch && categoryMatch && cooperativeMatch;
  });

  const handleAddBus = () => {
    setEditingBus(null);
    setIsModalOpen(true);
  };

  const handleEditBus = (bus: Bus) => {
    setEditingBus(bus);
    setIsModalOpen(true);
  };

  const handleViewSeats = (bus: Bus) => {
    alert(`Ver asientos del bus ${bus.numero}`);
    // Aquí puedes integrar la funcionalidad de ver asientos.
  };

  const handleSaveBus = (updatedBus: Bus) => {
    if (updatedBus.id) {
      setBuses((prev) =>
        prev.map((bus) => (bus.id === updatedBus.id ? updatedBus : bus))
      );
    } else {
      setBuses((prev) => [...prev, { ...updatedBus, id: prev.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteBus = (selectedIds: number[]) => {
    setBuses((prev) => prev.filter((bus) => !selectedIds.includes(bus.id!)));
  };

  const headers = [
    "Número",
    "Cooperativa",
    "Marca",
    "Modelo",
    "N. Coop",
    "N. Registro",
    "B. Modelo",
    "Chasis",
    "T. Asientos",
    "Asientos VIP",
    "Asientos Normales",
    "Estado",
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Preloader />
      <Sidebar />

      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header />
        {isModalOpen && (
          <BusEditor
            initialBus={editingBus || undefined}
            onSave={handleSaveBus}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        <main className="p-6 bg-gray-100 min-h-screen">
          <HeaderAndFilters
            title="Buses"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCooperative={selectedCooperative}
            setSelectedCooperative={setSelectedCooperative}
            onAddBusClick={handleAddBus}
          />

          <DynamicTable
            headers={headers}
            tableTitle="Resumen de Buses"
            data={filteredBuses}
            keyExtractor={(bus) => bus.id!}
            renderRow={(bus) => [
              <td key="numero">{bus.numero}</td>,
              <td key="cooperativa">{bus.cooperativa}</td>,
              <td key="marca">{bus.marca}</td>,
              <td key="modelo">{bus.modelo}</td>,
              <td key="nCoop">{bus.nCoop}</td>,
              <td key="nRegistro">{bus.nRegistro}</td>,
              <td key="bModelo">{bus.bModelo}</td>,
              <td key="chasis">{bus.chasis}</td>,
              <td key="totalAsientos">{bus.totalAsientos}</td>,
              <td key="asientosVIP">{bus.asientosVIP}</td>,
              <td key="asientosNormales">{bus.asientosNormales}</td>,
              <td key="estado">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    bus.estado === "Operando"
                      ? "bg-green-100 text-green-800"
                      : bus.estado === "No operando"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {bus.estado}
                </span>
              </td>,
            ]}
            onEditRow={handleEditBus}
            onDeleteSelected={handleDeleteBus}
            onViewRow={handleViewSeats}
          />
        </main>
      </div>
    </div>
  );
};

export default GestionBuses;
