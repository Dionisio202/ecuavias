import React, { useState } from "react";
import Sidebar from "../shared/SideBar";
import Preloader from "../shared/Preloaded";
import PaymentMethod from "../shared/PaymentMethodHeader"; // Nuevo componente de Pagos

const Pagos: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false); // Para agregar un nuevo layout
  const [editingSeat, setEditingSeat] = useState(null); // Para editar un layout existente
  const [viewingSeat, setViewingSeat] = useState(null); // Para ver un layout existente

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Preloader */}
      <Preloader />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Modals para agregar, editar o visualizar layouts */}
        {isAdding && (
          <div className="fixed inset-0 bg-white z-50 overflow-auto">
            <button
              onClick={() => setIsAdding(false)}
              className="absolute top-8 right-8 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
            >
              Cerrar
            </button>
            <div className="p-8">
              {/* Puedes añadir cualquier contenido aquí si fuera necesario */}
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="p-6 bg-gray-100 min-h-screen">
          {/* Componente de Pago */}
          <PaymentMethod />
        </main>
      </div>
    </div>
  );
};

export default Pagos;
