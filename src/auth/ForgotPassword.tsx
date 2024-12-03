import React, { useState } from "react";
import logo from "../assets/logo-ecuavias.png"; // Logo de la empresa
import lockImage from "../assets/forgot.png"; // Imagen ilustrativa de la contraseña
import { supabase } from "../supabase/client";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>(""); // Mensaje de éxito

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación básica para el correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, introduce un correo válido.");
      return;
    }

    setError(""); // Limpia el error si el correo es válido

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email); // Usamos el email ingresado
      if (error) {
        setError("Ocurrió un error al enviar el correo de recuperación.");
        console.error(error.message);
      } else {
        setSuccess("Se ha enviado un correo de recuperación. Revisa tu bandeja.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor. Intenta de nuevo más tarde.");
    }
  };

  return (
    <div className="h-screen relative">
      {/* Logo en la parte superior izquierda */}
      <div className="absolute top-4 left-7">
        <img src={logo} alt="Ecuavías" className="h-20" />
      </div>

      {/* Contenido principal */}
      <div className="h-full flex">
        {/* Sección izquierda */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start px-8 lg:px-24 bg-white">
          {/* Volver al inicio */}
          <Link
            to="/"
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
          </Link>

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
              {success && <p className="text-sm text-green-500 mt-1">{success}</p>}
            </div>

            {/* Botón Enviar */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full max-w-xs px-6 py-3 bg-gray-800 text-white text-center text-sm rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>

        {/* Sección derecha */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-50 items-center justify-center">
          <img
            src={lockImage}
            alt="Recuperar contraseña"
            className="max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;