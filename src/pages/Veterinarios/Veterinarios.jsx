import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import api from "../../services/api";
import toast from "react-hot-toast";
import { confirmDelete } from "../../utils/swalHelper";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVeterinarios();
  }, []);

  const loadVeterinarios = async () => {
    try {
      setLoading(true);
      const response = await api.get("/veterinarios");
      setVeterinarios(response.data || []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los veterinarios.");
    } finally {
      setLoading(false);
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
      setLoading(true);
      if (editingId) {
        await api.put(`/veterinarios/${editingId}`, form);
        toast.success("Veterinario actualizado");
      } else {
        await api.post("/veterinarios", form);
        toast.success("Veterinario registrado");
      }
      await loadVeterinarios();
      closeModal();
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.error || "Error guardando el veterinario.";
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vet) => {
    const result = await confirmDelete(
      "¿Eliminar veterinario?",
      `Se eliminará a ${vet.nombre} permanentemente.`
    );
    if (!result.isConfirmed) return;

    try {
      setLoading(true);
      await api.delete(`/veterinarios/${vet.id}`);
      await loadVeterinarios();
      toast.success("Veterinario eliminado");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo eliminar el veterinario.");
      setError("No se pudo eliminar el veterinario.");
    } finally {
      setLoading(false);
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
        loading={loading}
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
          <Button type="submit" variant="primary" disabled={loading}>
            {editingId ? "Actualizar veterinario" : "Guardar veterinario"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
