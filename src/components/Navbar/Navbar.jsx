import { useAuth } from "../../context/AuthContext";
import Button from "../Button/Button";
import "./Navbar.css";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar-brand">Veterinaria San Hyuga</div>
      <div className="topbar-info">
        <span>Mascotas · Dueños · Turnos</span>
        <Button variant="secondary" onClick={logout} style={{ marginLeft: "1rem", padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>
          Cerrar Sesión
        </Button>
      </div>
    </header>
  );
}
