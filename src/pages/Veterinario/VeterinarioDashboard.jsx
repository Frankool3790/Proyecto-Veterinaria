import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  PawPrint,
  Calendar,
  Syringe,
  Activity,
  Clock,
  TrendingUp
} from "lucide-react";
import api from "../../services/api";
import { motion } from "framer-motion";

export default function VeterinarioDashboard() {
  const { veterinarioId } = useAuth();
  const [stats, setStats] = useState({
    citasHoy: 0,
    totalCitas: 0,
    mascotasAtendidas: 0,
    vacunasPendientes: 0,
    totalConsultas: 0
  });
  const [proximasCitas, setProximasCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [veterinarioId]);

  const fetchDashboardData = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      
      // Aquí haríamos llamadas reales a la API, por ahora usamos datos de ejemplo
      setStats({
        citasHoy: 3,
        totalCitas: 15,
        mascotasAtendidas: 25,
        vacunasPendientes: 5,
        totalConsultas: 42
      });

      setProximasCitas([
        { id: 1, mascota: "Fluffy", fecha: today, hora: "10:00", motivo: "Revisión general" },
        { id: 2, mascota: "Rex", fecha: today, hora: "11:30", motivo: "Vacunación" },
        { id: 3, mascota: "Luna", fecha: today, hora: "14:00", motivo: "Control post-operatorio" },
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { 
      title: "Citas de Hoy", 
      value: stats.citasHoy, 
      icon: <Calendar color="#10b981" size={28} />, 
      color: "#10b981",
      bg: "rgba(16,185,129,0.1)" 
    },
    { 
      title: "Mascotas por Atender", 
      value: stats.mascotasAtendidas, 
      icon: <PawPrint color="#3b82f6" size={28} />, 
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.1)" 
    },
    { 
      title: "Próximas Consultas", 
      value: 8, 
      icon: <Clock color="#8b5cf6" size={28} />, 
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.1)" 
    },
    { 
      title: "Vacunas Pendientes", 
      value: stats.vacunasPendientes, 
      icon: <Syringe color="#ef4444" size={28} />, 
      color: "#ef4444",
      bg: "rgba(239,68,68,0.1)" 
    },
    { 
      title: "Total Consultas", 
      value: stats.totalConsultas, 
      icon: <Activity color="#f59e0b" size={28} />, 
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.1)" 
    }
  ];

  if (loading) {
    return <div className="page-shell"><p style={{textAlign:"center", color:"var(--text)"}}>Cargando...</p></div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-shell"
    >
      <div className="page-header">
        <div>
          <h1 className="page-title">Panel del Veterinario</h1>
          <p className="page-copy">Resumen de tu actividad hoy</p>
        </div>
      </div>

      <div style={{ 
        display: "grid", 
        gap: "1.5rem", 
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" 
      }}>
        {cards.map((card, index) => (
          <motion.div 
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card"
            style={{ 
              borderLeft: `4px solid ${card.color}`, 
              background: card.bg 
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{card.title}</p>
                <p style={{ 
                  fontSize: "2rem", 
                  fontWeight: "800", 
                  color: "var(--text)", 
                  margin: "0.25rem 0" 
                }}>
                  {card.value}
                </p>
              </div>
              <div style={{ 
                background: card.color, 
                padding: "1rem", 
                borderRadius: "0.75rem", 
                opacity: 0.9 
              }}>
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: "2rem", display: "grid", gap: "1.5rem" }}>
        <div className="stat-card" style={{ padding: "1.5rem" }}>
          <h2 style={{ marginBottom: "1.5rem", color: "var(--text)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Calendar size={20} />
            Próximas Citas del Día
          </h2>
          {proximasCitas.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {proximasCitas.map((cita) => (
                <div 
                  key={cita.id}
                  style={{
                    padding: "1rem",
                    background: "var(--card-bg)",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--border)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h3 style={{ margin: 0, color: "var(--text)" }}>{cita.mascota}</h3>
                      <p className="page-copy" style={{ margin: "0.25rem 0" }}>{cita.motivo}</p>
                    </div>
                    <span style={{ 
                      background: "var(--accent-blue)", 
                      color: "white", 
                      padding: "0.5rem 1rem", 
                      borderRadius: "0.5rem",
                      fontWeight: "600" 
                    }}>
                      {cita.hora}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="page-copy">No hay citas programadas para hoy</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
