import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function PagosAdmin() {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPagos();
  }, []);

  const fetchPagos = async () => {
    try {
      const response = await api.get("/pagos");
      setPagos(response.data);
    } catch (error) {
      console.error("Error al obtener pagos:", error);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = (pago) => {
    const doc = new jsPDF();
    
    // Configuración estética del PDF
    doc.setFillColor(30, 58, 138); // Blue-900
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("CERTIFICADO DE PAGO", 105, 25, { align: "center" });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 150, 50);
    
    doc.setFont("helvetica", "bold");
    doc.text("Detalles del Cliente:", 20, 70);
    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${pago.cliente_nombre || 'N/A'}`, 20, 80);
    doc.text(`ID de Pago: #PAG-${pago.id}`, 20, 90);
    
    doc.autoTable({
      startY: 110,
      head: [['Descripción', 'Método', 'Fecha', 'Monto']],
      body: [[
        pago.descripcion || 'Servicios Veterinarios',
        pago.metodo_pago,
        new Date(pago.fecha).toLocaleDateString(),
        `$${pago.monto.toFixed(2)}`
      ]],
      headStyles: { fillColor: [76, 29, 149] }, // Ness Purple
    });
    
    const finalY = doc.lastAutoTable.finalY + 30;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL PAGADO: $${pago.monto.toFixed(2)}`, 140, finalY);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Gracias por confiar en Veterinaria San Hyuga", 105, 280, { align: "center" });
    
    doc.save(`Certificado_Pago_${pago.id}.pdf`);
  };

  const columns = [
    { header: "Fecha", accessor: "fecha", render: (val) => new Date(val).toLocaleDateString() },
    { header: "Cliente", accessor: "cliente_nombre" },
    { header: "Monto", accessor: "monto", render: (val) => `$${val.toFixed(2)}` },
    { header: "Método", accessor: "metodo_pago" },
    { header: "Descripción", accessor: "descripcion" }
  ];

  const actions = [
    { label: "Descargar PDF", variant: "primary", onClick: (row) => generatePDF(row) }
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
      </section>

      {loading ? (
        <p>Cargando registros de pagos...</p>
      ) : (
        <Table columns={tableColumns} data={pagos} actions={actions} />
      )}
    </div>
  );
}
