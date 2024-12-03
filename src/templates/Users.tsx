import React, { useState } from "react";
import HeaderAndFilters from "../shared/HeaderAndFilters";
import UserTable from "../shared/UserTable";
import AddUserModal from "../shared/AddUserModal"; // Importa el modal

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
      estado: "Activo",
    },
    {
        id: 2,
        tipoDocumento: "Pasaporte",
        numeroDocumento: "1805273396",
        nombre: "Jairo",
        segundoNombre: "Ismael",
        apellido: "Freire",
        segundoApellido: "Ortiz",
        fechaNacimiento: "12/02/2003",
        telefono: "0999309622",
        email: "jairofreireortiz10@gmail.com",
        rol: "Usuario",
        estado: "No Activo",
      },
    // Otros usuarios...
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [editingUser, setEditingUser] = useState<any>(null); // Estado para usuario en edición

  const handleAddUserClick = () => {
    setEditingUser(null); // Asegura que no hay usuario en edición
    setIsModalOpen(true); // Abre el modal
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user); // Establece el usuario que se está editando
    setIsModalOpen(true); // Abre el modal
  };

  const handleSaveUser = (newUser: any) => {
    if (editingUser) {
      // Actualiza un usuario existente
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === editingUser.id ? { ...newUser, id: user.id } : user))
      );
    } else {
      // Agrega un nuevo usuario
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...newUser, id: prevUsers.length + 1 },
      ]);
    }
    setIsModalOpen(false); // Cierra el modal
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
        onAddUserClick={handleAddUserClick}
      />

      {/* Tabla de usuarios */}
      <UserTable
        users={users}
        onDeleteSelected={() => console.log("Delete selected users")}
        onEditUser={handleEditUser} // Pasa la función de edición al UserTable
      />

      {/* Modal para agregar o editar usuario */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        userToEdit={editingUser} // Pasa el usuario en edición (si lo hay)
      />
    </div>
  );
};

export default Users;
