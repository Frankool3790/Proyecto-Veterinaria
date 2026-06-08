import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button/Button";
import "./RegisterForm.css";

export default function RegisterForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      onSuccess();
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="register-overlay">
      <div className="register-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Crear Cuenta</h2>
        <p>Regístrate para acceder a nuestros servicios.</p>

        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-row">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan"
                required
              />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Ej: Pérez"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="juan@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </form>
      </div>
    </div>
  );
}
