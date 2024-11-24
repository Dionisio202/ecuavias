import React, { useState } from "react";
import logo from "../assets/logo-ecuavias.png";
import { Link } from "react-router-dom"; // Importa Link

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    documentType: "Cedula",
    documentNumber: "",
    birthDate: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: any = {};

    // Validación de nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor, introduce un correo válido.";
    }

    // Validación de contraseña
    if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    }

    // Confirmar contraseña
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    // Validación de documento
    if (!formData.documentNumber.trim()) {
      newErrors.documentNumber = "El número de documento es obligatorio.";
    }

    // Validación de fecha de nacimiento (mayor de 12 años)
    if (!formData.birthDate.trim()) {
      newErrors.birthDate = "La fecha de nacimiento es obligatoria.";
    } else {
      const today = new Date();
      const birthDate = new Date(formData.birthDate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 12) {
        newErrors.birthDate = "Debes tener al menos 12 años.";
      }
    }

    // Validación de número de celular (Ecuador)
    const phoneRegex = /^((09)|(5939))[0-9]{7}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "El número de celular debe ser válido en Ecuador.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Formulario válido:", formData);
      // Aquí puedes enviar los datos al backend
    }
  };

  return (
 <div
      className="min-h-screen flex items-start justify-center"
      style={{
        background: "linear-gradient(to bottom, #1e293b, #0f172a)", // Degradado oscuro
      }}
    >
<div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md m-6">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="Ecuavías" className="h-16" />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-center mb-4">Registro</h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className={`w-full mt-1 p-3 border rounded-lg ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              className={`w-full mt-1 p-3 border rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Contraseña */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              className={`w-full mt-1 p-3 border rounded-lg ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Confirmar Contraseña */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              className={`w-full mt-1 p-3 border rounded-lg ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Tipo de Documento */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg border-gray-300"
            >
              <option value="Cedula">Cédula</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>

          {/* Número de Documento */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Número de Documento</label>
            <input
              type="text"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              placeholder="Número de cédula o pasaporte"
              className={`w-full mt-1 p-3 border rounded-lg ${
                errors.documentNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.documentNumber && (
              <p className="text-sm text-red-500 mt-1">{errors.documentNumber}</p>
            )}
          </div>

          {/* Fecha de Nacimiento */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={`w-full mt-1 p-3 border rounded-lg ${
                errors.birthDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.birthDate && <p className="text-sm text-red-500 mt-1">{errors.birthDate}</p>}
          </div>

          {/* Número de Celular */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Número de Celular</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="09xxxxxxxx"
              className={`w-full mt-1 p-3 border rounded-lg ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Botón Registrarse */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Registrarse
            </button>
          </div>
        </form>

        {/* Volver al login */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link to="/" className="text-primary font-medium hover:underline">
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
