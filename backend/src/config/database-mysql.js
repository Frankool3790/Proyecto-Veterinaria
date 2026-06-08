import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'veterinaria',
  port: Number(process.env.DB_PORT || 3307),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true,
  connectTimeout: 10000,
});

export const testMySQLConnection = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('Conectado a MySQL en puerto', process.env.DB_PORT || 3307);
  } catch (error) {
    console.error('Error conectando a MySQL:', error.message);
    throw error;
  }
};
