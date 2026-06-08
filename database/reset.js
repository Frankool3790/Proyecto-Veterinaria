/**
 * Script para resetear la base de datos
 * Elimina la base de datos actual y la reinicializa desde cero
 * Ejecutar con: node database/reset.js
 */

import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../veterinaria.db');

console.log('⚠️  Resetando base de datos...\n');

// Eliminar archivo de base de datos si existe
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('✅ Base de datos anterior eliminada');
}

// Crear nueva base de datos vacía
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error creando nueva base de datos:', err);
    process.exit(1);
  }
  console.log('✅ Nueva base de datos creada');
  console.log('📁 Ubicación: ' + dbPath);
  console.log('\n💡 Próximos pasos:');
  console.log('   1. Ejecuta: node database/init.js');
  console.log('   2. Opcionalmente ejecuta: node database/seed.js para datos de prueba');
  
  db.close();
  process.exit(0);
});
