import React, { useState } from "react";
import HeaderAndFilters from "../shared/HeaderAndFilters";
import UserTable from "../shared/UserTable";
import AddUserModal from "../shared/AddUserModal";
import Preloader from "../shared/Preloaded";
import Sidebar from "../shared/SideBar";
import Header from "../shared/Header";

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
      numeroDocumento: "A123456",
      nombre: "Mateo",
      segundoNombre: "Barona",
      apellido: "Freire",
      segundoApellido: "Solis",
      fechaNacimiento: "12/02/2003",
      telefono: "0999309622",
      email: "mateobarona@gmail.com",
      rol: "Usuario",
      estado: "No Activo",
    },
    // Otros usuarios...
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const filteredUsers = users.filter((user) => {
    const searchMatch =
      user.numeroDocumento.includes(searchTerm) ||
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = selectedRole === "Todas" || user.rol === selectedRole;
    return searchMatch && roleMatch;
  });

  const handleAddUserClick = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (newUser: any) => {
    if (editingUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? { ...newUser, id: user.id } : user
        )
      );
    } else {
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...newUser, id: prevUsers.length + 1 },
      ]);
    }
    setIsModalOpen(false);
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Preloader */}
      <Preloader />

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen} // Pasamos el estado al Sidebar
        setIsSidebarOpen={setIsSidebarOpen} // Función para actualizar el estado
      />

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle del Sidebar
        />


        {/* Main Content */}
        <main className="p-6 bg-gray-100 min-h-screen">
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
            users={filteredUsers}
            onDeleteSelected={() => console.log("Delete selected users")}
            onEditUser={handleEditUser}
          />

          {/* Modal para agregar o editar usuario */}
          <AddUserModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveUser}
            userToEdit={editingUser}
          />
        </main>
      </div>
    </div>
  );
};

export default Users;
