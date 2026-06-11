import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import Login from "../pages/Login/Login";
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
import NuevoPago from "../pages/Client/NuevoPago";
import PagosAdmin from "../pages/Pagos/PagosAdmin";
import PagosTrash from "../pages/Pagos/PagosTrash";

// Importar nuevas páginas de Veterinario
import VeterinarioDashboard from "../pages/Veterinario/VeterinarioDashboard";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/acerca-de" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />

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
          <Route path="/pagos" element={<PagosAdmin />} />
          <Route path="/pagos/papelera" element={<PagosTrash />} />

          {/* Rutas Cliente */}
          <Route path="/mis-mascotas" element={<ClientMascotas />} />
          <Route path="/nuevo-pago" element={<NuevoPago />} />
          <Route path="/mis-turnos" element={<ClientCitas />} />
          <Route path="/mi-historial" element={<ClientHistorial />} />

          {/* Rutas Veterinario */}
          <Route path="/veterinario/dashboard" element={<VeterinarioDashboard />} />
          <Route path="/veterinario/citas" element={<Citas />} />
          <Route path="/veterinario/mascotas" element={<Mascotas />} />
          <Route path="/veterinario/historial" element={<Historial />} />
          <Route path="/veterinario/vacunas" element={<VeterinarioDashboard />} />
        </Route>
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
