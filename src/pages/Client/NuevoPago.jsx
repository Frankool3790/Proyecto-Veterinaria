import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

const PAYMENT_METHODS = [
  { id: "PSE", name: "PSE (Cuentas de ahorro/corriente)", icon: "🏦", url: "https://www.pse.com.co/persona" },
  { id: "Nequi", name: "Nequi", icon: "📱", url: "https://recarga.nequi.com.co/" },
  { id: "Daviplata", name: "Daviplata", icon: "🔴", url: "https://www.daviplata.com/" },
  { id: "Tarjeta_Credito", name: "Tarjeta de Crédito", icon: "💳", url: "https://www.visa.com.co/" },
  { id: "Tarjeta_Debito", name: "Tarjeta de Débito", icon: "💳", url: "https://www.mastercard.com.co/" },
  { id: "Efectivo", name: "Efectivo (Corresponsal Bancario)", icon: "💵", url: null },
];

export default function NuevoPago() {
  const { clienteId } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    monto: "",
    metodo_pago: "PSE",
    descripcion: "Pago de turno veterinario"
  });
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const selectedMethod = PAYMENT_METHODS.find(m => m.id === formData.metodo_pago);

    // Si tiene URL de redirección, simulamos la ida al banco
    if (selectedMethod?.url) {
      setRedirecting(true);
      
      // Simulamos tiempo de carga de la pasarela de pago
      setTimeout(async () => {
        try {
          await api.post("/pagos", {
            ...formData,
            cliente_id: clienteId,
            monto: parseFloat(formData.monto),
            metodo_pago: selectedMethod.name
          });
          
          setRedirecting(false);
          setShowSuccess(true);
          
          // Abrimos la URL en una pestaña nueva para simular la redirección
          window.open(selectedMethod.url, "_blank");
        } catch (error) {
          console.error("Error al procesar pago:", error);
          alert("Hubo un error al procesar el pago");
          setRedirecting(false);
        } finally {
          setLoading(false);
        }
      }, 2500);
    } else {
      // Caso efectivo o métodos sin redirección inmediata
      try {
        await api.post("/pagos", {
          ...formData,
          cliente_id: clienteId,
          monto: parseFloat(formData.monto),
          metodo_pago: selectedMethod.name
        });
        setShowSuccess(true);
      } catch (error) {
        console.error("Error al procesar pago:", error);
        alert("Hubo un error al procesar el pago");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoToAppointments = () => {
    navigate("/mis-turnos");
  };

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <h1 className="page-title">Pasarela de Pagos</h1>
          <p className="page-copy">Selecciona tu método de pago preferido para continuar.</p>
        </div>
      </section>

      <div className="stat-card" style={{ maxWidth: "600px", margin: "0 auto", padding: "3rem" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <label style={{ color: "var(--accent-purple)", fontWeight: "bold", fontSize: "1.1rem" }}>Valor a Pagar</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}>$</span>
              <input
                type="number"
                value={formData.monto}
                onChange={(e) => setFormData({...formData, monto: e.target.value})}
                placeholder="0.00"
                required
                style={{ 
                  width: "100%",
                  padding: "1rem 1rem 1rem 2rem", 
                  borderRadius: "0.75rem", 
                  border: "2px solid var(--accent-blue)", 
                  background: "rgba(15, 23, 42, 0.6)", 
                  color: "white",
                  fontSize: "1.2rem",
                  fontWeight: "bold"
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <label style={{ color: "var(--accent-purple)", fontWeight: "bold", fontSize: "1.1rem" }}>Método de Pago</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {PAYMENT_METHODS.map(method => (
                <div 
                  key={method.id}
                  onClick={() => setFormData({...formData, metodo_pago: method.id})}
                  style={{
                    padding: "1rem",
                    borderRadius: "1rem",
                    border: `2px solid ${formData.metodo_pago === method.id ? "var(--accent-purple)" : "rgba(59, 130, 246, 0.2)"}`,
                    background: formData.metodo_pago === method.id ? "rgba(139, 92, 246, 0.1)" : "rgba(30, 41, 59, 0.4)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{method.icon}</span>
                  <span style={{ fontSize: "0.9rem", fontWeight: "600" }}>{method.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <label style={{ color: "var(--accent-purple)", fontWeight: "bold", fontSize: "1.1rem" }}>Referencia / Descripción</label>
            <input
              type="text"
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              style={{ 
                padding: "1rem", 
                borderRadius: "0.75rem", 
                border: "2px solid rgba(59, 130, 246, 0.2)", 
                background: "rgba(15, 23, 42, 0.6)", 
                color: "white" 
              }}
            />
          </div>

          <Button type="submit" variant="primary" style={{ padding: "1.2rem", fontSize: "1.1rem" }} disabled={loading}>
            {loading ? "Procesando Transacción..." : "Pagar Ahora"}
          </Button>
        </form>
      </div>

      {/* Modal de Redirección Simulada */}
      {redirecting && (
        <Modal open={redirecting} title="Redirigiendo a Pasarela de Pago" onClose={() => {}}>
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <div className="loader" style={{ 
              border: "4px solid rgba(255,255,255,0.1)", 
              borderTop: "4px solid var(--accent-blue)", 
              borderRadius: "50%", 
              width: "50px", 
              height: "50px", 
              animation: "spin 1s linear infinite",
              margin: "0 auto 2rem"
            }}></div>
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Conectando con {PAYMENT_METHODS.find(m => m.id === formData.metodo_pago)?.name}...</p>
            <p style={{ color: var(--muted), marginTop: "1rem" }}>Por favor, no cierres esta ventana.</p>
          </div>
          <style>{`
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          `}</style>
        </Modal>
      )}

      {showSuccess && (
        <Modal open={showSuccess} title="¡Transacción Exitosa!" onClose={() => setShowSuccess(false)}>
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>💎</div>
            <h2 style={{ marginBottom: "1rem" }}>Pago Confirmado</h2>
            <p style={{ marginBottom: "2rem", color: "#cbd5e1" }}>
              Hemos recibido tu pago correctamente a través de <strong>{PAYMENT_METHODS.find(m => m.id === formData.metodo_pago)?.name}</strong>.
            </p>
            <Button onClick={handleGoToAppointments} variant="primary" style={{ width: "100%" }}>
              Continuar a Mis Turnos
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
