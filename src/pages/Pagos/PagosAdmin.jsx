import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import { generatePaymentPDF } from "../../utils/pdfGenerator";
import toast from "react-hot-toast";
import { confirmDelete } from "../../utils/swalHelper";
import { useNavigate } from "react-router-dom";
import { Trash2, FileText } from "lucide-react";
import { useSearch } from "../../context/SearchContext";
import Modal from "../../components/Modal/Modal";
import QRCode from "qrcode";

export default function PagosAdmin() {
  const { searchTerm } = useSearch();
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFacturaModal, setShowFacturaModal] = useState(false);
  const [selectedPago, setSelectedPago] = useState(null);
  const [qrCode, setQrCode] = useState("");
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

  const handleOpenFactura = async (pago) => {
    const facturaNum = `SH-${new Date().getFullYear()}-${String(pago.id).padStart(6, '0')}`;
    const qrUrl = `https://sanhyuga.com/verificar/${facturaNum}`;
    const qrDataUrl = await QRCode.toDataURL(qrUrl);
    
    // Intentar encontrar el nombre de la mascota si el objeto pago tiene el ID
    let mascotaNombre = "Canela";
    if (pago.mascota_nombre) {
      mascotaNombre = pago.mascota_nombre;
    }

    setSelectedPago({
      ...pago,
      facturaNum,
      mascotaNombre,
      veterinario: pago.veterinario_nombre || "Dr. Franklyn Casas",
      iva: 0,
      total: Number(pago.monto)
    });
    setQrCode(qrDataUrl);
    setShowFacturaModal(true);
  };

  const handlePrint = () => {
    window.print();
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
    { label: <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><FileText size={16}/> Factura</div>, variant: "primary", onClick: (row) => handleOpenFactura(row) },
    { label: "Eliminar", variant: "danger", onClick: (row) => handleDelete(row) }
  ];

  const filteredPagos = pagos.filter(pago => {
    const search = searchTerm.toLowerCase();
    return (
      pago.cliente_nombre?.toLowerCase().includes(search) ||
      pago.metodo_pago?.toLowerCase().includes(search) ||
      pago.descripcion?.toLowerCase().includes(search) ||
      pago.monto?.toString().includes(search)
    );
  });

  // Ajuste para el componente Table que usa 'field' en lugar de 'accessor' a veces
  const tableColumns = columns.map(col => ({
    header: col.header,
    field: col.accessor,
    render: col.render
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

      <Table columns={tableColumns} data={filteredPagos} actions={actions} loading={loading} />

      {/* Modal de Factura para Impresión/PDF */}
      {showFacturaModal && selectedPago && (
        <Modal 
          open={showFacturaModal} 
          title="Comprobante de Facturación" 
          onClose={() => setShowFacturaModal(false)}
          maxWidth="1000px"
        >
          <div className="factura-print-container" id="factura-atencion" style={{ padding: '0.5rem' }}>
            <style>{`
              @media print {
                /* Ocultar todo el sitio excepto la factura */
                body * { visibility: hidden; }
                
                /* El contenedor de la factura y sus hijos deben ser visibles */
                #factura-atencion, #factura-atencion * { 
                  visibility: visible !important; 
                }
                
                /* Resetear el body para que no tenga fondos ni colores extraños */
                body {
                  background: white !important;
                  margin: 0 !important;
                  padding: 0 !important;
                }

                /* Forzar que el contenedor principal de la factura ignore el modal */
                #factura-atencion { 
                  position: fixed !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  height: auto !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  z-index: 9999 !important;
                  background: white !important;
                }
                
                /* Ocultar elementos del modal que causan el fondo azul/oscuro */
                .modal-overlay, .modal-content { 
                  background: transparent !important;
                  box-shadow: none !important;
                  border: none !important;
                  padding: 0 !important;
                  margin: 0 !important;
                  position: static !important;
                  width: 100% !important;
                  max-width: none !important;
                  backdrop-filter: none !important;
                }

                .modal-header, .no-print { 
                  display: none !important; 
                }

                .factura-wrapper {
                  box-shadow: none !important;
                  border: none !important;
                  width: 100% !important;
                  max-width: none !important;
                  margin: 0 !important;
                }
              }

              .factura-wrapper {
                 background: white;
                 border-radius: 12px;
                 box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                 overflow: hidden;
                 border: 1px solid #e2e8f0;
                 color: #1e293b;
                 max-width: 900px;
                 margin: 0 auto;
               }
               .factura-body { 
                 padding: 2.5rem; 
                 background: white;
                 font-family: 'Inter', sans-serif;
               }
               .factura-header { 
                 border-bottom: 2px solid #1e3a8a; 
                 padding-bottom: 1.5rem; 
                 margin-bottom: 2rem; 
                 display: flex; 
                 justify-content: space-between; 
                 align-items: center; 
                 flex-wrap: wrap;
                 gap: 1rem;
               }
               .factura-title { color: #1e3a8a; font-weight: 900; font-size: 1.5rem; letter-spacing: -0.025em; }
               .factura-details { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-bottom: 2.5rem; }
               .detail-group { display: flex; flex-direction: column; gap: 1rem; }
               .detail-item { display: flex; flex-direction: column; }
               .detail-label { font-weight: 700; color: #64748b; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.2rem; }
               .detail-value { font-size: 1rem; font-weight: 700; color: #1e293b; }
               .factura-table-container { overflow-x: auto; margin: 2rem 0; }
               .factura-table { width: 100%; border-collapse: collapse; min-width: 500px; }
               .factura-table th { background: #f8fafc; border-bottom: 2px solid #e2e8f0; padding: 0.75rem 1rem; text-align: left; color: #1e3a8a; font-weight: 800; font-size: 0.8rem; text-transform: uppercase; }
               .factura-table td { padding: 1rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-weight: 500; font-size: 0.9rem; }
               .factura-totals { margin-left: auto; width: 100%; max-width: 280px; background: #f8fafc; padding: 1.25rem; border-radius: 8px; }
               .total-row { display: flex; justify-content: space-between; padding: 0.4rem 0; color: #475569; font-size: 0.9rem; }
               .total-final { font-size: 1.3rem; font-weight: 900; color: #1e3a8a; border-top: 2px solid #cbd5e1; margin-top: 0.75rem; padding-top: 0.75rem; }
               .factura-footer { margin-top: 4rem; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 2rem; }
               .firma-box { text-align: center; border-top: 2px solid #cbd5e1; width: 100%; max-width: 200px; padding-top: 0.75rem; color: #1e293b; }
               .qr-box { text-align: center; background: white; padding: 8px; border: 1px solid #e2e8f0; border-radius: 8px; }
               .qr-box img { width: 90px; height: 90px; }
               .status-stamp {
                 display: inline-block;
                 padding: 0.4rem 1.2rem;
                 border: 3px solid #059669;
                 color: #059669;
                 font-weight: 900;
                 font-size: 1.2rem;
                 text-transform: uppercase;
                 border-radius: 8px;
                 transform: rotate(-5deg);
                 opacity: 0.8;
                 margin-bottom: 1.5rem;
               }
               @media (max-width: 640px) {
                 .factura-body { padding: 1.5rem; }
                 .factura-footer { flex-direction: column; align-items: center; text-align: center; }
                 .factura-totals { max-width: 100%; }
               }
             `}</style>

              <div className="factura-wrapper">
                <div className="factura-body">
                  <div className="factura-header">
                    <div>
                      <div className="factura-title">VETERINARIA SAN HYUGA</div>
                      <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.1rem 0 0' }}>NIT: 123.456.789-0</p>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>Calle 13 #9-84, Soacha</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '800', color: '#64748b', fontSize: '0.8rem' }}>FACTURA DE VENTA</div>
                      <div style={{ color: '#be185d', fontWeight: '900', fontSize: '1.2rem' }}>{selectedPago.facturaNum}</div>
                    </div>
                  </div>

                  <div className="factura-details">
                    <div className="detail-group">
                      <div className="detail-item">
                        <div className="detail-label">Cliente / Dueño</div>
                        <div className="detail-value">{selectedPago.cliente_nombre}</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Paciente (Mascota)</div>
                        <div className="detail-value">{selectedPago.mascotaNombre}</div>
                      </div>
                    </div>
                    <div className="detail-group">
                      <div className="detail-item">
                        <div className="detail-label">Médico Veterinario</div>
                        <div className="detail-value">{selectedPago.veterinario}</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Fecha de Emisión</div>
                        <div className="detail-value">{new Date(selectedPago.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                      </div>
                    </div>
                  </div>

                  <div className="factura-table-container">
                    <table className="factura-table">
                      <thead>
                        <tr>
                          <th>Descripción del Servicio</th>
                          <th style={{ textAlign: 'right' }}>Unitario</th>
                          <th style={{ textAlign: 'right' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{selectedPago.descripcion || "Consulta Veterinaria General"}</td>
                          <td style={{ textAlign: 'right' }}>${Number(selectedPago.monto).toLocaleString('es-CO')}</td>
                          <td style={{ textAlign: 'right' }}>${Number(selectedPago.monto).toLocaleString('es-CO')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                      <div className="detail-label">Estado de Transacción</div>
                      <div className="status-stamp">PAGADO</div>
                    </div>
                    
                    <div className="factura-totals">
                      <div className="total-row">
                        <span>Subtotal:</span>
                        <span style={{ fontWeight: '700' }}>${Number(selectedPago.monto).toLocaleString('es-CO')}</span>
                      </div>
                      <div className="total-row">
                        <span>IVA (0%):</span>
                        <span style={{ fontWeight: '700' }}>$0</span>
                      </div>
                      <div className="total-row total-final">
                        <span>TOTAL:</span>
                        <span>${Number(selectedPago.monto).toLocaleString('es-CO')} COP</span>
                      </div>
                    </div>
                  </div>

                  <div className="factura-footer">
                    <div className="qr-box">
                      <img src={qrCode} alt="QR Verification" />
                      <div style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: '700', marginTop: '0.3rem', textTransform: 'uppercase' }}>Validación Digital</div>
                    </div>
                    <div className="firma-box">
                      <div style={{ fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.1rem' }}>Firma Autorizada</div>
                      <div style={{ fontSize: '0.8rem' }}>Veterinaria San Hyuga</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="no-print" style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingBottom: '1rem' }}>
              <Button onClick={handlePrint} style={{ flex: 1 }}>Imprimir o Guardar PDF</Button>
              <Button variant="secondary" onClick={() => setShowFacturaModal(false)} style={{ flex: 1 }}>Cerrar</Button>
            </div>
          </Modal>
        )}
      </div>
    );
  }
