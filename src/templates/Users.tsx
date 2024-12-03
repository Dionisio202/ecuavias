import React, { useState } from "react";
import HeaderAndFilters from "../shared/HeaderAndFilters"; // Asegúrate de importar correctamente el componente

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("Todas");
  const [users, setUsers] = useState([
    {
      id: 1,
      tipoDocumento: "Cédula",
      numeroDocumento: "1805273396",
      nombre: "Jairo",
      segundoNombre: "Ismael",
      apellido: "Freire",
      segundoApellido: "Ortiz",
      fechaNacimiento: "04/02/2003",
      telefono: "0999309622",
      email: "jairofreireortiz10@gmail.com",
      rol: "Admin",
      observacion: "Admin",
      estado: "Activo",
    },
    {
      id: 2,
      tipoDocumento: "Cédula",
      numeroDocumento: "1805273396",
      nombre: "Jairo",
      segundoNombre: "Ismael",
      apellido: "Freire",
      segundoApellido: "Ortiz",
      fechaNacimiento: "04/02/2003",
      telefono: "0999309622",
      email: "jairofreireortiz10@gmail.com",
      rol: "Admin",
      observacion: "Admin",
      estado: "No Activo",
    },
    // Agrega más usuarios según sea necesario
  ]);

  const handleAddUser = () => {
    console.log("Agregar usuario clickeado");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header y Filtros */}
      <HeaderAndFilters
        title="Usuarios"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        onAddUserClick={handleAddUser}
      />

      {/* Tabla de usuarios */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Resumen de Usuarios
        </h2>
        <table className="w-full text-sm text-left text-gray-500 border">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">Tipo Documento</th>
              <th className="px-4 py-2">Número Documento</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">S. Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">S. Apellido</th>
              <th className="px-4 py-2">Fecha Nacimiento</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Observación</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-4 py-2">{user.tipoDocumento}</td>
                <td className="px-4 py-2">{user.numeroDocumento}</td>
                <td className="px-4 py-2">{user.nombre}</td>
                <td className="px-4 py-2">{user.segundoNombre}</td>
                <td className="px-4 py-2">{user.apellido}</td>
                <td className="px-4 py-2">{user.segundoApellido}</td>
                <td className="px-4 py-2">{user.fechaNacimiento}</td>
                <td className="px-4 py-2">{user.telefono}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.rol}</td>
                <td className="px-4 py-2">{user.observacion}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      user.estado === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.estado}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:underline">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
