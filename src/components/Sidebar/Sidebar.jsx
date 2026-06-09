import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { isAdmin, isClient } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">San Hyuga</div>
      <nav className="sidebar-nav">
        {isAdmin && (
          <>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} end>
              Dashboard Admin
            </NavLink>
            <NavLink to="/clientes" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              Dueños
            </NavLink>
            <NavLink to="/mascotas" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              Mascotas
            </NavLink>
            <NavLink to="/turnos" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              Turnos
            </NavLink>
            <NavLink to="/veterinarios" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              Veterinarios
            </NavLink>
            <NavLink to="/historial" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              Historial
            </NavLink>
            <NavLink to="/pagos" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              Pagos
            </NavLink>
          </>
        )}

        {isClient && (
          <>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} end>
              Mi Panel
            </NavLink>
            <NavLink to="/mis-mascotas" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              Mis Mascotas
            </NavLink>
            <NavLink to="/nuevo-pago" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              Nuevo Pago
            </NavLink>
            <NavLink to="/mis-turnos" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              Mis Turnos
            </NavLink>
            <NavLink to="/mi-historial" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
              Mi Historial
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}
