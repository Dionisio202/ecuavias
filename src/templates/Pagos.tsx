import React, { useState } from "react";
import Header from "../shared/Header";
import Sidebar from "../shared/SideBar";
import Preloader from "../shared/Preloaded";
import PaymentMethod from "../shared/PaymentMethodHeader"; // Componente de Pagos
import PurchaseDetails from "../shared/PurchaseDetails"; // Nuevo componente de Detalles de Compra
const busData = {
    busNumber: "21",
    bus: "22 Julio",
    cooperative: "Ambato",
    plate: "PPA-7040",
    driver: "Mateo Barona",
    route: "Ambato-Quito",
  };
  
  const buyerData = {
    cedula: "1805273396",
    nombre: "Jairo",
    apellido: "Freire",
    edad: 21,
    genero: "M",
  };
  
  const seatsData = [
    { seat: "5", type: "Normal", code: "E01", value: "$1.5" },
    { seat: "6", type: "Normal", code: "E02", value: "$1.5" },
    { seat: "9", type: "Normal", code: "E03", value: "$1.5" },
    { seat: "10", type: "Normal", code: "E04", value: "$1.5" },
  ];

const Pagos: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Preloader */}
      <Preloader />

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen} // Pasamos el estado al Sidebar
        setIsSidebarOpen={setIsSidebarOpen} // Función para actualizar el estado
      />

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle del Sidebar
        />

        {/* Main Content */}
        <main className="p-6 bg-gray-100 min-h-screen space-y-6 mb-8">
          {/* Contenido del componente PaymentMethod */}
          <PaymentMethod />

          {/* Contenido del componente PurchaseDetails */}
          <PurchaseDetails busDetails={busData} buyerDetails={buyerData} seatDetails={seatsData} />;
        </main>
      </div>
    </div>
  );
};

export default Pagos;
