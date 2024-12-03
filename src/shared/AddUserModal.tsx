import React, { useState, useEffect } from "react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: any) => void;
  userToEdit?: any; // Usuario que se va a editar (opcional)
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  userToEdit,
}) => {
  const [formData, setFormData] = useState({
    tipoDocumento: "",
    numeroDocumento: "",
    nombre: "",
    segundoNombre: "",
    apellido: "",
    segundoApellido: "",
    fechaNacimiento: "",
    telefono: "",
    email: "",
    rol: "Usuario",
    estado: "Activo",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Función para calcular edad a partir de la fecha de nacimiento
  const calculateAge = (fecha: string): number => {
    const today = new Date();
    const birthDate = new Date(fecha);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Función para convertir fechas al formato compatible con el input date
  const formatFechaNacimiento = (fecha: string): string => {
    if (!fecha.includes("/")) return fecha; // Si ya está en formato YYYY-MM-DD
    const [day, month, year] = fecha.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.tipoDocumento) {
      newErrors.tipoDocumento = "Debe seleccionar un tipo de documento.";
    }
    if (!formData.numeroDocumento) {
      newErrors.numeroDocumento = "Debe ingresar un número de documento.";
    } else if (
      formData.tipoDocumento === "Cédula" &&
      !/^\d{10}$/.test(formData.numeroDocumento)
    ) {
      newErrors.numeroDocumento = "La cédula debe tener 10 dígitos.";
    } else if (
      formData.tipoDocumento === "Pasaporte" &&
      !/^[A-Za-z0-9]{6,9}$/.test(formData.numeroDocumento)
    ) {
      newErrors.numeroDocumento =
        "El pasaporte debe tener entre 6 y 9 caracteres alfanuméricos.";
    }

    if (!formData.telefono) {
      newErrors.telefono = "Debe ingresar un número de teléfono.";
    } else if (!/^\d{10}$/.test(formData.telefono)) {
      newErrors.telefono = "El número de teléfono debe tener 10 dígitos.";
    }

    if (!formData.email) {
      newErrors.email = "Debe ingresar un correo electrónico.";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(formData.email)
    ) {
      newErrors.email = "Debe ingresar un correo electrónico válido.";
    }

    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = "Debe ingresar una fecha de nacimiento.";
    } else if (calculateAge(formData.fechaNacimiento) < 10) {
      newErrors.fechaNacimiento = "El usuario debe tener al menos 10 años.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Limpia errores del campo
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      onSave(formData);
      onClose();
    }
  };

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        ...userToEdit,
        fechaNacimiento: formatFechaNacimiento(userToEdit.fechaNacimiento || ""),
      });
    } else {
      setFormData({
        tipoDocumento: "",
        numeroDocumento: "",
        nombre: "",
        segundoNombre: "",
        apellido: "",
        segundoApellido: "",
        fechaNacimiento: "",
        telefono: "",
        email: "",
        rol: "Usuario",
        estado: "Activo",
      });
    }
    setErrors({}); // Limpia todos los errores al abrir el modal
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-2xl shadow-lg mx-4">
        <h2 className="text-lg font-bold mb-6 text-center">
          {userToEdit ? "Editar Usuario" : "Agregar Usuario"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Personal */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="text-sm font-medium text-gray-700 px-2">Información Personal</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
                <select
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="Cédula">Cédula</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
                {errors.tipoDocumento && <p className="text-red-600 text-sm">{errors.tipoDocumento}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Número de Documento</label>
                <input
                  type="text"
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {errors.numeroDocumento && <p className="text-red-600 text-sm">{errors.numeroDocumento}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Segundo Nombre</label>
                <input
                  type="text"
                  name="segundoNombre"
                  value={formData.segundoNombre}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Segundo Apellido</label>
                <input
                  type="text"
                  name="segundoApellido"
                  value={formData.segundoApellido}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {errors.fechaNacimiento && <p className="text-red-600 text-sm">{errors.fechaNacimiento}</p>}
              </div>
            </div>
          </fieldset>
          {/* Información de Contacto */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="text-sm font-medium text-gray-700 px-2">Información de Contacto</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.telefono && <p className="text-red-600 text-sm">{errors.telefono}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
              </div>
            </div>
          </fieldset>
          {/* Detalles del Usuario */}
          <fieldset className="border p-4 rounded-lg">
            <legend className="text-sm font-medium text-gray-700 px-2">Detalles del Usuario</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Rol</label>
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="Usuario">Usuario</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Activo">Activo</option>
                  <option value="No Activo">No Activo</option>
                </select>
              </div>
            </div>
          </fieldset>
          {/* Botones */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700"
            >
              {userToEdit ? "Editar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
