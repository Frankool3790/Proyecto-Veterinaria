import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePaymentPDF = (pago) => {
  if (!pago) {
    console.error("No se proporcionaron datos de pago");
    return;
  }

  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Formatear monto
    const formattedMonto = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(pago.monto || 0);

    // Colors
    const primaryColor = [30, 58, 138]; // Kaiser Blue
    const secondaryColor = [76, 29, 149]; // Ness Purple
    const textColor = [40, 40, 40];
    const lightGray = [241, 245, 249];

    // 1. Header
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("VETERINARIA SAN HYUGA", pageWidth / 2, 22, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Comprobante Oficial de Pago", pageWidth / 2, 32, { align: "center" });

    // 2. Info Header
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.text(`Fecha de Emisión: ${new Date().toLocaleString()}`, pageWidth - 20, 55, { align: "right" });
    
    doc.setDrawColor(...secondaryColor);
    doc.setLineWidth(0.5);
    doc.line(20, 60, pageWidth - 20, 60);

    // 3. Information Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("INFORMACIÓN DEL PAGO", 20, 75);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    const infoY = 85;
    doc.text(`Cliente:`, 20, infoY);
    doc.setFont("helvetica", "bold");
    doc.text(`${pago.cliente_nombre || 'Usuario Registrado'}`, 60, infoY);
    
    doc.setFont("helvetica", "normal");
    doc.text(`ID Transacción:`, 20, infoY + 7);
    doc.setFont("helvetica", "bold");
    doc.text(`#VET-PAY-${pago.id || 'N/A'}`, 60, infoY + 7);
    
    doc.setFont("helvetica", "normal");
    doc.text(`Método:`, 20, infoY + 14);
    doc.setFont("helvetica", "bold");
    doc.text(`${pago.metodo_pago || 'No especificado'}`, 60, infoY + 14);
    
    doc.setFont("helvetica", "normal");
    doc.text(`Estado:`, 20, infoY + 21);
    doc.setFont("helvetica", "bold");
    const isApproved = ['Completado', 'Aprobado', 'Exitoso'].includes(pago.estado);
    doc.setTextColor(isApproved ? [0, 128, 0] : [200, 0, 0]);
    doc.text(`${pago.estado || 'Procesado'}`, 60, infoY + 21);
    doc.setTextColor(...textColor);

    // 4. Details Table
    autoTable(doc, {
      startY: 120,
      head: [['CONCEPTO / REFERENCIA', 'VALOR UNITARIO', 'TOTAL']],
      body: [[
        pago.descripcion || 'Servicios Veterinarios Generales',
        formattedMonto,
        `${formattedMonto} COP`
      ]],
      headStyles: { 
        fillColor: secondaryColor,
        fontSize: 12,
        halign: 'center'
      },
      bodyStyles: { 
        fontSize: 11,
        halign: 'center',
        cellPadding: 10
      },
      theme: 'grid'
    });

    // 5. Total
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setFillColor(...lightGray);
    doc.rect(pageWidth - 95, finalY - 10, 75, 20, 'F');
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(`TOTAL: ${formattedMonto} COP`, pageWidth - 25, finalY, { align: "right" });

    // 6. Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "italic");
    doc.text("Este documento es un soporte válido de la transacción realizada en el sistema San Hyuga.", pageWidth / 2, pageHeight - 20, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.text("Veterinaria San Hyuga - Cuidando a tus mejores amigos", pageWidth / 2, pageHeight - 10, { align: "center" });

    // Save PDF
    const safeName = (pago.cliente_nombre || 'Cliente').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    doc.save(`Recibo_${pago.id || '0'}_${safeName}.pdf`);
  } catch (err) {
    console.error("PDF generation failed:", err);
    throw err;
  }
};
