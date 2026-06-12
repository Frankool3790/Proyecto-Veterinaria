import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { Calendar, CheckCircle, XCircle, Clock, Edit } from "lucide-react";

export default function VeterinarioCitas() {
  const { veterinarioId } = useAuth();
  const [citas, setCitas] = useState([]);
  const [selectedCita, setSelectedCita] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(""); // "confirmar", "completar", "cancelar", "reprogramar"
  const [cancelReason, setCancelReason] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    fetchCitas();
  }, [veterinarioId]);

  const fetchCitas = async () => {
    try {
      const response = await api.get(`/citas/veterinario/${veterinarioId}`);
      setCitas(response.data);
    } catch (error) {
      console.error("Error fetching citas:", error);
    }
  };

  const handleStatusChange = async (citaId, newStatus, reason = "") => {
    try {
      await api.put(`/citas/${citaId}`, {
        estado: newStatus,
        motivoCancelacion: reason
      });
      await fetchCitas();
      setIsModalOpen(false);
      setSelectedCita(null);
    } catch (error) {
      console.error("Error updating cita:", error);
    }
  };

  const handleReprogramar = async () => {
    try {
      await api.put(`/citas/${selectedCita.id}`, {
        fecha: newDate,
        hora: newTime,
        estado: "Pendiente"
      });
      await fetchCitas();
      setIsModalOpen(false);
      setSelectedCita(null);
      setNewDate("");
      setNewTime("");
    } catch (error) {
      console.error("Error reprogramming cita:", error);
    }
  };

  const getStatusColor = (estado) => {
    switch (estado) {
      case "Pendiente": return "#f59e0b";
      case "Confirmado": return "#3b82f6";
      case "Completado": return "#10b981";
      case "Cancelado": return "#ef4444";
      case "Reprogramado": return "#8b5cf6";
      default: return "#64748b";
    }
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestión de Citas</h1>
          <p className="page-copy">Administra tus citas programadas</p>
        </div>
      </div>

      <div className="stat-card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {citas.length === 0 ? (
            <p className="page-copy" style={{ textAlign: "center" }}>No hay citas programadas</p>
          ) : (
            citas.map((cita) => (
              <div 
                key={cita.id}
                style={{
                  padding: "1.25rem",
                  background: "var(--card-bg)",
                  borderRadius: "0.75rem",
                  border: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem"
                }}
              >
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text)" }}>{cita.mascota_nombre}</h3>
                  <p className="page-copy" style={{ margin: "0.25rem 0" }}>
                    <Calendar size={16} style={{ display: "inline", marginRight: "0.5rem" }} />
                    {new Date(cita.fecha).toLocaleDateString()} - {cita.hora}
                  </p>
                  <p className="page-copy" style={{ margin: "0.25rem 0" }}>
                    <strong>Motivo:</strong> {cita.motivo || "Consulta general"}
                  </p>
                  <span style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    color: "white",
                    background: getStatusColor(cita.estado)
                  }}>
                    {cita.estado}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {cita.estado === "Pendiente" && (
                    <>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => {
                          setSelectedCita(cita);
                          setModalMode("confirmar");
                          setIsModalOpen(true);
                        }}
                      >
                        Confirmar
                      </Button>
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => {
                          setSelectedCita(cita);
                          setModalMode("reprogramar");
                          setIsModalOpen(true);
                        }}
                      >
                        <Edit size={16} style={{ marginRight: "0.5rem" }} />
                        Reprogramar
                      </Button>
                    </>
                  )}
                  {cita.estado === "Confirmado" && (
                    <>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => {
                          setSelectedCita(cita);
                          setModalMode("completar");
                          setIsModalOpen(true);
                        }}
                      >
                        <CheckCircle size={16} style={{ marginRight: "0.5rem" }} />
                        Completar
                      </Button>
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => {
                          setSelectedCita(cita);
                          setModalMode("reprogramar");
                          setIsModalOpen(true);
                        }}
                      >
                        <Edit size={16} style={{ marginRight: "0.5rem" }} />
                        Reprogramar
                      </Button>
                    </>
                  )}
                  {["Pendiente", "Confirmado"].includes(cita.estado) && (
                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => {
                        setSelectedCita(cita);
                        setModalMode("cancelar");
                        setIsModalOpen(true);
                      }}
                    >
                      <XCircle size={16} style={{ marginRight: "0.5rem" }} />
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalMode === "confirmar" && (
          <div>
            <h2 style={{ marginBottom: "1rem", color: "var(--text)" }}>Confirmar Cita</h2>
            <p className="page-copy" style={{ marginBottom: "1.5rem" }}>
              ¿Seguro que quieres confirmar la cita de {selectedCita?.mascota_nombre}?
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => handleStatusChange(selectedCita.id, "Confirmado")}>
                Confirmar
              </Button>
            </div>
          </div>
        )}
        {modalMode === "completar" && (
          <div>
            <h2 style={{ marginBottom: "1rem", color: "var(--text)" }}>Marcar como Completada</h2>
            <p className="page-copy" style={{ marginBottom: "1.5rem" }}>
              ¿Seguro que quieres marcar la cita de {selectedCita?.mascota_nombre} como completada?
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => handleStatusChange(selectedCita.id, "Completado")}>
                Completar
              </Button>
            </div>
          </div>
        )}
        {modalMode === "cancelar" && (
          <div>
            <h2 style={{ marginBottom: "1rem", color: "var(--text)" }}>Cancelar Cita</h2>
            <p className="page-copy" style={{ marginBottom: "1rem" }}>
              ¿Seguro que quieres cancelar la cita de {selectedCita?.mascota_nombre}?
            </p>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>
                Motivo de cancelación:
              </label>
              <textarea
                style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Escribe el motivo de la cancelación..."
              />
            </div>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Volver
              </Button>
              <Button variant="danger" onClick={() => handleStatusChange(selectedCita.id, "Cancelado", cancelReason)}>
                Cancelar Cita
              </Button>
            </div>
          </div>
        )}
        {modalMode === "reprogramar" && (
          <div>
            <h2 style={{ marginBottom: "1rem", color: "var(--text)" }}>Reprogramar Cita</h2>
            <p className="page-copy" style={{ marginBottom: "1rem" }}>
              Reprograma la cita de {selectedCita?.mascota_nombre}:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>
                  Fecha:
                </label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>
                  Hora:
                </label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Volver
              </Button>
              <Button variant="primary" onClick={handleReprogramar} disabled={!newDate || !newTime}>
                Reprogramar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
