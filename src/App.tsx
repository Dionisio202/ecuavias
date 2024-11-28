import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./templates/Profile";
import Login from "./auth/SignInForm";
import ForgotPassword from "./auth/ForgotPassword"; // Importa tus componentes
import Register from "./auth/Register";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />} />
           {/* Ruta de Inicio */}
      <Route path="/" element={<Login />} />
      {/* Ruta de Recuperar Contraseña */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* Puedes agregar más rutas aquí */}
      <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
