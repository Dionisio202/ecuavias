import React, { useState } from "react";

interface Asiento {
  id: number;
  ocupado: boolean;
}

const SeleccionBoletos: React.FC = () => {
  const [asientos, setAsientos] = useState<Asiento[]>(
    Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      ocupado: i % 5 === 0, // Marcar algunos asientos como ocupados
    }))
  );
  const [asientosSeleccionados, setAsientosSeleccionados] = useState<number[]>([]);

  const toggleSeleccion = (id: number) => {
    if (asientosSeleccionados.includes(id)) {
      setAsientosSeleccionados(asientosSeleccionados.filter((asiento) => asiento !== id));
    } else {
      setAsientosSeleccionados([...asientosSeleccionados, id]);
    }
  };

  const confirmarReserva = () => {
    alert(`Reservaste los asientos: ${asientosSeleccionados.join(", ")}`);
    // Aquí podrías agregar la lógica para enviar la reserva al backend
    setAsientosSeleccionados([]);
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h1 className="text-xl font-bold mb-4">Selecciona tus Asientos</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {asientos.map((asiento) => (
          <button
            key={asiento.id}
            disabled={asiento.ocupado}
            onClick={() => toggleSeleccion(asiento.id)}
            className={`w-16 h-16 rounded-lg ${
              asiento.ocupado
                ? "bg-red-500 cursor-not-allowed"
                : asientosSeleccionados.includes(asiento.id)
                ? "bg-green-500"
                : "bg-gray-700"
            }`}
          >
            {asiento.id}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
          Seleccionado
          <span className="inline-block w-4 h-4 bg-red-500 rounded-full ml-4 mr-2"></span>
          Ocupado
          <span className="inline-block w-4 h-4 bg-gray-700 rounded-full ml-4 mr-2"></span>
          Disponible
        </div>
        <button
          onClick={confirmarReserva}
          disabled={asientosSeleccionados.length === 0}
          className={`px-4 py-2 rounded-lg ${
            asientosSeleccionados.length > 0
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Confirmar Reserva
        </button>
      </div>
    </div>
  );
};

export default SeleccionBoletos;
