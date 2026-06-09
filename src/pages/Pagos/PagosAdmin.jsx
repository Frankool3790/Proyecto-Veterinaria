import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import { generatePaymentPDF } from "../../utils/pdfGenerator";
import toast from "react-hot-toast";
import { confirmDelete } from "../../utils/swalHelper";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function PagosAdmin() {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPagos();
  }, []);

  const fetchPagos = async () => {
    try {
      setLoading(true);
      const response = await api.get("/pagos");
      setPagos(response.data);
    } catch (error) {
      console.error("Error al obtener pagos:", error);
      toast.error("Error al cargar los pagos");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = (pago) => {
    try {
      generatePaymentPDF(pago);
      toast.success("PDF generado correctamente");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error al generar el PDF. Verifica los datos del pago.");
    }
  };

  const handleDelete = async (pago) => {
    const result = await confirmDelete(
      '¿Mover a la papelera?',
      `El registro de pago de ${pago.cliente_nombre} se moverá a la papelera.`
    );

    if (result.isConfirmed) {
      try {
        await api.delete(`/pagos/soft/${pago.id}`);
        toast.success("Movido a la papelera");
        fetchPagos();
      } catch (error) {
        console.error("Error deleting payment:", error);
        toast.error("No se pudo eliminar el registro");
      }
    }
  };

  const columns = [
    { header: "Fecha", accessor: "fecha", render: (val) => new Date(val).toLocaleString() },
    { header: "Cliente", accessor: "cliente_nombre" },
    { header: "Monto", accessor: "monto", render: (val) => `$${Number(val).toLocaleString('es-CO')}` },
    { header: "Método", accessor: "metodo_pago" },
    { header: "Descripción", accessor: "descripcion" }
  ];

  const actions = [
    { label: "Descargar PDF", variant: "primary", onClick: (row) => handleDownloadPDF(row) },
    { label: "Eliminar", variant: "danger", onClick: (row) => handleDelete(row) }
  ];

  // Ajuste para el componente Table que usa 'field' en lugar de 'accessor' a veces
  const tableColumns = columns.map(col => ({
    header: col.header,
    field: col.accessor
  }));

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <h1 className="page-title">Gestión de Pagos</h1>
          <p className="page-copy">Revisa los ingresos y genera certificados para los clientes.</p>
        </div>
        <Button variant="secondary" onClick={() => navigate("/pagos/papelera")} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Trash2 size={18} />
          Ver Papelera
        </Button>
      </section>

      <Table columns={tableColumns} data={pagos} actions={actions} loading={loading} />
    </div>
  );
}
