import React, { useState } from "react";
import logo from "../assets/logo-ecuavias.png"; // Logo de la empresa
import lockImage from "../assets/lock-image.png"; // Imagen ilustrativa de la contraseña (ajusta la ruta)

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación básica para el correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, introduce un correo válido.");
      return;
    }

    setError(""); // Limpia el error si el correo es válido
    console.log("Correo enviado a:", email);
    // Aquí puedes realizar el envío del correo al backend
  };

  return (
    <div className="h-screen flex">
      {/* Sección izquierda */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start px-8 lg:px-24 bg-gray-100">
        {/* Logo */}
        <div className="mb-6">
          <img src={logo} alt="Ecuavías" className="h-16" />
        </div>

        {/* Volver al inicio */}
        <a
          href="/"
          className="text-sm text-gray-500 hover:text-gray-800 flex items-center mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Regresar al Inicio
        </a>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ¿Olvidaste tu contraseña?
        </h2>
        <p className="text-sm text-gray-600 mb-8">
          No te preocupes, ingresa tu correo electrónico para recuperar tu
          contraseña.
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="solisediso@outlook.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring focus:ring-primary focus:outline-none ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          {/* Botón Enviar */}
          <div className="flex justify-start">
            <button
              type="submit"
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      {/* Sección derecha */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 items-center justify-center">
        <img src={lockImage} alt="Recuperar contraseña" className="max-w-sm" />
      </div>
    </div>
  );
};

export default ForgotPassword;
