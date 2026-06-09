import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import api from "../../services/api";
import { useSearch } from "../../context/SearchContext";

const columns = [
  { label: "Nombre", field: "nombre" },
  { label: "Especialidad", field: "especialidad" },
  { label: "Email", field: "email" },
];

const initialForm = {
  nombre: "",
  especialidad: "",
  email: "",
};

export default function Veterinarios() {
  const { searchTerm } = useSearch();
  const [veterinarios, setVeterinarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadVeterinarios();
  }, []);

  const loadVeterinarios = async () => {
    try {
      const response = await api.get("/veterinarios");
      setVeterinarios(response.data || []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los veterinarios.");
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

  const openEditModal = (vet) => {
    setForm({
      nombre: vet.nombre || "",
      especialidad: vet.especialidad || "",
      email: vet.email || "",
    });
    setEditingId(vet.id);
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
    if (!form.nombre.trim() || !form.especialidad.trim() || !form.email.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/veterinarios/${editingId}`, form);
      } else {
        await api.post("/veterinarios", form);
      }
      await loadVeterinarios();
      closeModal();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Error guardando el veterinario.");
    }
  };

  const handleDelete = async (vet) => {
    const confirmed = window.confirm(`Eliminar al veterinario ${vet.nombre}?`);
    if (!confirmed) return;

    try {
      await api.delete(`/veterinarios/${vet.id}`);
      await loadVeterinarios();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el veterinario.");
    }
  };

  const filteredVeterinarios = veterinarios.filter((vet) => {
    const search = (searchTerm || "").toLowerCase();
    return (
      vet.nombre?.toLowerCase().includes(search) ||
      vet.especialidad?.toLowerCase().includes(search) ||
      vet.email?.toLowerCase().includes(search) ||
      vet.telefono?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <h1 className="page-title">Veterinarios</h1>
          <p className="page-copy">Conoce al equipo médico encargado del cuidado de cada mascota.</p>
        </div>
        <Button onClick={openNewModal}>Agregar veterinario</Button>
      </section>

      <Table
        columns={columns}
        data={filteredVeterinarios}
        actions={[
          { label: "Editar", variant: "secondary", onClick: openEditModal },
          { label: "Eliminar", variant: "danger", onClick: handleDelete },
        ]}
      />

      <Modal open={open} title={editingId ? "Editar veterinario" : "Nuevo veterinario"} onClose={closeModal}>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Nombre</label>
            <input name="nombre" type="text" value={form.nombre} onChange={handleChange} placeholder="Nombre del veterinario" />
          </div>
          <div className="form-field">
            <label>Especialidad</label>
            <input name="especialidad" type="text" value={form.especialidad} onChange={handleChange} placeholder="Ej. Cirugía" />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="veterinario@mail.com" />
          </div>
          {error && <p className="form-error">{error}</p>}
          <Button type="submit" variant="primary">{editingId ? "Actualizar veterinario" : "Guardar veterinario"}</Button>
        </form>
      </Modal>
    </div>
  );
}
