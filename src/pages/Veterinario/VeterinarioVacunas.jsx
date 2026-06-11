import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Button from "../../components/Button";
import Modal from "../../components/Modal/Modal";
import { Syringe, Plus, Edit, Trash2 } from "lucide-react";

export default function VeterinarioVacunas() {
  const { veterinarioId } = useAuth();
  const [vacunas, setVacunas] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVacuna, setEditingVacuna] = useState(null);
  const [formData, setFormData] = useState({
    nombreVacuna: "",
    fechaAplicacion: new Date().toISOString().split('T')[0],
    fechaProximaDosis: "",
    notas: "",
    mascotaId: ""
  });

  useEffect(() => {
    fetchMascotas();
    fetchAllVacunas();
  }, []);

  const fetchMascotas = async () => {
    try {
      const response = await api.get("/mascotas");
      setMascotas(response.data);
    } catch (error) {
      console.error("Error fetching mascotas:", error);
    }
  };

  const fetchAllVacunas = async () => {
    try {
      const response = await api.get("/vacunas");
      setVacunas(response.data);
    } catch (error) {
      console.error("Error fetching vacunas:", error);
    }
  };

  const fetchVacunasByMascota = async () => {
    try {
      if (!selectedMascota) {
        fetchAllVacunas();
        return;
      }
      const response = await api.get(`/vacunas/mascota/${selectedMascota}`);
      setVacunas(response.data);
    } catch (error) {
      console.error("Error fetching vacunas:", error);
    }
  };

  useEffect(() => {
    fetchVacunasByMascota();
  }, [selectedMascota]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, veterinarioId };
      if (editingVacuna) {
        await api.put(`/vacunas/${editingVacuna.id}`, data);
      } else {
        await api.post("/vacunas", data);
      }
      setIsModalOpen(false);
      setEditingVacuna(null);
      resetForm();
      fetchVacunasByMascota();
    } catch (error) {
      console.error("Error saving vacuna:", error);
    }
  };

  const handleEdit = (vacuna) => {
    setEditingVacuna(vacuna);
    setFormData({
      nombreVacuna: vacuna.nombre_vacuna || "",
      fechaAplicacion: vacuna.fecha_aplicacion || new Date().toISOString().split('T')[0],
      fechaProximaDosis: vacuna.fecha_proxima_dosis || "",
      notas: vacuna.notas || "",
      mascotaId: vacuna.mascota_id
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta vacuna?")) return;
    try {
      await api.delete(`/vacunas/${id}`);
      fetchVacunasByMascota();
    } catch (error) {
      console.error("Error deleting vacuna:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      nombreVacuna: "",
      fechaAplicacion: new Date().toISOString().split('T')[0],
      fechaProximaDosis: "",
      notas: "",
      mascotaId: selectedMascota
    });
  };

  const getProximasVacunas = () => {
    const hoy = new Date().toISOString().split('T')[0];
    return vacunas.filter(v => v.fecha_proxima_dosis && v.fecha_proxima_dosis >= hoy).length;
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestión de Vacunas</h1>
          <p className="page-copy">Registra y controla las vacunas de las mascotas</p>
        </div>
        <Button variant="primary" onClick={() => { setEditingVacuna(null); resetForm(); setIsModalOpen(true); }}>
          <Plus size={16} style={{ marginRight: "0.5rem" }} />
          Nueva Vacuna
        </Button>
      </div>

      <div className="stat-card" style={{ marginBottom: "1.5rem", padding: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <label style={{ color: "var(--text)" }}>Filtrar por mascota:</label>
          <select
            value={selectedMascota}
            onChange={(e) => setSelectedMascota(e.target.value)}
            style={{ padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)", minWidth: "200px" }}
          >
            <option value="">Todos</option>
            {mascotas.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre} ({m.especie})</option>
            ))}
          </select>
          <div style={{
            marginLeft: "auto",
            padding: "0.75rem 1.5rem",
            background: "rgba(239, 68, 68, 0.1)",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem"
          }}>
            <Syringe color="#ef4444" size={20} />
            <div>
              <p style={{ margin: 0, color: "var(--text)", fontWeight: "bold" }}>
                {getProximasVacunas()}
              </p>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.75rem" }}>
                Próximas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="stat-card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {vacunas.length === 0 ? (
            <p className="page-copy" style={{ textAlign: "center" }}>No hay vacunas registradas</p>
          ) : (
            vacunas.map((vacuna) => {
              const mascota = mascotas.find(m => m.id === vacuna.mascota_id);
              const esProxima = vacuna.fecha_proxima_dosis && new Date(vacuna.fecha_proxima_dosis) >= new Date();
              return (
                <div
                  key={vacuna.id}
                  style={{
                    padding: "1.25rem",
                    background: "var(--card-bg)",
                    borderRadius: "0.75rem",
                    border: "1px solid var(--border)",
                    borderLeft: esProxima ? "4px solid #ef4444" : "4px solid var(--accent-blue)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <Syringe size={16} style={{ color: esProxima ? "#ef4444" : "var(--accent-blue)" }} />
                        <h3 style={{ margin: 0, color: "var(--text)" }}>{vacuna.nombre_vacuna}</h3>
                        {esProxima && (
                          <span style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "9999px",
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            background: "#ef4444",
                            color: "white"
                          }}>Próxima</span>
                        )}
                      </div>
                      <p className="page-copy" style={{ margin: "0.25rem 0" }}>
                        <strong>Mascota:</strong> {mascota?.nombre || "N/A"}
                      </p>
                      <p className="page-copy" style={{ margin: "0.25rem 0" }}>
                        <strong>Aplicada:</strong> {new Date(vacuna.fecha_aplicacion).toLocaleDateString()}
                      </p>
                      {vacuna.fecha_proxima_dosis && (
                        <p className="page-copy" style={{ margin: "0.25rem 0" }}>
                          <strong>Próxima:</strong> {new Date(vacuna.fecha_proxima_dosis).toLocaleDateString()}
                        </p>
                      )}
                      {vacuna.notas && (
                        <p className="page-copy" style={{ margin: "0.25rem 0" }}>
                          <strong>Notas:</strong> {vacuna.notas}
                        </p>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Button variant="secondary" size="small" onClick={() => handleEdit(vacuna)}>
                        <Edit size={16} style={{ marginRight: "0.5rem" }} />
                        Editar
                      </Button>
                      <Button variant="danger" size="small" onClick={() => handleDelete(vacuna.id)}>
                        <Trash2 size={16} style={{ marginRight: "0.5rem" }} />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ maxWidth: "500px", width: "100%" }}>
          <h2 style={{ marginBottom: "1.5rem", color: "var(--text)" }}>
            {editingVacuna ? "Editar Vacuna" : "Nueva Vacuna"}
          </h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>Mascota</label>
              <select
                value={formData.mascotaId}
                onChange={(e) => setFormData({ ...formData, mascotaId: e.target.value })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
                required
              >
                <option value="">-- Seleccionar --</option>
                {mascotas.map((m) => (
                  <option key={m.id} value={m.id}>{m.nombre} ({m.especie})</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>Nombre de la Vacuna</label>
              <input
                type="text"
                value={formData.nombreVacuna}
                onChange={(e) => setFormData({ ...formData, nombreVacuna: e.target.value })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
                placeholder="Ej: Rabia"
                required
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>Fecha de Aplicación</label>
                <input
                  type="date"
                  value={formData.fechaAplicacion}
                  onChange={(e) => setFormData({ ...formData, fechaAplicacion: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
                  required
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>Próxima Dosis (opcional)</label>
                <input
                  type="date"
                  value={formData.fechaProximaDosis}
                  onChange={(e) => setFormData({ ...formData, fechaProximaDosis: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>Notas</label>
              <textarea
                value={formData.notas}
                onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                rows={3}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
                placeholder="Notas adicionales..."
              />
            </div>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "0.5rem" }}>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)} type="button">
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editingVacuna ? "Guardar Cambios" : "Crear Vacuna"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
