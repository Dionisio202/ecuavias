import React, { useState } from "react";
import Sidebar from "../shared/SideBar";

interface Ruta {
  id: number;
  nombre: string;
}

interface Bus {
  id: number;
  nombre: string;
}

interface Asiento {
  id: number;
  ocupado: boolean;
}

const ReservaBoletos: React.FC = () => {
  const rutas: Ruta[] = [
    { id: 1, nombre: "Ambato-Quito" },
    { id: 2, nombre: "Quito-Guayaquil" },
  ];

  const buses: Bus[] = [
    { id: 1, nombre: "Bus 1" },
    { id: 2, nombre: "Bus 2" },
  ];

  const [asientos] = useState<Asiento[]>(
    Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      ocupado: i % 5 === 0, // Simular algunos asientos ocupados
    }))
  );

  const [rutaSeleccionada, setRutaSeleccionada] = useState<number | null>(null);
  const [busSeleccionado, setBusSeleccionado] = useState<number | null>(null);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState<number[]>([]);
  const [, setPagoCompletado] = useState(false);

  const toggleSeleccionAsiento = (id: number) => {
    if (asientosSeleccionados.includes(id)) {
      setAsientosSeleccionados(asientosSeleccionados.filter((asiento) => asiento !== id));
    } else {
      setAsientosSeleccionados([...asientosSeleccionados, id]);
    }
  };

  const confirmarPago = () => {
    alert("Pago confirmado. Redirigiendo a la lista de boletos...");
    setPagoCompletado(true);
    // Simular redirección
    setTimeout(() => {
      window.location.href = "/GestionBoletos"; // Cambia esta ruta si es necesario
    }, 2000);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen} // Pasamos el estado al Sidebar
        setIsSidebarOpen={setIsSidebarOpen} // Función para actualizar el estado
      />

      {/* Contenido principal */}
      <div className="ml-1 flex-1 p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Reservar Boletos</h1>

        {/* Selección de Rutas */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Selecciona una Ruta</label>
          <select
            value={rutaSeleccionada || ""}
            onChange={(e) => setRutaSeleccionada(Number(e.target.value))}
            className="w-full bg-black text-white rounded-full px-4 py-2"
          >
            <option value="" disabled>
              -- Selecciona una Ruta --
            </option>
            {rutas.map((ruta) => (
              <option key={ruta.id} value={ruta.id}>
                {ruta.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de Buses */}
        {rutaSeleccionada && (
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Selecciona un Bus</label>
            <select
              value={busSeleccionado || ""}
              onChange={(e) => setBusSeleccionado(Number(e.target.value))}
              className="w-full bg-black text-white rounded-full px-4 py-2"
            >
              <option value="" disabled>
                -- Selecciona un Bus --
              </option>
              {buses.map((bus) => (
                <option key={bus.id} value={bus.id}>
                  {bus.nombre}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Selección de Asientos */}
        {busSeleccionado && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Selecciona tus Asientos</h2>
            <div className="grid grid-cols-4 gap-4">
              {asientos.map((asiento) => (
                <button
                  key={asiento.id}
                  disabled={asiento.ocupado}
                  onClick={() => toggleSeleccionAsiento(asiento.id)}
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
          </div>
        )}

        {/* Confirmación de Pago */}
        {asientosSeleccionados.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Confirmar Pago</h2>
            <button
              onClick={confirmarPago}
              className="px-4 py-2 bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Confirmar y Pagar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservaBoletos;
