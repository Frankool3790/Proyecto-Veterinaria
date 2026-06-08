import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

export default function NotFound() {
  return (
    <div className="page-shell" style={{ textAlign: "center", padding: "6rem 1rem" }}>
      <h1 className="page-title">404</h1>
      <p className="page-copy">La página solicitada no se encontró.</p>
      <Link to="/">
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  );
}
