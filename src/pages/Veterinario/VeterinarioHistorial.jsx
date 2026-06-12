import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { FileText, Plus, Edit, Download } from "lucide-react";
import { jsPDF } from "jspdf";

export default function VeterinarioHistorial() {
  const { veterinarioId } = useAuth();
  const [historial, setHistorial] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    motivoConsulta: "",
    peso: "",
    temperatura: "",
    diagnostico: "",
    tratamiento: "",
    medicamentos: "",
    observaciones: "",
    notasPrivadas: "",
    mascotaId: ""
  });

  useEffect(() => {
    fetchMascotas();
    if (selectedMascota) {
      fetchHistorial();
    }
  }, [selectedMascota]);

  const fetchMascotas = async () => {
    try {
      const response = await api.get("/mascotas");
      setMascotas(response.data);
    } catch (error) {
      console.error("Error fetching mascotas:", error);
    }
  };

  const fetchHistorial = async () => {
    try {
      if (!selectedMascota) return;
      const response = await api.get(`/historial/mascota/${selectedMascota}`);
      setHistorial(response.data);
    } catch (error) {
      console.error("Error fetching historial:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, veterinarioId, cerrado: false };
      if (editingRecord) {
        await api.put(`/historial/${editingRecord.id}`, data);
      } else {
        await api.post("/historial", data);
      }
      setIsModalOpen(false);
      setEditingRecord(null);
      resetForm();
      fetchHistorial();
    } catch (error) {
      console.error("Error saving historial:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      fecha: record.fecha,
      motivoConsulta: record.motivo_consulta || "",
      peso: record.peso || "",
      temperatura: record.temperatura || "",
      diagnostico: record.diagnostico || "",
      tratamiento: record.tratamiento || "",
      medicamentos: record.medicamentos || "",
      observaciones: record.observaciones || "",
      notasPrivadas: record.notas_privadas || "",
      mascotaId: record.mascota_id
    });
    setIsModalOpen(true);
  };

  const generatePDF = (record) => {
    const doc = new jsPDF();
    const logo = "VETERINARIA SAN HUGO";
    const mascota = mascotas.find(m => m.id === record.mascota_id);
    const cliente = mascota ? `Propietario: ${mascota.cliente_nombre}` : "";

    doc.setFontSize(20);
    doc.text(logo, 105, 20, { align: "center" });
    doc.setFontSize(14);
    doc.text("Historia Clínica", 105, 35, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Mascota: ${mascota?.nombre || "N/A"}`, 20, 50);
    doc.text(cliente, 20, 60);
    doc.text(`Fecha: ${new Date(record.fecha).toLocaleDateString()}`, 20, 70);

    doc.setFontSize(10);
    doc.text("Motivo de Consulta:", 20, 90);
    doc.text(record.motivo_consulta || "-", 20, 100, { maxWidth: 170 });

    if (record.peso) {
      doc.text(`Peso: ${record.peso} kg`, 20, 115);
    }
    if (record.temperatura) {
      doc.text(`Temperatura: ${record.temperatura} °C`, 20, 125);
    }

    doc.text("Diagnóstico:", 20, 140);
    doc.text(record.diagnostico || "-", 20, 150, { maxWidth: 170 });

    doc.text("Tratamiento:", 20, 170);
    doc.text(record.tratamiento || "-", 20, 180, { maxWidth: 170 });

    doc.text("Medicamentos:", 20, 200);
    doc.text(record.medicamentos || "-", 20, 210, { maxWidth: 170 });

    doc.text("Observaciones:", 20, 230);
    doc.text(record.observaciones || "-", 20, 240, { maxWidth: 170 });

    doc.save(`historial-${mascota?.nombre || "mascota"}-${record.id}.pdf`);
  };

  const resetForm = () => {
    setFormData({
      fecha: new Date().toISOString().split('T')[0],
      motivoConsulta: "",
      peso: "",
      temperatura: "",
      diagnostico: "",
      tratamiento: "",
      medicamentos: "",
      observaciones: "",
      notasPrivadas: "",
      mascotaId: selectedMascota
    });
  };

  const handleOpenNew = () => {
    if (!selectedMascota) return alert("Primero selecciona una mascota");
    setEditingRecord(null);
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h1 className="page-title">Historial Clínico</h1>
          <p className="page-copy">Gestiona el historial médico de las mascotas</p>
        </div>
      </div>

      <div className="stat-card" style={{ marginBottom: "1.5rem", padding: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <label style={{ color: "var(--text)" }}>Selecciona una mascota:</label>
          <select
            value={selectedMascota}
            onChange={(e) => setSelectedMascota(e.target.value)}
            style={{ padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)", minWidth: "200px" }}
          >
            <option value="">-- Seleccionar --</option>
            {mascotas.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre} ({m.especie})</option>
            ))}
          </select>
          <Button variant="primary" onClick={handleOpenNew} disabled={!selectedMascota}>
            <Plus size={16} style={{ marginRight: "0.5rem" }} />
            Nuevo Registro
          </Button>
        </div>
      </div>

      {selectedMascota && (
        <div className="stat-card" style={{ padding: "1.5rem" }}>
          <h2 style={{ marginBottom: "1.5rem", color: "var(--text)" }}>
            Historial de {mascotas.find(m => m.id === parseInt(selectedMascota))?.nombre}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {historial.length === 0 ? (
              <p className="page-copy" style={{ textAlign: "center" }}>No hay registros para esta mascota</p>
            ) : (
              historial.map((record) => (
                <div
                  key={record.id}
                  style={{
                    padding: "1.25rem",
                    background: "var(--card-bg)",
                    borderRadius: "0.75rem",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <FileText size={16} style={{ color: "var(--accent-blue)" }} />
                        <h3 style={{ margin: 0, color: "var(--text)" }}>
                          {new Date(record.fecha).toLocaleDateString()}
                        </h3>
                        {record.cerrado && (
                          <span style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "9999px",
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            background: "var(--accent-blue)",
                            color: "white"
                          }}>Cerrado</span>
                        )}
                      </div>
                      <p className="page-copy" style={{ margin: "0.25rem 0" }}>
                        <strong>Motivo:</strong> {record.motivo_consulta}
                      </p>
                      <p className="page-copy" style={{ margin: "0.25rem 0" }}>
                        <strong>Diagnóstico:</strong> {record.diagnostico}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {!record.cerrado && (
                        <Button variant="secondary" size="small" onClick={() => handleEdit(record)}>
                          <Edit size={16} style={{ marginRight: "0.5rem" }} />
                          Editar
                        </Button>
                      )}
                      <Button variant="secondary" size="small" onClick={() => generatePDF(record)}>
                        <Download size={16} style={{ marginRight: "0.5rem" }} />
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ maxWidth: "600px", width: "100%" }}>
          <h2 style={{ marginBottom: "1.5rem", color: "var(--text)" }}>
            {editingRecord ? "Editar Registro" : "Nuevo Registro"}
          </h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>Fecha</label>
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
                required
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>Motivo de Consulta</label>
              <input
                type="text"
                value={formData.motivoConsulta}
                onChange={(e) => setFormData({ ...formData, motivoConsulta: e.target.value })}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
                required
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>Peso (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.peso}
                  onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>Temperatura (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.temperatura}
                  onChange={(e) => setFormData({ ...formData, temperatura: e.target.value })}
                  style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>Diagnóstico</label>
              <textarea
                value={formData.diagnostico}
                onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value })}
                rows={3}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
                required
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>Tratamiento</label>
              <textarea
                value={formData.tratamiento}
                onChange={(e) => setFormData({ ...formData, tratamiento: e.target.value })}
                rows={3}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>Medicamentos</label>
              <textarea
                value={formData.medicamentos}
                onChange={(e) => setFormData({ ...formData, medicamentos: e.target.value })}
                rows={2}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>Observaciones</label>
              <textarea
                value={formData.observaciones}
                onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                rows={2}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text)" }}>Notas Privadas (Solo Veterinarios)</label>
              <textarea
                value={formData.notasPrivadas}
                onChange={(e) => setFormData({ ...formData, notasPrivadas: e.target.value })}
                rows={2}
                style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "var(--input-bg)", color: "var(--text)" }}
              />
            </div>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "0.5rem" }}>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)} type="button">
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editingRecord ? "Guardar Cambios" : "Crear Registro"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
