import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PAYMENT_METHODS = [
  { id: "PSE", name: "PSE", icon: "🏦", url: "https://www.pse.com.co/persona" },
  { id: "Nequi", name: "Nequi", icon: "📱", url: "https://recarga.nequi.com.co/" },
  { id: "Daviplata", name: "Daviplata", icon: "🔴", url: "https://www.daviplata.com/" },
  { id: "Tarjeta_Credito", name: "Tarjeta de Crédito", icon: "💳", url: null, isCard: true },
  { id: "Tarjeta_Debito", name: "Tarjeta de Débito", icon: "💳", url: null, isCard: true },
  { id: "Efectivo", name: "Efectivo", icon: "💵", url: null },
];

export default function NuevoPago() {
  const { clienteId } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    monto: "",
    metodo_pago: "PSE",
    descripcion: "Pago de turno veterinario",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mascotas, setMascotas] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [citaForm, setCitaForm] = useState({
    fecha: "",
    hora: "",
    motivo: "",
    mascotaId: "",
    veterinarioId: "",
  });

  useEffect(() => {
    if (clienteId) {
      fetchMascotas();
      fetchVeterinarios();
    }
  }, [clienteId]);

  const fetchMascotas = async () => {
    try {
      const response = await api.get(`/mascotas/cliente/${clienteId}`);
      setMascotas(response.data);
    } catch (error) {
      console.error("Error al obtener mascotas:", error);
    }
  };

  const fetchVeterinarios = async () => {
    try {
      const response = await api.get("/veterinarios");
      setVeterinarios(response.data);
    } catch (error) {
      console.error("Error al obtener veterinarios:", error);
    }
  };

  const formatCOP = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "monto") {
      const val = Math.max(0, parseFloat(value) || 0);
      setFormData(prev => ({ ...prev, [name]: val }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCitaChange = (e) => {
    const { name, value } = e.target;
    setCitaForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.monto <= 0) {
      toast.error("El monto debe ser mayor a 0 COP");
      return;
    }

    setLoading(true);
    const selectedMethod = PAYMENT_METHODS.find(m => m.id === formData.metodo_pago);

    const processPayment = async () => {
      try {
        await api.post("/pagos", {
          cliente_id: clienteId,
          monto: formData.monto,
          metodo_pago: selectedMethod.name,
          descripcion: formData.descripcion,
          estado: 'Aprobado'
        });
        setShowSuccess(true);
        toast.success("Pago procesado correctamente");
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error al procesar el pago");
      } finally {
        setLoading(false);
      }
    };

    if (selectedMethod?.url) {
      setRedirecting(true);
      setTimeout(async () => {
        await processPayment();
        setRedirecting(false);
        window.open(selectedMethod.url, "_blank");
      }, 2000);
    } else {
      await processPayment();
    }
  };

  const handleSolicitarTurno = async (e) => {
    e.preventDefault();
    if (!citaForm.fecha || !citaForm.hora || !citaForm.mascotaId || !citaForm.veterinarioId) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      await api.post("/citas", {
        ...citaForm,
        estado: "Solicitado", // Nuevo estado para aprobación del admin
        mascotaId: Number(citaForm.mascotaId),
        veterinarioId: Number(citaForm.veterinarioId)
      });
      toast.success("Turno solicitado correctamente. Pendiente de aprobación.");
      navigate("/mis-turnos");
    } catch (error) {
      console.error("Error al solicitar turno:", error);
      toast.error("Error al solicitar el turno");
    } finally {
      setLoading(false);
    }
  };

  const isCardSelected = PAYMENT_METHODS.find(m => m.id === formData.metodo_pago)?.isCard;

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <h1 className="page-title">Pasarela de Pagos (COP)</h1>
          <p className="page-copy">Completa tu pago de forma segura.</p>
        </div>
      </section>

      <div className="stat-card" style={{ maxWidth: "800px", margin: "0 auto", padding: "2.5rem", overflow: "hidden" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {/* Columna Izquierda: Datos Básicos */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ color: "var(--accent-purple)", fontWeight: "bold" }}>Monto (COP)</label>
                <input
                  type="number"
                  name="monto"
                  min="1"
                  value={formData.monto}
                  onChange={handleInputChange}
                  placeholder="Ej: 50000"
                  required
                  style={{ width: "100%", padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid var(--accent-blue)", background: "rgba(15, 23, 42, 0.6)", color: "white" }}
                />
                <span style={{ fontSize: "0.85rem", color: "var(--accent-blue)" }}>
                  Total: {formatCOP(formData.monto || 0)}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ color: "var(--accent-purple)", fontWeight: "bold" }}>Método de Pago</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {PAYMENT_METHODS.map(method => (
                    <div 
                      key={method.id}
                      onClick={() => setFormData(prev => ({...prev, metodo_pago: method.id}))}
                      style={{
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                        border: `1px solid ${formData.metodo_pago === method.id ? "var(--accent-purple)" : "rgba(59, 130, 246, 0.2)"}`,
                        background: formData.metodo_pago === method.id ? "rgba(139, 92, 246, 0.2)" : "rgba(30, 41, 59, 0.4)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.85rem",
                        overflow: "hidden"
                      }}
                    >
                      <span>{method.icon}</span>
                      <span style={{ fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{method.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna Derecha: Datos de Tarjeta (Condicional) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: "0" }}>
              {isCardSelected ? (
                <div style={{ background: "rgba(59, 130, 246, 0.1)", padding: "1.5rem", borderRadius: "1rem", border: "1px dashed var(--accent-blue)", width: "100%" }}>
                  <h3 style={{ fontSize: "1rem", marginBottom: "1rem", color: "white" }}>Datos de la Tarjeta</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Número de Tarjeta"
                      maxLength="16"
                      required
                      style={{ width: "100%", padding: "0.6rem", borderRadius: "0.4rem", border: "1px solid var(--accent-blue)", background: "white", color: "#1e293b" }}
                    />
                    <input
                      type="text"
                      name="cardHolder"
                      placeholder="Nombre del Titular"
                      required
                      style={{ width: "100%", padding: "0.6rem", borderRadius: "0.4rem", border: "1px solid var(--accent-blue)", background: "white", color: "#1e293b" }}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/AA"
                        maxLength="5"
                        required
                        style={{ width: "100%", padding: "0.6rem", borderRadius: "0.4rem", border: "1px solid var(--accent-blue)", background: "white", color: "#1e293b" }}
                      />
                      <input
                        type="password"
                        name="cvv"
                        placeholder="CVV"
                        maxLength="3"
                        required
                        style={{ width: "100%", padding: "0.6rem", borderRadius: "0.4rem", border: "1px solid var(--accent-blue)", background: "white", color: "#1e293b" }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", textAlign: "center", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "1rem" }}>
                  <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                    {formData.metodo_pago === "Efectivo" 
                      ? "Paga en cualquier punto físico indicando tu ID." 
                      : `Serás redirigido a la página oficial de ${formData.metodo_pago}.`}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
            <label style={{ color: "var(--accent-purple)", fontWeight: "bold" }}>Referencia</label>
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              style={{ padding: "0.8rem", borderRadius: "0.5rem", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(15, 23, 42, 0.6)", color: "white" }}
            />
          </div>

          <Button type="submit" variant="primary" style={{ padding: "1rem", marginTop: "1rem" }} disabled={loading}>
            {loading ? "Verificando..." : `Pagar ${formatCOP(formData.monto || 0)}`}
          </Button>
        </form>
      </div>

      {/* Modal Redirección */}
      {redirecting && (
        <Modal open={redirecting} title="Conectando..." onClose={() => {}}>
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <div className="loader" style={{ border: "4px solid rgba(255,255,255,0.1)", borderTop: "4px solid var(--accent-blue)", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 1s linear infinite", margin: "0 auto 1.5rem" }}></div>
            <p>Conectando con la pasarela de <strong>{formData.metodo_pago}</strong></p>
          </div>
        </Modal>
      )}

      {/* Modal Éxito y Solicitud de Turno */}
      {showSuccess && (
        <Modal open={showSuccess} title="¡Pago Confirmado!" onClose={() => setShowSuccess(false)}>
          <div style={{ padding: "1rem" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>✅</div>
              <p>Tu pago de <strong>{formatCOP(formData.monto)}</strong> ha sido procesado exitosamente.</p>
              <p style={{ color: "var(--accent-purple)", fontWeight: "bold", marginTop: "1rem" }}>¡Ya puedes solicitar tu turno!</p>
            </div>

            <form onSubmit={handleSolicitarTurno} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  <label style={{ fontSize: "0.85rem" }}>Fecha</label>
                  <input 
                    type="date" 
                    name="fecha" 
                    value={citaForm.fecha} 
                    onChange={handleCitaChange} 
                    required 
                    style={{ padding: "0.5rem", borderRadius: "0.4rem", border: "1px solid #ddd" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  <label style={{ fontSize: "0.85rem" }}>Hora</label>
                  <input 
                    type="time" 
                    name="hora" 
                    value={citaForm.hora} 
                    onChange={handleCitaChange} 
                    required 
                    style={{ padding: "0.5rem", borderRadius: "0.4rem", border: "1px solid #ddd" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <label style={{ fontSize: "0.85rem" }}>Mascota</label>
                <select 
                  name="mascotaId" 
                  value={citaForm.mascotaId} 
                  onChange={handleCitaChange} 
                  required
                  style={{ padding: "0.5rem", borderRadius: "0.4rem", border: "1px solid #ddd" }}
                >
                  <option value="">Selecciona tu mascota</option>
                  {mascotas.map(m => (
                    <option key={m.id} value={m.id}>{m.nombre}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <label style={{ fontSize: "0.85rem" }}>Veterinario de preferencia</label>
                <select 
                  name="veterinarioId" 
                  value={citaForm.veterinarioId} 
                  onChange={handleCitaChange} 
                  required
                  style={{ padding: "0.5rem", borderRadius: "0.4rem", border: "1px solid #ddd" }}
                >
                  <option value="">Cualquier veterinario</option>
                  {veterinarios.map(v => (
                    <option key={v.id} value={v.id}>{v.nombre} - {v.especialidad}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <label style={{ fontSize: "0.85rem" }}>Motivo de consulta</label>
                <textarea 
                  name="motivo" 
                  value={citaForm.motivo} 
                  onChange={handleCitaChange} 
                  rows="2"
                  placeholder="Ej: Vacunación, Control..."
                  style={{ padding: "0.5rem", borderRadius: "0.4rem", border: "1px solid #ddd" }}
                ></textarea>
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <Button type="submit" variant="primary" style={{ flex: 1 }} disabled={loading}>
                  {loading ? "Solicitando..." : "Solicitar Turno Ahora"}
                </Button>
                <Button type="button" variant="secondary" onClick={() => navigate("/mis-turnos")} style={{ flex: 1 }}>
                  Hacerlo más tarde
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
