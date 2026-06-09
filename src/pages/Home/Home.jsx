import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

export default function Home() {
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <LandingNavbar 
        onRegisterClick={() => setShowRegister(true)} 
      />

      {showRegister && (
        <RegisterForm 
          onClose={() => setShowRegister(false)} 
          onSuccess={() => {
            setShowRegister(false);
            alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
            navigate("/login");
          }}
        />
      )}

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Veterinaria San Hyuga</h1>
          <p>Cuidando a tus mejores amigos con amor y profesionalismo.</p>
          <button onClick={() => navigate("/login")} className="btn-primary-link" style={{ border: "none", cursor: "pointer" }}>
            Gestionar Clínica
          </button>
        </div>
      </header>

      {/* Description Section */}
      <section className="description-section">
        <div className="container">
          <h2>Sobre Nosotros</h2>
          <p>
            En Veterinaria San Hyuga, nos dedicamos a brindar la mejor atención médica para tus mascotas. 
            Contamos con un equipo de profesionales apasionados y tecnología de punta para asegurar 
            el bienestar de cada animal que nos visita.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="services-section">
        <div className="container">
          <h2>Nuestros Servicios</h2>
          <div className="services-grid">
            <div className="service-card">
              <span className="icon">🏥</span>
              <h3>Consultas Generales</h3>
              <p>Revisiones completas para mantener a tu mascota saludable.</p>
            </div>
            <div className="service-card">
              <span className="icon">💉</span>
              <h3>Vacunación</h3>
              <p>Planes de vacunación preventivos para todas las edades.</p>
            </div>
            <div className="service-card">
              <span className="icon">✂️</span>
              <h3>Peluquería Canina</h3>
              <p>Servicios de estética y baño para que luzcan increíbles.</p>
            </div>
            <div className="service-card">
              <span className="icon">🧪</span>
              <h3>Laboratorio</h3>
              <p>Análisis clínicos rápidos y precisos en nuestras instalaciones.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
