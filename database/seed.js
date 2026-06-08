/**
 * Script para poblar la base de datos con datos de prueba
 * Ejecutar con: node database/seed.js
 */

import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../veterinaria.db');

console.log('🌱 Poblando base de datos con datos de prueba...\n');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error conectando a la base de datos:', err);
    process.exit(1);
  }
  console.log('✅ Conexión exitosa a SQLite');
  seedDatabase();
});

function seedDatabase() {
  // Datos de clientes de prueba
  const clientes = [
    { nombre: 'Juan Pérez', email: 'juan.perez@email.com', telefono: '555-1001', direccion: 'Calle Principal 123' },
    { nombre: 'María García', email: 'maria.garcia@email.com', telefono: '555-1002', direccion: 'Av. Secundaria 456' },
    { nombre: 'Carlos López', email: 'carlos.lopez@email.com', telefono: '555-1003', direccion: 'Calle Tercera 789' },
    { nombre: 'Ana Martínez', email: 'ana.martinez@email.com', telefono: '555-1004', direccion: 'Calle Cuarta 101' },
    { nombre: 'Roberto Sánchez', email: 'roberto.sanchez@email.com', telefono: '555-1005', direccion: 'Calle Quinta 202' }
  ];

  let clienteIds = [];
  let clienteCount = 0;

  console.log('📋 Insertando clientes...');
  clientes.forEach(cliente => {
    db.run(
      `INSERT OR IGNORE INTO clientes (nombre, email, telefono, direccion)
       VALUES (?, ?, ?, ?)`,
      [cliente.nombre, cliente.email, cliente.telefono, cliente.direccion],
      function (err) {
        if (err) console.error('Error insertando cliente:', err);
        else {
          clienteIds.push(this.lastID);
          clienteCount++;
        }

        if (clienteCount === clientes.length) {
          console.log(`✅ ${clienteCount} clientes insertados`);
          insertMascotas(clienteIds);
        }
      }
    );
  });
}

function insertMascotas(clienteIds) {
  const mascotas = [
    { nombre: 'Fluffy', especie: 'Gato', raza: 'Persa', edad: 3, clienteId: clienteIds[0] || 1 },
    { nombre: 'Rex', especie: 'Perro', raza: 'Labrador', edad: 5, clienteId: clienteIds[0] || 1 },
    { nombre: 'Whiskers', especie: 'Gato', raza: 'Siamés', edad: 2, clienteId: clienteIds[1] || 2 },
    { nombre: 'Luna', especie: 'Perro', raza: 'Golden Retriever', edad: 4, clienteId: clienteIds[1] || 2 },
    { nombre: 'Max', especie: 'Perro', raza: 'Bulldog', edad: 6, clienteId: clienteIds[2] || 3 },
    { nombre: 'Mimi', especie: 'Gato', raza: 'Blanco', edad: 1, clienteId: clienteIds[2] || 3 },
    { nombre: 'Buddy', especie: 'Perro', raza: 'Pastor Alemán', edad: 7, clienteId: clienteIds[3] || 4 },
    { nombre: 'Tiger', especie: 'Gato', raza: 'Atigrado', edad: 4, clienteId: clienteIds[3] || 4 }
  ];

  let mascotaCount = 0;
  let mascotaIds = [];

  console.log('🐾 Insertando mascotas...');
  mascotas.forEach(mascota => {
    db.run(
      `INSERT OR IGNORE INTO mascotas (nombre, especie, raza, edad, cliente_id)
       VALUES (?, ?, ?, ?, ?)`,
      [mascota.nombre, mascota.especie, mascota.raza, mascota.edad, mascota.clienteId],
      function (err) {
        if (err) console.error('Error insertando mascota:', err);
        else {
          mascotaIds.push(this.lastID);
          mascotaCount++;
        }

        if (mascotaCount === mascotas.length) {
          console.log(`✅ ${mascotaCount} mascotas insertadas`);
          insertCitas(mascotaIds);
        }
      }
    );
  });
}

