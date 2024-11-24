import React from "react";
import { Routes, Route } from "react-router-dom"; // Importa Routes y Route
import Login from "./auth/SignInForm";
import ForgotPassword from "./auth/ForgotPassword"; // Importa tus componentes
import Register from "./auth/Register";
const App: React.FC = () => {
  return (
    <Routes>
      {/* Ruta de Inicio */}
      <Route path="/" element={<Login />} />
      {/* Ruta de Recuperar Contraseña */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* Puedes agregar más rutas aquí */}
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
