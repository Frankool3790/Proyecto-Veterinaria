/**
 * Script para inicializar la base de datos SQLite
 * Ejecutar con: node database/init.js
 */

import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../veterinaria.db');
const schemaPath = path.join(__dirname, 'schema.sql');

console.log('🔧 Inicializando base de datos...\n');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error conectando a la base de datos:', err);
    process.exit(1);
  }
  console.log('✅ Conexión exitosa a SQLite');
  initializeDatabase();
});

function initializeDatabase() {
  // Leer el archivo schema.sql
  fs.readFile(schemaPath, 'utf-8', (err, sql) => {
    if (err) {
      console.error('❌ Error leyendo schema.sql:', err);
      db.close();
      process.exit(1);
    }

    // Ejecutar cada sentencia SQL
    db.exec(sql, (err) => {
      if (err) {
        console.error('❌ Error creando tablas:', err);
        db.close();
        process.exit(1);
      }

      console.log('✅ Tablas creadas exitosamente');
      insertDefaultData();
    });
  });
}

async function insertDefaultData() {
  try {
    // Hash de la contraseña '123456'
    const hashedPassword = await bcrypt.hash('123456', 10);

    // Insertar usuario admin
    db.run(
      `INSERT OR IGNORE INTO usuarios (username, password, nombre, roles, email)
       VALUES ('admin@gmail.com', ?, 'Administrador', 'ROLE_ADMIN', 'admin@gmail.com')`,
      [hashedPassword],
      (err) => {
        if (err) {
          console.error('❌ Error insertando usuario admin:', err);
          db.close();
          process.exit(1);
        }
        console.log('✅ Usuario admin creado');

        // Insertar veterinarios de ejemplo
        const veterinarios = [
          { nombre: 'Dr. Carlos López', especialidad: 'Cirugía General', email: 'carlos@veterinaria.com', telefono: '555-0101' },
          { nombre: 'Dra. María González', especialidad: 'Oftalmología', email: 'maria@veterinaria.com', telefono: '555-0102' },
          { nombre: 'Dr. Juan Rodríguez', especialidad: 'Cardiología', email: 'juan@veterinaria.com', telefono: '555-0103' }
        ];

        let veterinarioCount = 0;
        veterinarios.forEach(vet => {
          db.run(
            `INSERT OR IGNORE INTO veterinarios (nombre, especialidad, email, telefono)
             VALUES (?, ?, ?, ?)`,
            [vet.nombre, vet.especialidad, vet.email, vet.telefono],
            (err) => {
              if (err) console.error('Error insertando veterinario:', err);
              else veterinarioCount++;

              if (veterinarioCount === veterinarios.length) {
                console.log(`✅ ${veterinarioCount} veterinarios de ejemplo creados`);
                finishSetup();
              }
            }
          );
        });
      }
    );
  } catch (error) {
    console.error('❌ Error:', error);
    db.close();
    process.exit(1);
  }
}

function finishSetup() {
  // Mostrar estadísticas
  db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
      console.error('Error obteniendo tablas:', err);
    } else {
      console.log(`\n📊 Tablas creadas: ${tables.length}`);
      tables.forEach(t => console.log(`   - ${t.name}`));
    }

    console.log(`\n📁 Base de datos ubicada en: ${dbPath}`);
    console.log('\n✨ ¡Base de datos inicializada correctamente!');
    console.log('\n📝 Credenciales por defecto:');
    console.log('   Usuario: admin');
    console.log('   Contraseña: admin123');

    db.close();
    process.exit(0);
  });
}
