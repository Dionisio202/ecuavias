import React, { useState } from "react";
import Sidebar from "../shared/SideBar";

interface Boleto {
  id: number;
  documento: string;
  usuario: string;
  cooperativa: string;
  ruta: string;
  numeroBus: number;
  fecha: string;
  estado: string;
}

const BoletosPage: React.FC = () => {
  // Datos originales de los boletos
  const originalBoletos: Boleto[] = [
    {
      id: 1,
      documento: "1805273396",
      usuario: "Juan Pérez",
      cooperativa: "Cooperativa A",
      ruta: "Ambato-Quito",
      numeroBus: 21,
      fecha: "2023-04-02",
      estado: "Disponible",
    },
    {
      id: 2,
      documento: "1805273397",
      usuario: "María López",
      cooperativa: "Cooperativa B",
      ruta: "Quito-Guayaquil",
      numeroBus: 15,
      fecha: "2023-05-10",
      estado: "Reservado",
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCooperative, setSelectedCooperative] = useState<string>("Todas");
  const [boletos, setBoletos] = useState<Boleto[]>(originalBoletos);

  const handleSearchClick = () => {
    if (searchTerm.trim() === "" && selectedCooperative === "Todas") {
      // Si el campo de búsqueda está vacío y no hay filtros, cargar todos los boletos originales
      setBoletos(originalBoletos);
    } else {
      // Filtrar boletos por términos de búsqueda y cooperativa seleccionada
      const filteredBoletos = originalBoletos.filter(
        (boleto) =>
          (searchTerm === "" || boleto.usuario.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (selectedCooperative === "Todas" || boleto.cooperativa === selectedCooperative)
      );
      setBoletos(filteredBoletos);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="ml-1 flex-1 p-6">
        {/* Header del usuario */}
        <div className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-lg mb-4">
          <h1 className="text-xl font-bold">Ecuavías</h1>
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => alert("Abrir menú del perfil")}
            >
              <img
                src="https://via.placeholder.com/40" // Reemplaza con la URL real del avatar
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="text-right">
                <p className="font-bold">Edison Ortiz</p>
                <p className="text-sm text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-2xl font-bold text-white mb-4">Gestión de Boletos</h1>

        {/* Header de filtros */}
        <div className="bg-gray-900 p-4 rounded-lg mb-4">
  <div className="grid grid-cols-3 gap-4 items-center">
    {/* Campo de búsqueda */}
    <div>
      <label className="block text-sm text-gray-400 mb-1">¿Qué estás buscando?</label>
      <input
        type="text"
        placeholder="Buscar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-4 pr-4 py-2 bg-black text-white placeholder-gray-400 rounded-full focus:outline-none"
      />
    </div>

    {/* Selector de cooperativa */}
    <div>
      <label className="block text-sm text-gray-400 mb-1">Cooperativa</label>
      <select
        value={selectedCooperative}
        onChange={(e) => setSelectedCooperative(e.target.value)}
        className="w-full appearance-none bg-black text-white rounded-full px-4 py-2 focus:outline-none"
      >
        <option value="Todas">Todas</option>
        <option value="Cooperativa A">Cooperativa A</option>
        <option value="Cooperativa B">Cooperativa B</option>
        <option value="Cooperativa C">Cooperativa C</option>
      </select>
    </div>

    {/* Botón de búsqueda */}
    <div className="flex items-end">
      <button
        onClick={handleSearchClick}
        className="w-32 px-4 py-2 bg-blue-500 rounded-full hover:bg-blue-600"
      >
        Buscar
      </button>
    </div>
  </div>
</div>


        {/* Tabla de boletos */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Boletos</h2>
          <table className="table-auto w-full text-white border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-2 text-left">Documento</th>
                <th className="px-4 py-2 text-left">Usuario</th>
                <th className="px-4 py-2 text-left">Cooperativa</th>
                <th className="px-4 py-2 text-left">Ruta</th>
                <th className="px-4 py-2 text-left">Número de Bus</th>
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {boletos.map((boleto) => (
                <tr key={boleto.id} className="hover:bg-gray-800">
                  <td className="px-4 py-2">{boleto.documento}</td>
                  <td className="px-4 py-2">{boleto.usuario}</td>
                  <td className="px-4 py-2">{boleto.cooperativa}</td>
                  <td className="px-4 py-2">{boleto.ruta}</td>
                  <td className="px-4 py-2">{boleto.numeroBus}</td>
                  <td className="px-4 py-2">{boleto.fecha}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        boleto.estado === "Disponible"
                          ? "bg-green-500 text-black"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {boleto.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BoletosPage;
