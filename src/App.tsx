import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./templates/Profile";
import Login from "./auth/SignInForm";
import ForgotPassword from "./auth/ForgotPassword";
import Register from "./auth/Register";
import { supabase } from "./supabaseClient";
import { useEffect, useState } from "react";
import Users from "./templates/Users";
import EditProfile from "./templates/EditProfile";
import Seat from "./templates/Asientos";
import Reservaciones from "./templates/GReservas";
// Componente para proteger rutas
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    fetchSession();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!session) {
    return <Navigate to="/" replace />; // Redirige al login si no hay sesión activa
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de Inicio */}
        <Route path="/" element={<Login />} />
        
        {/* Ruta de Recuperar Contraseña */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Ruta de Registro */}
        <Route path="/register" element={<Register />} />

        {/* Ruta protegida para el perfil */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
         <Route
          path="/gestion-usuarios"
          element={
            <ProtectedRoute>
              <Users/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/user-settings"
          element={
            <ProtectedRoute>
              <EditProfile/>
            </ProtectedRoute>
          }
        />
          <Route
          path="/Asientos"
          element={
            <ProtectedRoute>
              <Seat/>
            </ProtectedRoute>
          }
        />
          <Route
          path="/ListaReservaciones"
          element={
            <ProtectedRoute>
              <Reservaciones/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
