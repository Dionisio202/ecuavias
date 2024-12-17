import React from "react";

// Definición de Interfaces
interface BusDetails {
  busNumber: string;
  bus: string;
  cooperative: string;
  plate: string;
  driver: string;
  route: string;
}

interface BuyerDetails {
  cedula: string;
  nombre: string;
  apellido: string;
  edad: number;
  genero: string;
}

interface SeatDetails {
  seat: string;
  type: string;
  code: string;
  value: string;
}

// Props para el Componente
interface PurchaseDetailsProps {
  busDetails: BusDetails;
  buyerDetails: BuyerDetails;
  seatDetails: SeatDetails[];
}

const PurchaseDetails: React.FC<PurchaseDetailsProps> = ({
  busDetails,
  buyerDetails,
  seatDetails,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-gray-50 p-6 md:p-8 rounded-lg shadow-md">
      {/* Encabezado */}
      <h2 className="text-center text-2xl font-semibold mb-6 text-gray-700">
        Detalles de la compra
      </h2>

     {/* Sección de BUS */}
<div className="mb-8">
  <div className="border-t-2 border-[#3C4C8F] mb-2"></div>
  <h3 className="text-lg font-semibold mb-4 text-gray-700">BUS</h3>
  
  {/* Encabezados */}
  <div className="grid grid-cols-6 gap-2 text-center font-medium text-sm text-white">
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md"># Bus</span>
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md">Bus</span>
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md">Cooperativa</span>
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md">Placa</span>
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md">Chofer</span>
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md">Ruta</span>
  </div>
  
  {/* Datos dinámicos */}
  <div className="grid grid-cols-6 gap-2 mt-2 text-center text-gray-700 text-sm">
    <span>{busDetails.busNumber}</span>
    <span>{busDetails.bus}</span>
    <span>{busDetails.cooperative}</span>
    <span>{busDetails.plate}</span>
    <span>{busDetails.driver}</span>
    <span>{busDetails.route}</span>
  </div>
</div>


      {/* Sección Datos del Comprador */}
<div className="mb-8">
  <div className="border-t-2 border-[#3C4C8F] mb-2"></div>
  <h3 className="text-lg font-semibold mb-4 text-gray-700">Datos del comprador</h3>

  {/* Encabezados */}
  <div className="grid grid-cols-5 gap-2 text-center font-medium text-sm text-white">
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md">Cédula</span>
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md">Nombre</span>
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md">Apellido</span>
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md">Edad</span>
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md">Género</span>
  </div>

  {/* Datos dinámicos */}
  <div className="grid grid-cols-5 gap-2 mt-2 text-center text-gray-700 text-sm">
    <span>{buyerDetails.cedula}</span>
    <span>{buyerDetails.nombre}</span>
    <span>{buyerDetails.apellido}</span>
    <span>{buyerDetails.edad}</span>
    <span>{buyerDetails.genero}</span>
  </div>
</div>

     {/* Sección de Asientos */}
<div className="mb-8">
  <div className="border-t-2 border-[#3C4C8F] mb-2"></div>
  <h3 className="text-lg font-semibold mb-4 text-gray-700">Asientos</h3>

  {/* Encabezados */}
  <div className="grid grid-cols-4 gap-2 text-center font-medium text-sm text-white">
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md"># Asiento</span>
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md">Tipo</span>
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md">Código</span>
    <span className="bg-[#3C4C8F] px-1 py-1 rounded-md">Valor</span>
  </div>

  {/* Datos dinámicos */}
  {seatDetails.map((seat, index) => (
    <div
      key={index}
      className="grid grid-cols-4 gap-2 mt-2 text-center text-gray-700 text-sm"
    >
      <span>{seat.seat}</span>
      <span>{seat.type}</span>
      <span>{seat.code}</span>
      <span>{seat.value}</span>
    </div>
  ))}
</div>

    </div>
  );
};

export default PurchaseDetails;
