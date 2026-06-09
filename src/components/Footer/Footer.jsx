import "./Footer.css";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-section brand-info">
          <div className="footer-logo">
            <span className="logo-text">CENTRO VETERINARIO</span>
            <span className="brand-highlight">SAN HYUGA</span>
          </div>
          <p className="footer-description">
            En San Hyuga, estamos capacitados y listos para prestarte los mejores servicios para mascotas convencionales y NO CONVENCIONALES.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon facebook">f</a>
            <a href="#" className="social-icon instagram">ig</a>
          </div>
        </div>

        <div className="footer-section contact-info">
          <h3>Información de Contacto</h3>
          <ul>
            <li><span className="icon">📞</span> +57 323 229 0319</li>
            <li><span className="icon">✉️</span> contacto@sanhyuga.com</li>
            <li><span className="icon">📍</span> Calle 13 #9-84, Soacha, Cundinamarca</li>
          </ul>
        </div>

        <div className="footer-section hours-info">
          <h3>Horario de Atención</h3>
          <ul>
            <li>Lunes a sábado: 8 am a 6 pm</li>
            <li>Domingos y festivos: 10 am a 5 pm</li>
          </ul>
          <div className="footer-links">
            <a href="#">› Veterinaria Soacha</a>
            <a href="#">› Veterinaria de animales exóticos</a>
            <a href="#">› Trabaja con Nosotros</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Develop by - www.sanhyuga.com</p>
        <div className="emergency-badge">
          <span>Atención 24/7 para emergencias</span>
          <div className="whatsapp-icon">💬</div>
        </div>
      </div>
    </footer>
  );
}
