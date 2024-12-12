import React, { useState } from "react";

interface BusEditorProps {
  initialBus?: Bus; // Datos iniciales del autobús a editar
  onSave: (updatedBus: Bus) => void; // Callback para guardar los cambios
  onClose: () => void; // Callback para cerrar el modal
}

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

const BusEditor: React.FC<BusEditorProps> = ({ initialBus, onSave, onClose }) => {
  const [bus, setBus] = useState<Bus>(
    initialBus || {
      numero: "",
      cooperativa: "",
      marca: "",
      modelo: "",
      nCoop: "",
      nRegistro: "",
      bModelo: "",
      chasis: "",
      totalAsientos: 0,
      asientosVIP: 0,
      asientosNormales: 0,
      estado: "Operando",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBus((prev) => ({
      ...prev,
      [name]: name === "totalAsientos" || name === "asientosVIP" || name === "asientosNormales"
        ? parseInt(value, 10) || 0
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(bus);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">{initialBus ? "Editar Autobús" : "Agregar Autobús"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Campos del formulario */}
            <input
              name="numero"
              value={bus.numero}
              onChange={handleChange}
              placeholder="Número"
              className="p-2 border rounded"
              required
            />
            <input
              name="cooperativa"
              value={bus.cooperativa}
              onChange={handleChange}
              placeholder="Cooperativa"
              className="p-2 border rounded"
              required
            />
            <input
              name="marca"
              value={bus.marca}
              onChange={handleChange}
              placeholder="Marca"
              className="p-2 border rounded"
              required
            />
            <input
              name="modelo"
              value={bus.modelo}
              onChange={handleChange}
              placeholder="Modelo"
              className="p-2 border rounded"
              required
            />
            <input
              name="nCoop"
              value={bus.nCoop}
              onChange={handleChange}
              placeholder="N. Coop"
              className="p-2 border rounded"
              required
            />
            <input
              name="nRegistro"
              value={bus.nRegistro}
              onChange={handleChange}
              placeholder="N. Registro"
              className="p-2 border rounded"
              required
            />
            <input
              name="bModelo"
              value={bus.bModelo}
              onChange={handleChange}
              placeholder="B. Modelo"
              className="p-2 border rounded"
              required
            />
            <input
              name="chasis"
              value={bus.chasis}
              onChange={handleChange}
              placeholder="Chasis"
              className="p-2 border rounded"
              required
            />
            <input
              name="totalAsientos"
              value={bus.totalAsientos}
              onChange={handleChange}
              type="number"
              placeholder="Total Asientos"
              className="p-2 border rounded"
              required
            />
            <input
              name="asientosVIP"
              value={bus.asientosVIP}
              onChange={handleChange}
              type="number"
              placeholder="Asientos VIP"
              className="p-2 border rounded"
              required
            />
            <input
              name="asientosNormales"
              value={bus.asientosNormales}
              onChange={handleChange}
              type="number"
              placeholder="Asientos Normales"
              className="p-2 border rounded"
              required
            />
            <select
              name="estado"
              value={bus.estado}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            >
              <option value="Operando">Operando</option>
              <option value="No operando">No operando</option>
            </select>
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusEditor;