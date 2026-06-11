import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  Dog, 
  Calendar, 
  Stethoscope, 
  History, 
  CreditCard,
  X,
  Syringe,
  FileText
} from "lucide-react";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  const { isAdmin, isClient, isVeterinario } = useAuth();

  let links = [];

  if (isAdmin) {
    links = [
      { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
      { to: "/clientes", label: "Dueños", icon: <Users size={20} /> },
      { to: "/mascotas", label: "Mascotas", icon: <Dog size={20} /> },
      { to: "/turnos", label: "Turnos", icon: <Calendar size={20} /> },
      { to: "/veterinarios", label: "Veterinarios", icon: <Stethoscope size={20} /> },
      { to: "/historial", label: "Historial", icon: <History size={20} /> },
      { to: "/pagos", label: "Pagos", icon: <CreditCard size={20} /> },
    ];
  } else if (isVeterinario) {
    links = [
      { to: "/veterinario/dashboard", label: "Panel Veterinario", icon: <LayoutDashboard size={20} /> },
      { to: "/veterinario/citas", label: "Mis Citas", icon: <Calendar size={20} /> },
      { to: "/veterinario/mascotas", label: "Mascotas", icon: <Dog size={20} /> },
      { to: "/veterinario/historial", label: "Historial Clínico", icon: <FileText size={20} /> },
      { to: "/veterinario/vacunas", label: "Control de Vacunas", icon: <Syringe size={20} /> },
    ];
  } else {
    links = [
      { to: "/dashboard", label: "Mi Panel", icon: <LayoutDashboard size={20} /> },
      { to: "/mis-mascotas", label: "Mis Mascotas", icon: <Dog size={20} /> },
      { to: "/nuevo-pago", label: "Nuevo Pago", icon: <CreditCard size={20} /> },
      { to: "/mis-turnos", label: "Mis Turnos", icon: <Calendar size={20} /> },
      { to: "/mi-historial", label: "Mi Historial", icon: <History size={20} /> },
    ];
  }

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Dog size={28} className="logo-icon" />
            <span>San Hyuga</span>
          </div>
          <button className="sidebar-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {links.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to} 
              className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"} 
              onClick={onClose}
              end={link.to === "/dashboard"}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
