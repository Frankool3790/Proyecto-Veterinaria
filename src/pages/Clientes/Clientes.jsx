import { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import api from "../../services/api";
import toast from "react-hot-toast";
import { confirmDelete } from "../../utils/swalHelper";
import { useSearch } from "../../context/SearchContext";

const columns = [
  { 
    header: "Avatar", 
    field: "avatar_url", 
    render: (val) => (
      <img 
        src={val ? `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:3002'}${val}` : '/favicon.svg'} 
        alt="Avatar" 
        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
      />
    )
  },
  { header: "Nombre", field: "nombre" },
  { header: "Teléfono", field: "telefono" },
  { header: "Email", field: "email" },
  { header: "Dirección", field: "direccion" },
];

const initialForm = {
  nombre: "",
  telefono: "",
  email: "",
  direccion: "",
  avatarUrl: "",
};

export default function Clientes() {
  const { searchTerm } = useSearch();
  const [clientes, setClientes] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      setLoading(true);
      const response = await api.get("/clientes");
      setClientes(response.data || []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los dueños.");
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

  const openEditModal = (cliente) => {
    setForm({
      nombre: cliente.nombre || "",
      telefono: cliente.telefono || "",
      email: cliente.email || "",
      direccion: cliente.direccion || "",
      avatarUrl: cliente.avatar_url || cliente.avatarUrl || "",
    });
    setEditingId(cliente.id);
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
    if (!form.nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        await api.put(`/clientes/${editingId}`, form);
        toast.success("Dueño actualizado");
      } else {
        await api.post("/clientes", form);
        toast.success("Dueño registrado");
      }
      await loadClientes();
      closeModal();
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.error || "Error guardando el dueño.";
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cliente) => {
    const result = await confirmDelete(
      '¿Eliminar dueño?',
      `Se eliminará a ${cliente.nombre} y sus mascotas permanentemente.`
    );

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await api.delete(`/clientes/${cliente.id}`);
        await loadClientes();
        toast.success("Dueño eliminado");
      } catch (err) {
        console.error(err);
        toast.error("No se pudo eliminar el dueño");
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredClientes = clientes.filter(cliente => {
    const search = searchTerm.toLowerCase();
    return (
      cliente.nombre?.toLowerCase().includes(search) ||
      cliente.email?.toLowerCase().includes(search) ||
      cliente.telefono?.toLowerCase().includes(search) ||
      cliente.direccion?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <h1 className="page-title">Dueños</h1>
          <p className="page-copy">Gestiona los dueños y sus datos de contacto para un seguimiento completo de cada mascota.</p>
        </div>
        <Button onClick={openNewModal}>Agregar dueño</Button>
      </section>

      <Table
        columns={columns}
        data={filteredClientes}
        actions={[
          { label: "Editar", variant: "secondary", onClick: openEditModal },
          { label: "Eliminar", variant: "danger", onClick: handleDelete },
        ]}
      />

      <Modal open={open} title={editingId ? "Editar dueño" : "Añadir nuevo dueño"} onClose={closeModal}>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Nombre completo</label>
            <input name="nombre" type="text" value={form.nombre} onChange={handleChange} placeholder="Nombre y apellido" />
          </div>
          <div className="form-field">
            <label>Teléfono</label>
            <input name="telefono" type="tel" value={form.telefono} onChange={handleChange} placeholder="+54 9 11 1234 5678" />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="dueño@mail.com" />
          </div>
          <div className="form-field">
            <label>Dirección</label>
            <input name="direccion" type="text" value={form.direccion} onChange={handleChange} placeholder="Calle, número, ciudad" />
          </div>
          <ImageUpload 
            label="Avatar del Cliente"
            currentImage={form.avatarUrl}
            onUploadSuccess={(url) => setForm(prev => ({ ...prev, avatarUrl: url }))}
          />
          {error && <p className="form-error">{error}</p>}
          <Button type="submit" variant="primary">{editingId ? "Actualizar dueño" : "Guardar dueño"}</Button>
        </form>
      </Modal>
    </div>
  );
}
