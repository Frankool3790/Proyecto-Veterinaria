import React, { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from "recharts";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";

const weeklyData = [
  { name: "Lun", turnos: 4, mascotas: 2, clientes: 1 },
  { name: "Mar", turnos: 7, mascotas: 5, clientes: 2 },
  { name: "Mie", turnos: 5, mascotas: 3, clientes: 1 },
  { name: "Jue", turnos: 9, mascotas: 6, clientes: 4 },
  { name: "Vie", turnos: 12, mascotas: 8, clientes: 5 },
  { name: "Sab", turnos: 6, mascotas: 4, clientes: 2 },
  { name: "Dom", turnos: 2, mascotas: 1, clientes: 0 },
];

export default function Dashboard() {
  const { isAdmin, isClient, clienteId, user } = useAuth();
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    mascotas: 0,
    turnos: 0,
    historial: 0,
    clientes: 0,
    veterinarios: 0
  });
  const [nextCita, setNextCita] = useState(null);
  const [postponedCitas, setPostponedCitas] = useState([]);

  useEffect(() => {
    fetchStats();
    if (isClient && clienteId) {
      fetchNextCita();
      fetchPostponedCitas();
    }
  }, [isAdmin, isClient, clienteId]);

  const fetchPostponedCitas = async () => {
    try {
      const response = await api.get(`/citas/cliente/${clienteId}`);
      const postponed = response.data.filter(c => c.estado === "Pospuesto");
      setPostponedCitas(postponed);
    } catch (error) {
      console.error("Error al cargar citas pospuestas:", error);
    }
  };

  const fetchStats = async () => {
    try {
      if (isAdmin) {
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

  const fetchNextCita = async () => {
    try {
      const response = await api.get(`/citas/cliente/${clienteId}`);
      // Consideramos "Pendiente", "Solicitado" o "Confirmado" como próximas citas
      const upcoming = response.data
        .filter(c => ["Pendiente", "Solicitado", "Confirmado"].includes(c.estado))
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[0];
      setNextCita(upcoming);
    } catch (error) {
      console.error("Error al cargar próxima cita:", error);
    }
  };

  const adminCards = [
    { title: "Mascotas", value: stats.mascotas, description: "Total de mascotas activas" },
    { title: "Dueños", value: stats.clientes, description: "Clientes registrados" },
    { title: "Turnos", value: stats.turnos, description: "Reservas totales" },
    { title: "Veterinarios", value: stats.veterinarios, description: "Profesionales disponibles" },
  ];

  const clientCards = [
    { title: "Mis Mascotas", value: stats.mascotas, description: "Mascotas registradas" },
    { title: "Mis Turnos", value: stats.turnos, description: "Citas programadas" },
    { title: "Mi Historial", value: stats.historial, description: "Registros médicos" },
  ];

  const cards = isAdmin ? adminCards : clientCards;

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <h1 className="page-title">Bienvenido, {user?.nombre || user?.username}</h1>
          <p className="page-copy">
            {isAdmin 
              ? "Resumen analítico de la actividad de la clínica." 
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
            <p className="page-copy" style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>{card.description}</p>
          </article>
        ))}
      </div>

      {isClient && postponedCitas.length > 0 && (
        <section style={{ marginTop: "1.5rem" }}>
          <div className="stat-card" style={{ border: "1px solid var(--kaiser-rose)", background: "rgba(190, 24, 93, 0.1)" }}>
            <h2 style={{ color: "var(--kaiser-rose)", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              ⚠️ Turnos Pospuestos
            </h2>
            <p className="page-copy" style={{ marginTop: "0.5rem" }}>
              Tienes {postponedCitas.length} turno(s) que han sido pospuestos por la clínica. Por favor, revisa los detalles o contacta con nosotros.
            </p>
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {postponedCitas.map(cita => (
                <div key={cita.id} style={{ fontSize: "0.9rem", padding: "0.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "0.4rem" }}>
                  <strong>{cita.mascota_nombre}</strong>: {new Date(cita.fecha).toLocaleDateString()} a las {cita.hora}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ marginTop: "1.5rem" }}>
        {isAdmin ? (
          <div className="stat-card overview-chart" style={{ height: "400px", padding: "2rem" }}>
            <h2 style={{ marginBottom: "2rem", color: "var(--text)" }}>Actividad Semanal</h2>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorTurnos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMascotas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(148, 163, 184, 0.1)" : "rgba(0, 0, 0, 0.05)"} />
                <XAxis dataKey="name" stroke="var(--muted)" />
                <YAxis stroke="var(--muted)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--surface)", 
                    border: `1px solid ${isDark ? "#3b82f6" : "#e2e8f0"}`, 
                    borderRadius: "8px" 
                  }}
                  itemStyle={{ color: "var(--text)" }}
                />
                <Legend />
                <Area type="monotone" dataKey="turnos" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTurnos)" />
                <Area type="monotone" dataKey="mascotas" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorMascotas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="stat-card overview-chart" style={{ padding: "2rem" }}>
            <h2 style={{ marginBottom: "1.5rem", color: "var(--text)" }}>Próximo Turno Destacado</h2>
            {nextCita ? (
              <div className="cita-destacada" style={{ 
                background: "rgba(59, 130, 246, 0.1)", 
                padding: "2rem", 
                borderRadius: "1rem", 
                border: "1px solid var(--accent-blue)",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "2rem",
                alignItems: "center"
              }}>
                <div style={{ textAlign: "center", borderRight: "2px solid rgba(59, 130, 246, 0.2)", paddingRight: "2rem" }}>
                  <p style={{ fontSize: "1rem", color: "var(--accent-blue)", fontWeight: "bold" }}>FECHA</p>
                  <p style={{ fontSize: "2.5rem", fontWeight: "900", color: "var(--text)" }}>{nextCita.fecha.split("-")[2]}</p>
                  <p style={{ fontSize: "1rem", color: "var(--text)" }}>{new Date(nextCita.fecha).toLocaleString('es-ES', { month: 'short' }).toUpperCase()}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "var(--text)" }}>{nextCita.mascota_nombre}</h3>
                  <p className="page-copy"><strong>Veterinario:</strong> {nextCita.veterinario_nombre}</p>
                  <p className="page-copy"><strong>Hora:</strong> {nextCita.hora}</p>
                  <p className="page-copy" style={{ marginTop: "1rem", color: "var(--text)" }}>
                    <span style={{ color: "var(--accent-purple)" }}>Motivo:</span> {nextCita.motivo || "Consulta general"}
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "3rem" }}>
                <p className="page-copy">No tienes turnos pendientes en este momento.</p>
                <p className="page-copy" style={{ fontSize: "0.9rem" }}>Mantén al día la salud de tu mascota programando una nueva visita.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
