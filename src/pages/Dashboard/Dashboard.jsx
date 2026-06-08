import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function Dashboard() {
  const { isAdmin, isClient, clienteId, user } = useAuth();
  const [stats, setStats] = useState({
    mascotas: 0,
    turnos: 0,
    historial: 0,
    clientes: 0,
    veterinarios: 0
  });

  useEffect(() => {
    fetchStats();
  }, [isAdmin, isClient, clienteId]);

  const fetchStats = async () => {
    try {
      if (isAdmin) {
        // En un proyecto real, esto vendría de un endpoint de stats
        const [m, c, t, v] = await Promise.all([
          api.get("/mascotas"),
          api.get("/clientes"),
          api.get("/citas"),
          api.get("/veterinarios")
        ]);
        setStats({
          mascotas: m.data.length,
          clientes: c.data.length,
          turnos: t.data.length,
          veterinarios: v.data.length
        });
      } else if (isClient && clienteId) {
        const [m, t, h] = await Promise.all([
          api.get(`/mascotas/cliente/${clienteId}`),
          api.get(`/citas/cliente/${clienteId}`),
          api.get(`/historial/cliente/${clienteId}`)
        ]);
        setStats({
          mascotas: m.data.length,
          turnos: t.data.length,
          historial: h.data.length
        });
      }
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    }
  };

  const adminCards = [
    { title: "Mascotas", value: stats.mascotas, description: "Total de mascotas activas" },
    { title: "Dueños", value: stats.clientes, description: "Clientes registrados" },
    { title: "Turnos", value: stats.turnos, description: "Reservas totales" },
    { title: "Veterinarios", value: stats.veterinarios, description: "Profesionales disponibles" },
  ];

  const clientCards = [
    { title: "Mis Mascotas", value: stats.mascotas, description: "Mascotas registradas a tu nombre" },
    { title: "Mis Turnos", value: stats.turnos, description: "Citas programadas y pasadas" },
    { title: "Mi Historial", value: stats.historial, description: "Registros de visitas médicas" },
  ];

  const cards = isAdmin ? adminCards : clientCards;

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <h1 className="page-title">Bienvenido, {user?.nombre || user?.username}</h1>
          <p className="page-copy">
            {isAdmin 
              ? "Resumen rápido de la clínica y los próximos turnos." 
              : "Consulta el estado de tus mascotas y tus próximos turnos."}
          </p>
        </div>
        {isAdmin && <Button variant="primary">Nuevo turno</Button>}
      </section>

      <div className="stats-grid">
        {cards.map((card) => (
          <article key={card.title} className="stat-card">
            <p className="stat-card-title">{card.title}</p>
            <p className="stat-card-value">{card.value}</p>
            <p className="page-copy" style={{ marginTop: "0.75rem" }}>{card.description}</p>
          </article>
        ))}
      </div>

      <section style={{ marginTop: "1.5rem" }}>
        <div className="stat-card overview-chart">
          <h2 style={{ marginBottom: "1rem" }}>
            {isAdmin ? "Actividad semanal" : "Próximo turno destacado"}
          </h2>
          <p className="page-copy">
            {isAdmin 
              ? "Los turnos, nuevas mascotas y clientes muestran un crecimiento estable gracias a la atención personalizada."
              : stats.turnos > 0 
                ? "Tienes turnos programados. No olvides traer la cartilla de vacunación de tu mascota."
                : "No tienes turnos programados próximamente. Mantén al día la salud de tu mascota."}
          </p>
        </div>
      </section>
    </div>
  );
}
