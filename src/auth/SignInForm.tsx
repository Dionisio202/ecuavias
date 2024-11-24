import React, { useState } from "react";
import BusImage from "../assets/bus-login.png"; // Importa la imagen correctamente
import logo from "../assets/logo-ecuavias.png";
import { Link } from "react-router-dom"; // Importa Link

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {
      email: "",
      password: "",
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    const newErrors: { email?: string; password?: string } = {};

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Por favor, introduce un correo válido.";
      valid = false;
    }

    // Validar contraseña
    if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log("Email:", email, "Password:", password);
      // Aquí puedes enviar los datos al backend o realizar otra acción
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left Section with Image */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${BusImage})`, // Usa la imagen importada
        }}
      ></div>

      {/* Right Section with Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-100 p-8 lg:p-16">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="flex items-center justify-center space-x-4 mb-11">
            <h2 className="text-3xl text-gray-800">Inicio de Sesión</h2>
            <img
              src={logo} // Usa la imagen importada
              alt="Ecuavías"
              className="h-20" // Ajusta el tamaño del logo si es necesario
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="solisediso@outlook.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-primary focus:outline-none ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="****************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-primary focus:outline-none ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mb-4 flex justify-center">
              <button
                type="submit"
                className="w-64 p-3 text-white bg-gray-800 hover:bg-gray-700 rounded-lg"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          {/* Forgot Password and Register */}
          <div className="text-center">
            <Link
              to="/forgot-password" // Redirige a la ruta de ForgotPassword
              className="text-sm text-gray-500 hover:underline block mb-4"
            >
              ¿Has olvidado tu contraseña?
            </Link>
            <p className="text-sm text-gray-600">
              ¿Aún no tienes cuenta?{" "}
              <Link
                to="/register" // Redirige a la ruta de registro
                className="text-primary font-medium hover:underline"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
