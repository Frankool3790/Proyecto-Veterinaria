import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LandingNavbar.css";

export default function LandingNavbar({ onRegisterClick }) {
  const navigate = useNavigate();

  return (
    <nav className="landing-nav">
      <div className="landing-nav-container">
        <div className="landing-nav-brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <span className="brand-logo">🐾</span>
          <span className="brand-name">Veterinaria San Hyuga</span>
        </div>

        <div className="landing-nav-actions">
          <button className="nav-btn btn-login" onClick={() => navigate("/login")}>Iniciar Sesión</button>
          <button className="nav-btn btn-register" onClick={onRegisterClick}>Registrarse</button>
          <div className="nav-more">
            <span>⋮</span>
          </div>
        </div>
      </div>
      
      <div className="landing-nav-secondary">
        <div className="landing-nav-container">
          <ul className="nav-menu">
            <li><Link to="/">Inicio</Link></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><Link to="/acerca-de">Acerca de Nosotros</Link></li>
            <li><a href="#contacto">Contáctenos</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
