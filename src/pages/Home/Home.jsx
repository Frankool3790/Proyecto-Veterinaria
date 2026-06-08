import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./Home.css";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(username, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  };

  const scrollToLogin = () => {
    const loginSection = document.getElementById("login-section");
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page">
      <LandingNavbar 
        onLoginClick={scrollToLogin} 
        onRegisterClick={() => setShowRegister(true)} 
      />

      {showRegister && (
        <RegisterForm 
          onClose={() => setShowRegister(false)} 
          onSuccess={() => {
            setShowRegister(false);
            alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
            scrollToLogin();
          }}
        />
      )}

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Veterinaria San Hyuga</h1>
          <p>Cuidando a tus mejores amigos con amor y profesionalismo.</p>
          <a href="#login-section" className="btn-primary-link">Gestionar Clínica</a>
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
      <section className="services-section">
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

      {/* Login Section */}
      <section id="login-section" className="login-landing-section">
        <div className="login-container">
          <div className="login-box">
            <h2>Acceso al Personal</h2>
            <p>Ingresa para gestionar citas, clientes y mascotas.</p>
            
            <form onSubmit={handleSubmit} className="login-form">
              {error && <div className="error-message">{error}</div>}
              <div className="form-group">
                <label>Usuario</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="admin"
                  required
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" variant="primary">Iniciar Sesión</Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2024 Veterinaria San Hyuga. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
