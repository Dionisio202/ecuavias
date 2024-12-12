import React, { useState } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { estado: string; numeroBus: string; ruta: string; fechaReserva: string }) => void;
  initialData: { estado: string; numeroBus: string; ruta: string; fechaReserva: string };
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [estado, setEstado] = useState(initialData.estado);
  const [numeroBus, setNumeroBus] = useState(initialData.numeroBus);
  const [ruta, setRuta] = useState(initialData.ruta);
  const [fechaReserva, setFechaReserva] = useState(initialData.fechaReserva);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ estado, numeroBus, ruta, fechaReserva });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Editar Reservación</h2>

        <label className="block mb-2">
          Estado:
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Pagada">Pagada</option>
            <option value="Cancelada">Cancelada</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </label>

        <label className="block mb-2">
          Número de Bus:
          <input
            type="text"
            value={numeroBus}
            onChange={(e) => setNumeroBus(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </label>

        <label className="block mb-2">
          Ruta:
          <input
            type="text"
            value={ruta}
            onChange={(e) => setRuta(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </label>

        <label className="block mb-4">
          Fecha de Reserva:
          <input
            type="date"
            value={fechaReserva}
            onChange={(e) => setFechaReserva(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </label>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
