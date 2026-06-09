import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Table from "../../components/Table/Table";
import { useSearch } from "../../context/SearchContext";

export default function ClientHistorial() {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const { clienteId } = useAuth();
  const { searchTerm } = useSearch();

  useEffect(() => {
    if (clienteId) {
      fetchHistorial();
    }
  }, [clienteId]);

  const fetchHistorial = async () => {
    try {
      const response = await api.get(`/historial/cliente/${clienteId}`);
      setHistorial(response.data);
    } catch (error) {
      console.error("Error al obtener historial:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: "Fecha", accessor: "fecha" },
    { header: "Mascota", accessor: "mascota_nombre" },
    { header: "Descripción", accessor: "descripcion" },
    { header: "Notas", accessor: "notas" }
  ];

  const filteredHistorial = historial.filter(record => {
    const search = searchTerm.toLowerCase();
    return (
      record.mascota_nombre?.toLowerCase().includes(search) ||
      record.descripcion?.toLowerCase().includes(search) ||
      record.notas?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <h1 className="page-title">Mi Historial</h1>
          <p className="page-copy">Registro de todas las visitas de tus mascotas.</p>
        </div>
      </section>

      {loading ? (
        <p>Cargando historial...</p>
      ) : (
        <Table columns={columns} data={filteredHistorial} />
      )}
    </div>
  );
}
