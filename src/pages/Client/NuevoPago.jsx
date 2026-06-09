import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

export default function NuevoPago() {
  const { clienteId } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    monto: "",
    metodo_pago: "Tarjeta",
    descripcion: "Pago de turno veterinario"
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/pagos", {
        ...formData,
        cliente_id: clienteId,
        monto: parseFloat(formData.monto)
      });
      setShowSuccess(true);
    } catch (error) {
      console.error("Error al procesar pago:", error);
      alert("Hubo un error al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToAppointments = () => {
    navigate("/mis-turnos");
  };

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <h1 className="page-title">Realizar Pago</h1>
          <p className="page-copy">Paga tu consulta para habilitar la asignación de turnos.</p>
        </div>
      </section>

      <div className="stat-card" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ color: "var(--accent-purple)", fontWeight: "bold" }}>Monto a Pagar ($)</label>
            <input
              type="number"
              value={formData.monto}
              onChange={(e) => setFormData({...formData, monto: e.target.value})}
              placeholder="50.00"
              required
              style={{ padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid var(--accent-blue)", background: "rgba(255,255,255,0.1)", color: "white" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ color: "var(--accent-purple)", fontWeight: "bold" }}>Método de Pago</label>
            <select
              value={formData.metodo_pago}
              onChange={(e) => setFormData({...formData, metodo_pago: e.target.value})}
              style={{ padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid var(--accent-blue)", background: "#1e293b", color: "white" }}
            >
              <option value="Tarjeta">Tarjeta de Crédito/Débito</option>
              <option value="Transferencia">Transferencia Bancaria</option>
              <option value="Efectivo">Efectivo (en local)</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ color: "var(--accent-purple)", fontWeight: "bold" }}>Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              rows="3"
              style={{ padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid var(--accent-blue)", background: "rgba(255,255,255,0.1)", color: "white" }}
            />
          </div>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Procesando..." : "Confirmar Pago"}
          </Button>
        </form>
      </div>

      {showSuccess && (
        <Modal open={showSuccess} title="¡Pago Exitoso!" onClose={() => setShowSuccess(false)}>
          <div style={{ textAlign: "center", padding: "1rem" }}>
            <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</p>
            <p style={{ marginBottom: "2rem" }}>Tu pago ha sido procesado correctamente. Ahora puedes proceder a solicitar o revisar tus turnos.</p>
            <Button onClick={handleGoToAppointments} variant="primary" style={{ width: "100%" }}>
              Ver Mis Turnos
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
