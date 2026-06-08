import Button from "../../components/Button/Button";

export default function Login() {
  return (
    <div className="page-shell" style={{ maxWidth: "520px", margin: "3rem auto" }}>
      <div className="stat-card">
        <h1 style={{ marginBottom: "0.75rem" }}>Iniciar sesión</h1>
        <p className="page-copy">Accede al panel de control para administrar Mascotas, Dueños y Turnos.</p>

        <div className="form-grid" style={{ marginTop: "1.5rem" }}>
          <div className="form-field">
            <label>Correo electrónico</label>
            <input type="email" placeholder="usuario@ejemplo.com" />
          </div>
          <div className="form-field">
            <label>Contraseña</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <Button variant="primary">Entrar</Button>
        </div>
      </div>
    </div>
  );
}
