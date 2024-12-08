import React, { useState } from "react";
import { supabase } from "../supabase/client";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Validar que la contraseña no esté vacía
    if (password.trim().length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setError(""); // Limpia el error si las validaciones pasan

    try {
      // Actualizar la contraseña del usuario usando Supabase
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        console.error(error.message);
        setError("Ocurrió un error al intentar cambiar tu contraseña.");
      } else {
        setSuccess("¡Tu contraseña ha sido actualizada con éxito!");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor. Intenta nuevamente más tarde.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Título */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Restablecer tu contraseña
        </h2>
        <p className="text-sm text-gray-600 mb-8">
          Ingresa tu nueva contraseña para actualizarla.
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de nueva contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Nueva contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="********"
            />
          </div>

          {/* Confirmación de la contraseña */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmar contraseña
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="********"
            />
          </div>

          {/* Mensajes de error y éxito */}
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {success && <p className="text-sm text-green-500 mt-2">{success}</p>}

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
          >
            Actualizar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;