import React, { useState } from "react";

interface Frecuencia {
  nombre: string;
  costo: number;
  paradas: string[];
  estado: string; // Añadir esta propiedad
}

interface FrecuenciasEditorProps {
  initialFrecuencia?: Frecuencia;
  onSave: (updatedFrecuencia: Frecuencia) => void;
  onClose: () => void;
}

const FrecuenciasEditor: React.FC<FrecuenciasEditorProps> = ({
  initialFrecuencia,
  onSave,
  onClose,
}) => {
  const [frecuencia, setFrecuencia] = useState<Frecuencia>(
    initialFrecuencia || {
      nombre: "",
      costo: 0,
      paradas: [""],
      estado: "Activo", // Valor por defecto
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFrecuencia((prev) => ({
      ...prev,
      [name]: name === "costo" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleParadaChange = (index: number, value: string) => {
    const updatedParadas = [...frecuencia.paradas];
    updatedParadas[index] = value;
    setFrecuencia((prev) => ({ ...prev, paradas: updatedParadas }));
  };

  const addParada = () => {
    setFrecuencia((prev) => ({ ...prev, paradas: [...prev.paradas, ""] }));
  };

  const removeParada = (index: number) => {
    const updatedParadas = frecuencia.paradas.filter((_, i) => i !== index);
    setFrecuencia((prev) => ({ ...prev, paradas: updatedParadas }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(frecuencia);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          {initialFrecuencia ? "Editar Frecuencia" : "Añadir Frecuencia"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              name="nombre"
              value={frecuencia.nombre}
              onChange={handleInputChange}
              placeholder="Nombre"
              className="p-2 border rounded w-full"
              required
            />
            <div className="relative">
              <input
                name="costo"
                value={frecuencia.costo}
                onChange={handleInputChange}
                type="number"
                placeholder="Costo"
                className="p-2 border rounded w-full"
                required
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                $
              </span>
            </div>
            {/* Select para estado */}
            <select
              name="estado"
              value={frecuencia.estado}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              required
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          {frecuencia.paradas.map((parada, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <input
                value={parada}
                onChange={(e) => handleParadaChange(index, e.target.value)}
                placeholder={`Parada ${index + 1}`}
                className="p-2 border rounded w-full"
                required
              />
              <button
                type="button"
                onClick={() => removeParada(index)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addParada}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded"
          >
            Añadir Parada ➕
          </button>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FrecuenciasEditor;