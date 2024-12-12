import React, { useState } from "react";

interface Stop {
  nombre: string;
  estado: string; // Activo o Inactivo
}

interface StopEditorProps {
  initialStop?: Stop;
  onSave: (updatedStop: Stop) => void;
  onClose: () => void;
}

const StopEditor: React.FC<StopEditorProps> = ({
  initialStop,
  onSave,
  onClose,
}) => {
  const [stop, setStop] = useState<Stop>(
    initialStop || {
      nombre: "",
      estado: "Activo", // Valor por defecto
    }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStop((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(stop);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          {initialStop ? "Editar Parada" : "Añadir Parada"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              name="nombre"
              value={stop.nombre}
              onChange={handleInputChange}
              placeholder="Nombre de la parada"
              className="p-2 border rounded w-full"
              required
            />
            <select
              name="estado"
              value={stop.estado}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              required
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
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

export default StopEditor;