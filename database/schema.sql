-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  nombre TEXT,
  apellido TEXT,
  email TEXT UNIQUE,
  roles TEXT DEFAULT 'ROLE_USER',
  cliente_id INTEGER,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
);

-- Tabla de Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  telefono TEXT,
  email TEXT UNIQUE,
  direccion TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Mascotas
CREATE TABLE IF NOT EXISTS mascotas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  especie TEXT NOT NULL,
  raza TEXT,
  edad INTEGER,
  cliente_id INTEGER NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- Tabla de Veterinarios
CREATE TABLE IF NOT EXISTS veterinarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  especialidad TEXT,
  email TEXT UNIQUE,
  telefono TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Citas
CREATE TABLE IF NOT EXISTS citas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha TEXT NOT NULL,
  hora TEXT NOT NULL,
  motivo TEXT,
  estado TEXT DEFAULT 'Pendiente',
  mascota_id INTEGER NOT NULL,
  veterinario_id INTEGER NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE,
  FOREIGN KEY (veterinario_id) REFERENCES veterinarios(id) ON DELETE CASCADE
);

-- Tabla de Historial Clínico
CREATE TABLE IF NOT EXISTS historial_clinico (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  descripcion TEXT NOT NULL,
  fecha TEXT NOT NULL,
  notas TEXT,
  mascota_id INTEGER NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_clientes_email ON clientes(email);
CREATE INDEX IF NOT EXISTS idx_mascotas_cliente_id ON mascotas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_mascotas_nombre ON mascotas(nombre);
CREATE INDEX IF NOT EXISTS idx_citas_mascota_id ON citas(mascota_id);
CREATE INDEX IF NOT EXISTS idx_citas_veterinario_id ON citas(veterinario_id);
CREATE INDEX IF NOT EXISTS idx_citas_fecha ON citas(fecha);
CREATE INDEX IF NOT EXISTS idx_historial_mascota_id ON historial_clinico(mascota_id);
CREATE INDEX IF NOT EXISTS idx_usuarios_username ON usuarios(username);
