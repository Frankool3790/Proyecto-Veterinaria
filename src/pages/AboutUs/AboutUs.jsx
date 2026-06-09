import React from "react";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";
import Footer from "../../components/Footer/Footer";
import { Heart, Target, Eye, ShieldCheck, PawPrint, Users, Stethoscope, Lightbulb, MessageCircleHeart } from "lucide-react";
import "./AboutUs.css";

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="about-us-page">
      <LandingNavbar onRegisterClick={() => navigate("/")} />
      
      <header className="about-hero">
        <div className="container">
          <h1>🐾 Acerca de Nosotros</h1>
          <p className="hero-subtitle">Conoce el corazón de Veterinaria San Hyuga</p>
        </div>
      </header>

      <section className="about-content section-padding">
        <div className="container">
          <div className="about-intro">
            <h2>Bienvenidos a Veterinaria San Hyuga</h2>
            <p>
              En <strong>Veterinaria San Hyuga</strong>, nuestra pasión es cuidar la salud y el bienestar de las mascotas que forman parte de tu familia. 
              Nos dedicamos a brindar una atención veterinaria integral, ofreciendo servicios de prevención, diagnóstico y tratamiento con un enfoque profesional, humano y lleno de cariño.
            </p>
            <p>
              Creemos que cada perro, gato o compañero de vida merece recibir una atención personalizada, por eso trabajamos con compromiso y responsabilidad para garantizar que cada visita sea una experiencia de confianza y tranquilidad tanto para las mascotas como para sus dueños.
            </p>
            <p>
              Nuestro objetivo es acompañarte en cada etapa de la vida de tu mejor amigo, promoviendo hábitos saludables y proporcionando soluciones oportunas para mantenerlo feliz y saludable.
            </p>
          </div>

          <div className="mission-vision-grid">
            <div className="info-card-about mission">
              <div className="card-icon"><Target size={40} /></div>
              <h3>🎯 Misión</h3>
              <p>Brindar servicios veterinarios de excelencia, enfocados en la prevención, el cuidado y la recuperación de la salud de las mascotas, ofreciendo una atención cercana, ética y comprometida con el bienestar animal.</p>
            </div>
            <div className="info-card-about vision">
              <div className="card-icon"><Eye size={40} /></div>
              <h3>👁️ Visión</h3>
              <p>Consolidarnos como una veterinaria líder y referente en el cuidado de mascotas, destacándonos por la calidad de nuestros servicios, la innovación tecnológica y la confianza que depositan en nosotros nuestros clientes.</p>
            </div>
          </div>

          <div className="values-section">
            <h2 className="section-title">💙 Nuestros Valores</h2>
            <div className="values-grid">
              <div className="value-item">
                <PawPrint className="value-icon" />
                <span>Amor y respeto por todos los animales</span>
              </div>
              <div className="value-item">
                <Users className="value-icon" />
                <span>Compromiso con nuestros clientes y sus mascotas</span>
              </div>
              <div className="value-item">
                <Stethoscope className="value-icon" />
                <span>Profesionalismo y responsabilidad</span>
              </div>
              <div className="value-item">
                <ShieldCheck className="value-icon" />
                <span>Honestidad y transparencia</span>
              </div>
              <div className="value-item">
                <Lightbulb className="value-icon" />
                <span>Innovación y mejora continua</span>
              </div>
              <div className="value-item">
                <MessageCircleHeart className="value-icon" />
                <span>Empatía y atención personalizada</span>
              </div>
            </div>
          </div>

          <div className="commitment-box">
            <div className="commitment-header">
              <Heart size={32} fill="currentColor" />
              <h3>🐶 Nuestro Compromiso</h3>
            </div>
            <p>
              En Veterinaria San Hyuga, entendemos que las mascotas no son solo animales de compañía, sino miembros importantes de cada familia. Por eso, trabajamos cada día para ofrecer un servicio confiable, cálido y de calidad, asegurando que reciban el cuidado y la atención que merecen.
            </p>
            <blockquote className="quote">
              "En Veterinaria San Hyuga, protegemos su salud, cuidamos su felicidad y acompañamos cada paso de su vida." 🐕🐈💙
            </blockquote>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
