import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";
import { confirmDelete } from "../../utils/swalHelper";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, Trash2 } from "lucide-react";
import { useSearch } from "../../context/SearchContext";

export default function PagosTrash() {
  const { searchTerm } = useSearch();
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrash();
  }, []);

  const fetchTrash = async () => {
    try {
      setLoading(true);
      const response = await api.get("/pagos/trash");
      setPagos(response.data || []);
    } catch (error) {
      console.error("Error al obtener papelera:", error);
      toast.error("Error al cargar la papelera");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (pago) => {
    try {
      await api.put(`/pagos/restore/${pago.id}`);
      toast.success("Registro restaurado");
      fetchTrash();
    } catch (error) {
      console.error("Error restoring payment:", error);
      toast.error("No se pudo restaurar el registro");
    }
  };

  const handleHardDelete = async (pago) => {
    const result = await confirmDelete(
      '¿Eliminar permanentemente?',
      `Esta acción no se puede deshacer. Se eliminará el registro de ${pago.cliente_nombre}.`
    );

    if (result.isConfirmed) {
      try {
        await api.delete(`/pagos/hard/${pago.id}`);
        toast.success("Eliminado permanentemente");
        fetchTrash();
      } catch (error) {
        console.error("Error hard deleting payment:", error);
        toast.error("No se pudo eliminar el registro permanentemente");
      }
    }
  };

  const filteredPagos = pagos.filter(pago => {
    const search = searchTerm.toLowerCase();
    return (
      pago.cliente_nombre?.toLowerCase().includes(search) ||
      pago.metodo_pago?.toLowerCase().includes(search) ||
      pago.descripcion?.toLowerCase().includes(search) ||
      pago.monto?.toString().includes(search)
    );
  });

  const tableColumns = [
    { header: "Fecha", field: "fecha", render: (val) => new Date(val).toLocaleString() },
    { header: "Cliente", field: "cliente_nombre" },
    { header: "Monto", field: "monto", render: (val) => `$${Number(val).toLocaleString('es-CO')}` },
    { header: "Método", field: "metodo_pago" }
  ];

  const actions = [
    { 
      label: <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><RefreshCw size={14} /> Restaurar</div>, 
      variant: "primary", 
      onClick: (row) => handleRestore(row) 
    },
    { 
      label: <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Trash2 size={14} /> Borrar</div>, 
      variant: "danger", 
      onClick: (row) => handleHardDelete(row) 
    }
  ];

  return (
    <div className="page-shell">
      <section className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="icon-btn" onClick={() => navigate("/pagos")}>
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="page-title">Papelera de Pagos</h1>
            <p className="page-copy">Registros eliminados recientemente. Puedes restaurarlos o borrarlos permanentemente.</p>
          </div>
        </div>
      </section>

      <Table columns={tableColumns} data={filteredPagos} actions={actions} loading={loading} />
    </div>
  );
}
