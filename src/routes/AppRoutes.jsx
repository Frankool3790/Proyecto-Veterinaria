import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Clientes from "../pages/Clientes/Clientes";
import Mascotas from "../pages/Mascotas/Mascotas";
import Citas from "../pages/Citas/Citas";
import Veterinarios from "../pages/Veterinarios/Veterinarios";
import Historial from "../pages/Historial/Historial";
import NotFound from "../pages/NotFound/NotFound";
import ClientMascotas from "../pages/Client/ClientMascotas";
import ClientCitas from "../pages/Client/ClientCitas";
import ClientHistorial from "../pages/Client/ClientHistorial";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Navigate to="/" replace />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Rutas Admin */}
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/mascotas" element={<Mascotas />} />
          <Route path="/turnos" element={<Citas />} />
          <Route path="/citas" element={<Navigate replace to="/turnos" />} />
          <Route path="/veterinarios" element={<Veterinarios />} />
          <Route path="/historial" element={<Historial />} />

          {/* Rutas Cliente */}
          <Route path="/mis-mascotas" element={<ClientMascotas />} />
          <Route path="/mis-turnos" element={<ClientCitas />} />
          <Route path="/mi-historial" element={<ClientHistorial />} />
        </Route>
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
