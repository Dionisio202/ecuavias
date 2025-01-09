import React from "react";

interface Boleto {
  id: number;
  usuario: string;
  cooperativa: string;
  ruta: string;
  numeroBus: number;
}

const BoletosTable: React.FC = () => {
  const boletos: Boleto[] = [
    {
      id: 1,
      usuario: "Juan Pérez",
      cooperativa: "Cooperativa A",
      ruta: "Ambato-Quito",
      numeroBus: 21,
    },
    {
      id: 2,
      usuario: "María López",
      cooperativa: "Cooperativa B",
      ruta: "Quito-Guayaquil",
      numeroBus: 15,
    },
  ];

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h1 className="text-xl font-bold mb-4">Boletos</h1>
      <table className="table-auto w-full border-collapse border border-gray-700 text-sm">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-700 px-4 py-2">ID</th>
            <th className="border border-gray-700 px-4 py-2">Usuario</th>
            <th className="border border-gray-700 px-4 py-2">Cooperativa</th>
            <th className="border border-gray-700 px-4 py-2">Ruta</th>
            <th className="border border-gray-700 px-4 py-2">Bus</th>
          </tr>
        </thead>
        <tbody>
          {boletos.map((boleto) => (
            <tr key={boleto.id} className="hover:bg-gray-800">
              <td className="border border-gray-700 px-4 py-2">{boleto.id}</td>
              <td className="border border-gray-700 px-4 py-2">{boleto.usuario}</td>
              <td className="border border-gray-700 px-4 py-2">{boleto.cooperativa}</td>
              <td className="border border-gray-700 px-4 py-2">{boleto.ruta}</td>
              <td className="border border-gray-700 px-4 py-2">{boleto.numeroBus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
          Anterior
        </button>
        <span className="text-sm">1</span>
        <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default BoletosTable;
