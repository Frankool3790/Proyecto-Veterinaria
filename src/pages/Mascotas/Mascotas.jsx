import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import api from "../../services/api";

const columns = [
  { label: "Mascota", field: "nombre" },
  { label: "Tipo", field: "especie" },
  { label: "Raza", field: "raza" },
  { label: "Edad", field: "edad" },
  { label: "Dueño", field: "owner" },
];

const initialForm = {
  nombre: "",
  especie: "Perro",
  raza: "",
  edad: "",
  clienteId: "",
};

export default function Mascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMascotas();
    loadClientes();
  }, []);

  const loadMascotas = async () => {
    try {
      const response = await api.get("/mascotas");
      setMascotas(response.data || []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las mascotas.");
    }
  };

  const loadClientes = async () => {
    try {
      const response = await api.get("/clientes");
      setClientes(response.data || []);
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

  const openEditModal = (mascota) => {
    setForm({
      nombre: mascota.nombre || "",
      especie: mascota.especie || "Perro",
      raza: mascota.raza || "",
      edad: mascota.edad || "",
      clienteId: mascota.cliente_id || mascota.clienteId || "",
    });
    setEditingId(mascota.id);
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
    if (!form.nombre.trim() || !form.clienteId) {
      setError("Nombre y dueño son obligatorios.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        nombre: form.nombre,
        especie: form.especie,
        raza: form.raza,
        edad: form.edad ? Number(form.edad) : null,
        clienteId: Number(form.clienteId),
      };

      if (editingId) {
        await api.put(`/mascotas/${editingId}`, payload);
      } else {
        await api.post("/mascotas", payload);
      }
      await loadMascotas();
      closeModal();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Error guardando la mascota.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (mascota) => {
    const confirmed = window.confirm(`Eliminar a ${mascota.nombre}?`);
    if (!confirmed) return;

    try {
      setLoading(true);
      await api.delete(`/mascotas/${mascota.id}`);
      await loadMascotas();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar la mascota.");
    } finally {
      setLoading(false);
    }
  };

  const clienteMap = new Map(clientes.map((cliente) => [cliente.id, cliente.nombre]));
  const displayMascotas = mascotas.map((mascota) => ({
    ...mascota,
    owner: clienteMap.get(mascota.cliente_id) || "Sin dueño",
  }));

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <h1 className="page-title">Mascotas</h1>
          <p className="page-copy">Registra y administra cada mascota con su dueño y su historial de turnos.</p>
        </div>
        <Button onClick={openNewModal}>Agregar mascota</Button>
      </section>

      <Table
        columns={columns}
        data={displayMascotas}
        actions={[
          { label: "Editar", variant: "secondary", onClick: openEditModal },
          { label: "Eliminar", variant: "danger", onClick: handleDelete },
        ]}
      />

      <Modal open={open} title={editingId ? "Editar mascota" : "Agregar mascota"} onClose={closeModal}>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Nombre</label>
            <input name="nombre" type="text" value={form.nombre} onChange={handleChange} placeholder="Ej. Canela" />
          </div>
          <div className="form-field">
            <label>Tipo</label>
            <select name="especie" value={form.especie} onChange={handleChange}>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="form-field">
            <label>Raza</label>
            <input name="raza" type="text" value={form.raza} onChange={handleChange} placeholder="Ej. Labrador" />
          </div>
          <div className="form-field">
            <label>Edad</label>
            <input name="edad" type="number" value={form.edad} onChange={handleChange} placeholder="Ej. 4" />
          </div>
          <div className="form-field">
            <label>Dueño</label>
            <select name="clienteId" value={form.clienteId} onChange={handleChange}>
              <option value="">Selecciona un dueño</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="form-error">{error}</p>}
          <Button type="submit" variant="primary">{editingId ? "Actualizar mascota" : "Guardar mascota"}</Button>
        </form>
      </Modal>
    </div>
  );
}
