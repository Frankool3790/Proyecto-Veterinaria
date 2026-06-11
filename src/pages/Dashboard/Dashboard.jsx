import React, { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";
import Button from "../../components/Button/Button";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";
import { formatTime, getDayFromDate, getMonthFromDate } from "../../utils/formatters";
import { motion } from "framer-motion";
import { 
  PawPrint, 
  Users, 
  Calendar, 
  DollarSign, 
  Syringe, 
  Activity, 
  TrendingUp, 
  CheckCircle2 
} from "lucide-react";

const weeklyData = [
  { name: "Lun", turnos: 4, mascotas: 2, clientes: 1, ingresos: 120 },
  { name: "Mar", turnos: 7, mascotas: 5, clientes: 2, ingresos: 350 },
  { name: "Mie", turnos: 5, mascotas: 3, clientes: 1, ingresos: 200 },
  { name: "Jue", turnos: 9, mascotas: 6, clientes: 4, ingresos: 450 },
  { name: "Vie", turnos: 12, mascotas: 8, clientes: 5, ingresos: 600 },
  { name: "Sab", turnos: 6, mascotas: 4, clientes: 2, ingresos: 300 },
  { name: "Dom", turnos: 2, mascotas: 1, clientes: 0, ingresos: 0 },
];

const pieData = [
  { name: "Consulta", value: 40 },
  { name: "Vacunación", value: 30 },
  { name: "Desparasitación", value: 20 },
  { name: "Cirugía", value: 10 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

export default function Dashboard() {
  const { isAdmin, isClient, clienteId, user } = useAuth();
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    mascotas: 0,
    turnos: 0,
    historial: 0,
    clientes: 0,
    veterinarios: 0,
    citasHoy: 0,
    ingresosMes: 0,
    vacunasPendientes: 0
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
        
        const today = new Date().toISOString().split('T')[0];
        const citasHoy = t.data.filter(c => c.fecha === today).length;
        
        setStats({
          mascotas: m.data.length,
          clientes: c.data.length,
          turnos: t.data.length,
          veterinarios: v.data.length,
          citasHoy: citasHoy,
          ingresosMes: 2500, // Simulado
          vacunasPendientes: 15 // Simulado
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
          historial: h.data.length,
          citasHoy: 0,
          ingresosMes: 0,
          vacunasPendientes: 3 // Simulado
        });
      }
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    }
  };

  const fetchNextCita = async () => {
    try {
      const response = await api.get(`/citas/cliente/${clienteId}`);
      const upcoming = response.data
        .filter(c => ["Pendiente", "Solicitado", "Confirmado"].includes(c.estado))
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[0];
      setNextCita(upcoming);
    } catch (error) {
      console.error("Error al cargar próxima cita:", error);
    }
  };

  const adminCards = [
    { 
      title: "Mascotas Registradas", 
      value: stats.mascotas, 
      description: "Total de mascotas activas", 
      icon: PawPrint, 
      color: "var(--accent-blue)",
      bg: "rgba(59, 130, 246, 0.1)"
    },
    { 
      title: "Clientes", 
      value: stats.clientes, 
      description: "Dueños registrados", 
      icon: Users, 
      color: "var(--accent-purple)",
      bg: "rgba(139, 92, 246, 0.1)"
    },
    { 
      title: "Citas Hoy", 
      value: stats.citasHoy, 
      description: "Turnos programados hoy", 
      icon: Calendar, 
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.1)"
    },
    { 
      title: "Ingresos del Mes", 
      value: `$${stats.ingresosMes.toLocaleString()}`, 
      description: "Ingresos totales", 
      icon: DollarSign, 
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.1)"
    },
    { 
      title: "Vacunas Pendientes", 
      value: stats.vacunasPendientes, 
      description: "Vacunas por aplicar", 
      icon: Syringe, 
      color: "#ef4444",
      bg: "rgba(239, 68, 68, 0.1)"
    },
    { 
      title: "Veterinarios", 
      value: stats.veterinarios, 
      description: "Profesionales disponibles", 
      icon: Activity, 
      color: "#8b5cf6",
      bg: "rgba(139, 92, 246, 0.1)"
    },
  ];

  const clientCards = [
    { 
      title: "Mis Mascotas", 
      value: stats.mascotas, 
      description: "Mascotas registradas", 
      icon: PawPrint, 
      color: "var(--accent-blue)",
      bg: "rgba(59, 130, 246, 0.1)"
    },
    { 
      title: "Mis Turnos", 
      value: stats.turnos, 
      description: "Citas programadas", 
      icon: Calendar, 
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.1)"
    },
    { 
      title: "Mi Historial", 
      value: stats.historial, 
      description: "Registros médicos", 
      icon: CheckCircle2, 
      color: "var(--accent-purple)",
      bg: "rgba(139, 92, 246, 0.1)"
    },
    { 
      title: "Vacunas Pendientes", 
      value: stats.vacunasPendientes, 
      description: "Por aplicar", 
      icon: Syringe, 
      color: "#ef4444",
      bg: "rgba(239, 68, 68, 0.1)"
    },
  ];

  const cards = isAdmin ? adminCards : clientCards;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="page-shell"
    >
      <motion.section variants={itemVariants} className="page-header">
        <div>
          <h1 className="page-title">Bienvenido, {user?.nombre || 'Usuario'}</h1>
          <p className="page-copy">Aquí tienes el resumen de lo que está pasando en la clínica hoy.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button onClick={() => window.print()} variant="secondary">Descargar Reporte</Button>
          {isAdmin && <Button onClick={() => window.location.href='/turnos'}>Gestionar Turnos</Button>}
        </div>
      </motion.section>

      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {cards.map((card, index) => (
          <motion.article 
            key={card.title} 
            variants={itemVariants}
            whileHover={{ scale: 1.02, translateY: -5 }}
            className="stat-card"
            style={{ 
              borderLeft: `4px solid ${card.color}`,
              background: card.bg
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{card.title}</p>
                <p style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text)', marginBottom: '0.25rem' }}>{card.value}</p>
                <p className="page-copy" style={{ fontSize: '0.85rem' }}>{card.description}</p>
              </div>
              <div style={{ 
                background: card.color, 
                padding: '1rem', 
                borderRadius: '0.75rem',
                opacity: 0.9
              }}>
                <card.icon color="white" size={28} />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {isClient && postponedCitas.length > 0 && (
        <motion.section variants={itemVariants} style={{ marginTop: "1.5rem" }}>
          <div className="stat-card" style={{ border: "1px solid var(--kaiser-rose)", background: "rgba(190, 24, 93, 0.1)" }}>
            <h2 style={{ color: "var(--kaiser-rose)", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              ⚠️ Turnos Pospuestos
            </h2>
            <p className="page-copy" style={{ marginTop: "0.5rem" }}>
              Tienes {postponedCitas.length} turno(s) que han sido pospuestos por la clínica. Por favor, revisa los detalles o contacta con nosotros.
            </p>
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {postponedCitas.map(cita => (
                <div key={cita.id} style={{ fontSize: "0.9rem", padding: "0.75rem", background: "rgba(255,255,255,0.05)", borderRadius: "0.5rem" }}>
                  <strong>{cita.mascota_nombre}</strong>: {new Date(cita.fecha).toLocaleDateString()} a las {cita.hora}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      <div style={{ 
        display: 'grid', 
        gap: '1.5rem', 
        gridTemplateColumns: isAdmin ? '2fr 1fr' : '1fr',
        marginTop: '1.5rem'
      }}>
        {isAdmin ? (
          <>
            <motion.div variants={itemVariants} className="stat-card" style={{ height: "400px", padding: "2rem" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0, color: "var(--text)" }}>Actividad Semanal</h2>
                <TrendingUp color="var(--accent-blue)" size={24} />
              </div>
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
                    <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
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
                  <Area type="monotone" dataKey="turnos" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTurnos)" name="Turnos" />
                  <Area type="monotone" dataKey="mascotas" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorMascotas)" name="Mascotas" />
                  <Area type="monotone" dataKey="ingresos" stroke="#10b981" fillOpacity={1} fill="url(#colorIngresos)" name="Ingresos" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div variants={itemVariants} className="stat-card" style={{ height: "400px", padding: "2rem" }}>
              <h2 style={{ marginBottom: "2rem", color: "var(--text)" }}>Tipos de Citas</h2>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--surface)", 
                      border: `1px solid ${isDark ? "#3b82f6" : "#e2e8f0"}`, 
                      borderRadius: "8px" 
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </>
        ) : (
          <motion.div variants={itemVariants} className="stat-card" style={{ padding: "2rem" }}>
            <h2 style={{ marginBottom: "1.5rem", color: "var(--text)", display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar color="var(--accent-blue)" />
              Próximo Turno Destacado
            </h2>
            {nextCita ? (
              <div style={{ 
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
                  <p style={{ fontSize: "2.5rem", fontWeight: "900", color: "var(--text)" }}>{getDayFromDate(nextCita.fecha)}</p>
                  <p style={{ fontSize: "1rem", color: "var(--text)" }}>{getMonthFromDate(nextCita.fecha)}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "var(--text)" }}>{nextCita.mascota_nombre}</h3>
                  <p className="page-copy"><strong>Veterinario:</strong> {nextCita.veterinario_nombre}</p>
                  <p className="page-copy"><strong>Hora:</strong> {formatTime(nextCita.hora)}</p>
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
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
