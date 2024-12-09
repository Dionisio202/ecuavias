import React from "react";

interface ViewSeatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  seats: any[];
}

const ViewSeatsModal: React.FC<ViewSeatsModalProps> = ({ isOpen, onClose, seats }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Lista de Asientos</h2>
        <ul className="space-y-2">
          {seats.map((seat) => (
            <li key={seat.id} className="border p-2 rounded">
              {seat.numero} - {seat.bus} - {seat.categoria}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-2 rounded w-full mt-4"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ViewSeatsModal;
