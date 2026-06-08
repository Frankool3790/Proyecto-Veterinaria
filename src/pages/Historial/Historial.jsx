import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import api from "../../services/api";

const columns = [
  { label: "Fecha", field: "fecha" },
  { label: "Mascota", field: "mascotaName" },
  { label: "Procedimiento", field: "descripcion" },
  { label: "Notas", field: "notas" },
];

const initialForm = {
  descripcion: "",
  fecha: "",
  notas: "",
  mascotaId: "",
};

export default function Historial() {
  const [historial, setHistorial] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    loadHistorial();
    loadMascotas();
  }, []);

  const loadHistorial = async () => {
    try {
      const response = await api.get("/historial");
      setHistorial(response.data || []);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar el historial.");
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

  const resetForm = () => {
    setForm(initialForm);
    setError("");
  };

  const openNewModal = () => {
    resetForm();
    setOpen(true);
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
    if (!form.descripcion.trim() || !form.fecha || !form.mascotaId) {
      setError("Descripción, fecha y mascota son obligatorios.");
      return;
    }

    try {
      await api.post("/historial", {
        descripcion: form.descripcion,
        fecha: form.fecha,
        notas: form.notas,
        mascotaId: Number(form.mascotaId),
      });
      await loadHistorial();
      closeModal();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Error guardando el registro de historial.");
    }
  };

  const handleDelete = async (record) => {
    const confirmed = window.confirm(`Eliminar registro del ${record.fecha}?`);
    if (!confirmed) return;

    try {
      await api.delete(`/historial/${record.id}`);
      await loadHistorial();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el historial.");
    }
  };

  const mascotaMap = new Map(mascotas.map((mascota) => [mascota.id, mascota.nombre]));
  const displayHistorial = historial.map((record) => ({
    ...record,
    mascotaName: mascotaMap.get(record.mascota_id) || "Sin mascota",
  }));

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <h1 className="page-title">Historial</h1>
          <p className="page-copy">Registros de procedimientos y seguimiento médico de cada mascota.</p>
        </div>
        <Button onClick={openNewModal}>Agregar registro</Button>
      </section>

      <Table
        columns={columns}
        data={displayHistorial}
        actions={[
          { label: "Eliminar", variant: "danger", onClick: handleDelete },
        ]}
      />

      <Modal open={open} title="Agregar historial" onClose={closeModal}>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Descripción</label>
            <input name="descripcion" type="text" value={form.descripcion} onChange={handleChange} placeholder="Ej. Vacunación" />
          </div>
          <div className="form-field">
            <label>Fecha</label>
            <input name="fecha" type="date" value={form.fecha} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label>Mascota</label>
            <select name="mascotaId" value={form.mascotaId} onChange={handleChange}>
              <option value="">Selecciona una mascota</option>
              {mascotas.map((mascota) => (
                <option key={mascota.id} value={mascota.id}>{mascota.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>Notas</label>
            <textarea name="notas" value={form.notas} onChange={handleChange} placeholder="Notas adicionales" />
          </div>
          {error && <p className="form-error">{error}</p>}
          <Button type="submit" variant="primary">Guardar historial</Button>
        </form>
      </Modal>
    </div>
  );
}
