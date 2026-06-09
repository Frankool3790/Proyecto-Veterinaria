import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Table from "../../components/Table/Table";
import { useSearch } from "../../context/SearchContext";

export default function ClientMascotas() {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { clienteId } = useAuth();
  const { searchTerm } = useSearch();

  useEffect(() => {
    if (clienteId) {
      fetchMascotas();
    }
  }, [clienteId]);

  const fetchMascotas = async () => {
    try {
      const response = await api.get(`/mascotas/cliente/${clienteId}`);
      setMascotas(response.data);
    } catch (error) {
      console.error("Error al obtener mascotas:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: "Nombre", accessor: "nombre" },
    { header: "Especie", accessor: "especie" },
    { header: "Raza", accessor: "raza" },
    { header: "Edad", accessor: "edad" }
  ];

  const filteredMascotas = mascotas.filter(mascota => {
    const search = searchTerm.toLowerCase();
    return (
      mascota.nombre?.toLowerCase().includes(search) ||
      mascota.especie?.toLowerCase().includes(search) ||
      mascota.raza?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <h1 className="page-title">Mis Mascotas</h1>
          <p className="page-copy">Aquí puedes ver la información de tus compañeros.</p>
        </div>
      </section>

      {loading ? (
        <p>Cargando mascotas...</p>
      ) : (
        <Table columns={columns} data={filteredMascotas} />
      )}
    </div>
  );
}
