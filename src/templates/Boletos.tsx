import React, { useState } from "react";
import Sidebar from "../shared/SideBar";
import QRCode from "qrcode";

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
  const originalBoletos: Boleto[] = [
    {
      id: 1,
      documento: "1805273396",
      usuario: "Juan Pérez",
      cooperativa: "Cooperativa A",
      ruta: "Ambato-Quito",
      numeroBus: 21,
      fecha: "2023-04-02",
      estado: "Ok",
    },
    {
      id: 2,
      documento: "1805273397",
      usuario: "María López",
      cooperativa: "Cooperativa B",
      ruta: "Quito-Guayaquil",
      numeroBus: 15,
      fecha: "2023-05-10",
      estado: "Cancelado",
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCooperative, setSelectedCooperative] = useState<string>("Todas");
  const [boletos, setBoletos] = useState<Boleto[]>(originalBoletos);
  const [modalOpen, setModalOpen] = useState(false);
  const [boletoSeleccionado, setBoletoSeleccionado] = useState<Boleto | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const handleRowClick = async (boleto: Boleto) => {
    setBoletoSeleccionado(boleto);
    const qrData = JSON.stringify(boleto);
    const qrCodeDataUrl = await QRCode.toDataURL(qrData);
    setQrCodeUrl(qrCodeDataUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setBoletoSeleccionado(null);
    setQrCodeUrl("");
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() === "" && selectedCooperative === "Todas") {
      setBoletos(originalBoletos);
    } else {
      const filteredBoletos = originalBoletos.filter(
        (boleto) =>
          (searchTerm === "" || boleto.usuario.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (selectedCooperative === "Todas" || boleto.cooperativa === selectedCooperative)
      );
      setBoletos(filteredBoletos);
    }
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
    <Sidebar
        isSidebarOpen={isSidebarOpen} // Pasamos el estado al Sidebar
        setIsSidebarOpen={setIsSidebarOpen} // Función para actualizar el estado
      />
      <div className="ml-1 flex-1 p-6">
        <div className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-lg mb-4">
          <h1 className="text-xl font-bold">Ecuavías</h1>
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => alert("Abrir menú del perfil")}
            >
              <img
                src="https://via.placeholder.com/40"
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
        <h1 className="text-2xl font-bold text-white mb-4">Gestión de Boletos</h1>
        <div className="bg-gray-900 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-3 gap-4 items-center">
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
                <tr
                  key={boleto.id}
                  className="hover:bg-gray-800 cursor-pointer"
                  onClick={() => handleRowClick(boleto)}
                >
                  <td className="px-4 py-2">{boleto.documento}</td>
                  <td className="px-4 py-2">{boleto.usuario}</td>
                  <td className="px-4 py-2">{boleto.cooperativa}</td>
                  <td className="px-4 py-2">{boleto.ruta}</td>
                  <td className="px-4 py-2">{boleto.numeroBus}</td>
                  <td className="px-4 py-2">{boleto.fecha}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        boleto.estado === "Ok"
                          ? "bg-green-500 text-black"
                          : "bg-red-500 text-black"
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
        {modalOpen && boletoSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-gray-800 text-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">Información del Boleto</h2>
              <p>
                <strong>Documento:</strong> {boletoSeleccionado.documento}
              </p>
              <p>
                <strong>Nombre:</strong> {boletoSeleccionado.usuario}
              </p>
              <p>
                <strong>Cooperativa:</strong> {boletoSeleccionado.cooperativa}
              </p>
              <p>
                <strong>Ruta:</strong> {boletoSeleccionado.ruta}
              </p>
              <p>
                <strong>Bus:</strong> {boletoSeleccionado.numeroBus}
              </p>
              <p>
                <strong>Fecha:</strong> {boletoSeleccionado.fecha}
              </p>
              <p>
                <strong>Estado:</strong> {boletoSeleccionado.estado}
              </p>
              <div className="mt-4 flex justify-center">
                <img src={qrCodeUrl} alt="QR Code" />
              </div>
              <button
                onClick={closeModal}
                className="mt-6 w-full px-4 py-2 bg-blue-500 rounded-full hover:bg-blue-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoletosPage;
