import React, { useState } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import TrashIcon from "../assets/Trash.svg";
import ArrowBackIcon from "../assets/arrowback.svg";
import ArrowNextIcon from "../assets/nextarrow.svg";
import EditIcon from "../assets/edit.svg";
interface User {
  id: number;
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  segundoNombre: string;
  apellido: string;
  segundoApellido: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  rol: string;
  estado: string;
}

interface UserTableProps {
  users: User[];
  onDeleteSelected: () => void;
  onEditUser: (user: User) => void; // Nueva propiedad para manejar edición
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onDeleteSelected,
  onEditUser,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Lógica de paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleSelectUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const isUserSelected = (id: number) => selectedUsers.includes(id);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md">
      {/* Header de la tabla */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Resumen de Usuarios</h2>
        <div className="flex items-center gap-4">
          {/* Botón de eliminar */}
          <button
            onClick={onDeleteSelected}
            className={`flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 ${
              selectedUsers.length === 0 && "opacity-50 pointer-events-none"
            }`}
          >
            <img src={TrashIcon} alt="Delete" className="w-5 h-5" />
            Eliminar seleccionados
          </button>

          {/* Paginador */}
          <Pagination
            count={Math.ceil(users.length / usersPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                slots={{
                  previous: () => (
                    <span className="flex items-center gap-2">
                      <img src={ArrowBackIcon} alt="Previous" className="w-4 h-4" />
                      <span>Anterior</span>
                    </span>
                  ),
                  next: () => (
                    <span className="flex items-center gap-2">
                      <span>Siguiente</span>
                      <img src={ArrowNextIcon} alt="Next" className="w-4 h-4" />
                    </span>
                  ),
                }}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "12px",
                  },
                  borderRadius: "12px",
                }}
              />
            )}
          />
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="overflow-x-auto bg-white p-6 rounded-3xl shadow-md">
        <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-2">
          <thead className="text-white">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedUsers(
                      e.target.checked ? users.map((user) => user.id) : []
                    )
                  }
                  checked={selectedUsers.length === users.length && users.length > 0}
                />
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Tipo Documento
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Número Documento
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Nombre
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                S. Nombre
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Apellido
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                S. Apellido
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Fecha Nacimiento
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Teléfono
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Email
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Rol
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Estado
              </th>
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={isUserSelected(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
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
                <button
    onClick={() => onEditUser(user)} // Llama a la función de edición
    className="flex items-center justify-center w-8 h-8 bg-transparent hover:bg-gray-200 rounded-full"
  >
    <img src={EditIcon} alt="Edit" className="w-5 h-5" />
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

export default UserTable;
