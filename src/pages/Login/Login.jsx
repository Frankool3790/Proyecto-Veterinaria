import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email.trim(), password);
      if (result.success) {
        navigate(redirectTo, { replace: true });
      } else {
        setError(result.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box-new">
          <div className="login-header">
            <span className="login-logo">🐾</span>
            <h1>Bienvenido de nuevo</h1>
            <p>Ingresa tus credenciales para acceder al sistema</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form-new">
            {error && <div className="error-message-new">{error}</div>}
            
            <div className="form-group-new">
              <label>Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="admin@veterinaria.com"
                required
              />
            </div>

            <div className="form-group-new">
              <label>Contraseña</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </Button>
            
            <div className="login-footer-links">
              <Link to="/">Volver al inicio</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
