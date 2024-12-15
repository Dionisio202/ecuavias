import React, { useState } from "react";
import Header from "../shared/Header";
import Sidebar from "../shared/SideBar";
import Preloader from "../shared/Preloaded";
import PaymentMethod from "../shared/PaymentMethodHeader"; // Nuevo componente de Pagos
const Pagos: React.FC = () => {
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
          {/* Contenido del componente PaymentMethod */}
          <PaymentMethod />
        </main>
      </div>
    </div>
  );
};

export default Pagos;
