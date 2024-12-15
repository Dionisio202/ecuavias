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
        <h3 className="text-lg font-semibold mb-2 text-gray-700">BUS</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-white border-b-2 border-[#ffffff] pb-2">
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium"># Bus</span>
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium">Bus</span>
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium">Cooperativa</span>
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium">Placa</span>
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium">Chofer</span>
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium">Ruta</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-2 text-center">
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
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Datos del comprador</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-white border-b-2 border-[#ffffff] pb-2">
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium">Cedula</span>
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium">Nombre</span>
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium">Apellido</span>
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium">Edad</span>
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium">Genero</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-2 text-center">
          <span>{buyerDetails.cedula}</span>
          <span>{buyerDetails.nombre}</span>
          <span>{buyerDetails.apellido}</span>
          <span>{buyerDetails.edad}</span>
          <span>{buyerDetails.genero}</span>
        </div>
      </div>

      {/* Sección de Asientos */}
      <div>
        <div className="border-t-2 border-[#3C4C8F] mb-2"></div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Asientos</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-white border-b-2 border-[#ffffff] pb-2">
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium"># Asiento</span>
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium">Tipo</span>
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium">Codigo</span>
          <span className="bg-[#3C4C8F] px-2 py-1 rounded-lg text-center font-medium">Valor</span>
        </div>
        {seatDetails.map((seat, index) => (
          <div
            key={index}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 text-center"
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
