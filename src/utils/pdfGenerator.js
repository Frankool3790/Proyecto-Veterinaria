import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";

export const generatePaymentPDF = async (pago) => {
  if (!pago) {
    console.error("No se proporcionaron datos de pago");
    return;
  }

  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Generar datos ficticios si no existen para completar la factura legal
    const facturaNum = `SH-${new Date().getFullYear()}-${String(pago.id).padStart(6, '0')}`;
    const veterinarioAtendio = pago.veterinario_nombre || "Dr. Franklyn Casas";
    const mascotaNombre = pago.mascota_nombre || "No especificada";
    const iva = 0; // Ejemplo: 0%
    const subtotal = pago.monto || 0;
    const total = subtotal + iva;

    const formattedMonto = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(total);

    // Colors
    const primaryColor = [30, 58, 138]; // Kaiser Blue
    const secondaryColor = [76, 29, 149]; // Ness Purple
    const textColor = [40, 40, 40];
    const lightGray = [245, 245, 245];

    // 1. Header (Diseño Profesional)
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("VETERINARIA SAN HYUGA", 20, 20);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("NIT: 123.456.789-0", 20, 28);
    doc.text("Calle 13 #9-84, Soacha, Cundinamarca", 20, 33);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("FACTURA DE VENTA", pageWidth - 20, 20, { align: "right" });
    doc.setFontSize(12);
    doc.text(facturaNum, pageWidth - 20, 28, { align: "right" });

    // 2. Info Grid
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    
    const startY = 55;
    // Columna Izquierda
    doc.text("CLIENTE:", 20, startY);
    doc.setFont("helvetica", "normal");
    doc.text(pago.cliente_nombre || 'Usuario Registrado', 20, startY + 5);
    
    doc.setFont("helvetica", "bold");
    doc.text("MASCOTA:", 20, startY + 15);
    doc.setFont("helvetica", "normal");
    doc.text(mascotaNombre, 20, startY + 20);

    // Columna Derecha
    doc.setFont("helvetica", "bold");
    doc.text("VETERINARIO:", 110, startY);
    doc.setFont("helvetica", "normal");
    doc.text(veterinarioAtendio, 110, startY + 5);
    
    doc.setFont("helvetica", "bold");
    doc.text("FECHA DE PAGO:", 110, startY + 15);
    doc.setFont("helvetica", "normal");
    const fechaPago = pago.fecha ? new Date(pago.fecha) : new Date();
    doc.text(fechaPago.toLocaleDateString('es-CO'), 110, startY + 20);

    // 3. Table
    autoTable(doc, {
      startY: 85,
      head: [['DESCRIPCIÓN / SERVICIO', 'CANT.', 'UNITARIO', 'TOTAL']],
      body: [[
        pago.descripcion || 'Consulta Veterinaria General',
        '1',
        new Intl.NumberFormat('es-CO').format(subtotal),
        new Intl.NumberFormat('es-CO').format(subtotal)
      ]],
      headStyles: { fillColor: primaryColor, halign: 'center' },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'right' }
      },
      theme: 'striped'
    });

    // 4. Totals
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    
    doc.text("SUBTOTAL:", pageWidth - 60, finalY);
    doc.text(`$${new Intl.NumberFormat('es-CO').format(subtotal)}`, pageWidth - 20, finalY, { align: "right" });
    
    doc.text("IVA (0%):", pageWidth - 60, finalY + 7);
    doc.text(`$${new Intl.NumberFormat('es-CO').format(iva)}`, pageWidth - 20, finalY + 7, { align: "right" });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(...lightGray);
    doc.rect(pageWidth - 70, finalY + 12, 50, 10, 'F');
    doc.text("TOTAL:", pageWidth - 60, finalY + 19);
    doc.text(formattedMonto, pageWidth - 20, finalY + 19, { align: "right" });

    // 5. Estado
    doc.setFontSize(14);
    const isApproved = ['Completado', 'Aprobado', 'Exitoso'].includes(pago.estado);
    doc.setTextColor(isApproved ? [0, 128, 0] : [200, 0, 0]);
    doc.text(isApproved ? "PAGADO" : "PENDIENTE", 20, finalY + 19);
    doc.setTextColor(...textColor);

    // 6. Firma y QR
    const bottomY = pageHeight - 60;
    
    // QR Code
    const qrUrl = `https://sanhyuga.com/verificar/${facturaNum}`;
    const qrDataUrl = await QRCode.toDataURL(qrUrl);
    doc.addImage(qrDataUrl, 'PNG', 20, bottomY, 35, 35);
    doc.setFontSize(8);
    doc.text("Escanea para verificar", 22, bottomY + 38);

    // Firma
    doc.setDrawColor(150, 150, 150);
    doc.line(pageWidth - 80, bottomY + 25, pageWidth - 20, bottomY + 25);
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Firma autorizada", pageWidth - 50, bottomY + 30, { align: "center" });
    doc.setFont("helvetica", "bold");
    doc.text("Veterinaria San Hyuga", pageWidth - 50, bottomY + 35, { align: "center" });

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text("Gracias por confiar en nosotros para el cuidado de su mascota.", pageWidth / 2, pageHeight - 15, { align: "center" });

    // Save PDF
    const safeName = (pago.cliente_nombre || 'Cliente').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `Factura_${facturaNum}_${safeName}.pdf`;
    
    // Generar el blob para previsualización
    const pdfBlob = doc.output('bloburl');
    window.open(pdfBlob, '_blank');
    
    // También descargar el archivo
    doc.save(fileName);
  } catch (err) {
    console.error("PDF generation failed:", err);
    throw err;
  }
};
