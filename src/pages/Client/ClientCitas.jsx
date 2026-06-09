import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ClientCitas.css";
import { format, parseISO, isSameDay } from "date-fns";
import { es } from "date-fns/locale";

export default function ClientCitas() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const { clienteId } = useAuth();

  useEffect(() => {
    if (clienteId) {
      fetchCitas();
    }
  }, [clienteId]);

  const fetchCitas = async () => {
    try {
      const response = await api.get(`/citas/cliente/${clienteId}`);
      setCitas(response.data);
    } catch (error) {
      console.error("Error al obtener citas:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTileContent = ({ date, view }) => {
    if (view === "month") {
      const dayCitas = citas.filter(cita => isSameDay(parseISO(cita.fecha), date));
      if (dayCitas.length > 0) {
        return <div className="calendar-dot"></div>;
      }
    }
    return null;
  };

  const selectedDayCitas = citas.filter(cita => isSameDay(parseISO(cita.fecha), date));

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <h1 className="page-title">Mis Turnos</h1>
          <p className="page-copy">Consulta tus próximas visitas a la veterinaria.</p>
        </div>
      </section>

      <div className="calendar-container">
        <div className="calendar-wrapper">
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={getTileContent}
            locale="es-ES"
          />
        </div>

        <div className="citas-detail">
          <h2>Turnos para el {format(date, "d 'de' MMMM", { locale: es })}</h2>
          {selectedDayCitas.length > 0 ? (
            <div className="citas-list">
              {selectedDayCitas.map(cita => (
                <div key={cita.id} className="cita-card">
                  <div className="cita-time">{cita.hora}</div>
                  <div className="cita-info">
                    <div className="cita-header">
                      <strong>Mascota:</strong> {cita.mascota_nombre}
                      <span className={`status-badge status-${cita.estado.toLowerCase()}`}>
                        {cita.estado}
                      </span>
                    </div>
                    <div className="cita-body">
                      <p><strong>Veterinario:</strong> {cita.veterinario_nombre}</p>
                      <p><strong>Motivo/Descripción:</strong> {cita.motivo || "Sin descripción"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-citas">No tienes turnos programados para este día.</p>
          )}
        </div>
      </div>
    </div>
  );
}