function insertCitas(mascotaIds) {
  const citas = [
    { fecha: '2024-06-10', hora: '10:00', motivo: 'Revisión general', estado: 'Pendiente', mascotaId: mascotaIds[0] || 1, veterinarioId: 1 },
    { fecha: '2024-06-11', hora: '14:30', motivo: 'Vacunación', estado: 'Pendiente', mascotaId: mascotaIds[1] || 2, veterinarioId: 2 },
    { fecha: '2024-06-12', hora: '09:00', motivo: 'Limpieza dental', estado: 'Confirmada', mascotaId: mascotaIds[2] || 3, veterinarioId: 3 },
    { fecha: '2024-06-13', hora: '15:00', motivo: 'Control post-cirugía', estado: 'Completada', mascotaId: mascotaIds[3] || 4, veterinarioId: 1 },
    { fecha: '2024-06-14', hora: '11:30', motivo: 'Desparasitación', estado: 'Pendiente', mascotaId: mascotaIds[4] || 5, veterinarioId: 2 }
  ];

  let citaCount = 0;
  let citaIds = [];

  console.log('📅 Insertando citas...');
  citas.forEach(cita => {
    db.run(
      `INSERT OR IGNORE INTO citas (fecha, hora, motivo, estado, mascota_id, veterinario_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [cita.fecha, cita.hora, cita.motivo, cita.estado, cita.mascotaId, cita.veterinarioId],
      function (err) {
        if (err) console.error('Error insertando cita:', err);
        else {
          citaIds.push(this.lastID);
          citaCount++;
        }

        if (citaCount === citas.length) {
          console.log(`✅ ${citaCount} citas insertadas`);
          insertHistorial(mascotaIds);
        }
      }
    );
  });
}

function insertHistorial(mascotaIds) {
  const historial = [
    { descripcion: 'Vacunación antirrábica', fecha: '2024-05-15', notas: 'Sin complicaciones', mascotaId: mascotaIds[0] || 1 },
    { descripcion: 'Revisión oftalmológica', fecha: '2024-05-10', notas: 'Visión normal', mascotaId: mascotaIds[1] || 2 },
    { descripcion: 'Limpieza dental profesional', fecha: '2024-04-20', notas: 'Se removieron dos cálculos', mascotaId: mascotaIds[2] || 3 },
    { descripcion: 'Cirugía de esterilización', fecha: '2024-03-05', notas: 'Recuperación exitosa', mascotaId: mascotaIds[3] || 4 },
    { descripcion: 'Tratamiento de infección de oído', fecha: '2024-02-28', notas: 'Mejora evidente', mascotaId: mascotaIds[4] || 5 },
    { descripcion: 'Análisis de sangre', fecha: '2024-05-01', notas: 'Resultados normales', mascotaId: mascotaIds[5] || 6 },
    { descripcion: 'Sutura de herida', fecha: '2024-04-15', notas: 'Herida cicatrizada correctamente', mascotaId: mascotaIds[6] || 7 }
  ];

  let historialCount = 0;

  console.log('📝 Insertando historial clínico...');
  historial.forEach(record => {
    db.run(
      `INSERT OR IGNORE INTO historial_clinico (descripcion, fecha, notas, mascota_id)
       VALUES (?, ?, ?, ?)`,
      [record.descripcion, record.fecha, record.notas, record.mascotaId],
      (err) => {
        if (err) console.error('Error insertando historial:', err);
        else historialCount++;

        if (historialCount === historial.length) {
          console.log(`✅ ${historialCount} registros de historial insertados`);
          finishSeeding();
        }
      }
    );
  });
}

function finishSeeding() {
  // Mostrar estadísticas
  console.log('\n📊 Resumen de datos insertados:');

  const queries = [
    { tabla: 'clientes', query: 'SELECT COUNT(*) as count FROM clientes' },
    { tabla: 'mascotas', query: 'SELECT COUNT(*) as count FROM mascotas' },
    { tabla: 'veterinarios', query: 'SELECT COUNT(*) as count FROM veterinarios' },
    { tabla: 'citas', query: 'SELECT COUNT(*) as count FROM citas' },
    { tabla: 'historial_clinico', query: 'SELECT COUNT(*) as count FROM historial_clinico' }
  ];

  let completed = 0;
  queries.forEach(({ tabla, query }) => {
    db.get(query, (err, row) => {
      if (err) console.error(`Error contando ${tabla}:`, err);
      else console.log(`   ${tabla}: ${row.count} registros`);

      completed++;
      if (completed === queries.length) {
        console.log('\n✨ ¡Base de datos poblada exitosamente!');
        db.close();
        process.exit(0);
      }
    });
  });
}
