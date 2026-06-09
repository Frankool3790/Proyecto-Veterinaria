import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import api from "../../services/api";

const columns = [
  { label: "Fecha", field: "fecha" },
  { label: "Hora", field: "hora" },
  { label: "Mascota", field: "mascotaName" },
  { label: "Veterinario", field: "veterinarioName" },
  { label: "Estado", field: "estado" },
];

const initialForm = {
  fecha: "",
  hora: "",
  motivo: "",
  estado: "Pendiente",
  mascotaId: "",
  veterinarioId: "",
};

export default function Citas() {
  const [citas, setCitas] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCitas();
    loadMascotas();
    loadVeterinarios();
  }, []);

  const loadCitas = async () => {
    try {
      const response = await api.get("/citas");
      setCitas(response.data || []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los turnos.");
    }
  };

  const loadMascotas = async () => {
    try {
      const response = await api.get("/mascotas");
      setMascotas(response.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadVeterinarios = async () => {
    try {
      const response = await api.get("/veterinarios");
      setVeterinarios(response.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setError("");
  };

  const openNewModal = () => {
    resetForm();
    setOpen(true);
  };

  const openEditModal = (cita) => {
    setForm({
      fecha: cita.fecha || "",
      hora: cita.hora || "",
      motivo: cita.motivo || "",
      estado: cita.estado || "Pendiente",
      mascotaId: cita.mascota_id || cita.mascotaId || "",
      veterinarioId: cita.veterinario_id || cita.veterinarioId || "",
    });
    setEditingId(cita.id);
    setOpen(true);
    setError("");
  };

  const closeModal = () => {
    setOpen(false);
    resetForm();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.fecha || !form.hora || !form.mascotaId || !form.veterinarioId) {
      setError("Fecha, hora, mascota y veterinario son obligatorios.");
      return;
    }

    try {
      const payload = {
        fecha: form.fecha,
        hora: form.hora,
        motivo: form.motivo,
        estado: form.estado,
        mascotaId: Number(form.mascotaId),
        veterinarioId: Number(form.veterinarioId),
      };

      if (editingId) {
        await api.put(`/citas/${editingId}`, payload);
      } else {
        await api.post("/citas", payload);
      }
      await loadCitas();
      closeModal();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Error guardando el turno.");
    }
  };

  const handleDelete = async (cita) => {
    const confirmed = window.confirm(`Eliminar turno del ${cita.fecha} a las ${cita.hora}?`);
    if (!confirmed) return;

    try {
      await api.delete(`/citas/${cita.id}`);
      await loadCitas();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el turno.");
    }
  };

  const mascotaMap = new Map(mascotas.map((item) => [item.id, item.nombre]));
  const vetMap = new Map(veterinarios.map((item) => [item.id, item.nombre]));

  const displayCitas = citas.map((cita) => ({
    ...cita,
    mascotaName: mascotaMap.get(cita.mascota_id) || "Sin mascota",
    veterinarioName: vetMap.get(cita.veterinario_id) || "Sin veterinario",
  }));

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <h1 className="page-title">Turnos</h1>
          <p className="page-copy">Planifica y revisa los turnos disponibles en la clínica veterinaria.</p>
        </div>
        <Button onClick={openNewModal}>Crear turno</Button>
      </section>

      <Table
        columns={columns}
        data={displayCitas}
        actions={[
          { label: "Editar", variant: "secondary", onClick: openEditModal },
          { label: "Eliminar", variant: "danger", onClick: handleDelete },
        ]}
      />

      <Modal open={open} title={editingId ? "Editar turno" : "Nuevo turno"} onClose={closeModal}>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Fecha</label>
            <input name="fecha" type="date" value={form.fecha} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Hora</label>
            <input name="hora" type="time" value={form.hora} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label>Mascota</label>
            <select name="mascotaId" value={form.mascotaId} onChange={handleChange} required>
              <option value="">Selecciona una mascota</option>
              {mascotas.map((mascota) => (
                <option key={mascota.id} value={mascota.id}>{mascota.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>Veterinario</label>
            <select name="veterinarioId" value={form.veterinarioId} onChange={handleChange} required>
              <option value="">Selecciona un veterinario</option>
              {veterinarios.map((vet) => (
                <option key={vet.id} value={vet.id}>{vet.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-field" style={{ gridColumn: "1 / -1" }}>
            <label>Motivo</label>
            <textarea 
              name="motivo" 
              value={form.motivo} 
              onChange={handleChange} 
              placeholder="Describa el motivo de la consulta..."
              rows="3"
            />
          </div>
          <div className="form-field">
            <label>Estado</label>
            <select name="estado" value={form.estado} onChange={handleChange}>
              <option value="Pendiente">Pendiente</option>
              <option value="Completada">Completada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
          {error && <p className="error-message" style={{ gridColumn: "1 / -1" }}>{error}</p>}
          <div className="form-actions" style={{ gridColumn: "1 / -1", marginTop: "1rem" }}>
            <Button type="submit" variant="primary" style={{ width: "100%" }}>
              {editingId ? "Actualizar Turno" : "Guardar Turno"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
