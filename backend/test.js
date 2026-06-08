/**
 * Script de prueba para validar que el backend está funcionando correctamente
 * Ejecutar con: node test.js
 */

import http from 'http';

const BASE_URL = 'http://localhost:3307/api';

async function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data ? JSON.parse(data) : null
        });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Iniciando pruebas del backend...\n');

  try {
    // Test 1: Login
    console.log('1️⃣ Probando login...');
    const loginRes = await makeRequest('POST', '/auth/login', {
      username: 'admin',
      password: 'admin123'
    });
    console.log(`Status: ${loginRes.status}`);
    console.log(`Respuesta:`, loginRes.data);
    console.log('');

    // Test 2: Obtener clientes
    console.log('2️⃣ Obteniendo clientes...');
    const clientesRes = await makeRequest('GET', '/clientes');
    console.log(`Status: ${clientesRes.status}`);
    console.log(`Clientes:`, clientesRes.data);
    console.log('');

    // Test 3: Crear cliente
    console.log('3️⃣ Creando nuevo cliente...');
    const newClienteRes = await makeRequest('POST', '/clientes', {
      nombre: 'Cliente Test',
      email: 'test@email.com',
      telefono: '123456789',
      direccion: 'Calle Test 123'
    });
    console.log(`Status: ${newClienteRes.status}`);
    console.log(`Cliente creado:`, newClienteRes.data);
    const clienteId = newClienteRes.data?.id;
    console.log('');

    // Test 4: Obtener veterinarios
    console.log('4️⃣ Obteniendo veterinarios...');
    const vetRes = await makeRequest('GET', '/veterinarios');
    console.log(`Status: ${vetRes.status}`);
    console.log(`Veterinarios:`, vetRes.data);
    console.log('');

    // Test 5: Crear veterinario
    console.log('5️⃣ Creando nuevo veterinario...');
    const newVetRes = await makeRequest('POST', '/veterinarios', {
      nombre: 'Dr. Test',
      especialidad: 'Cirugía',
      email: 'drtest@veterinaria.com'
    });
    console.log(`Status: ${newVetRes.status}`);
    console.log(`Veterinario creado:`, newVetRes.data);
    const vetId = newVetRes.data?.id;
    console.log('');

    // Test 6: Crear mascota
    if (clienteId) {
      console.log('6️⃣ Creando mascota...');
      const mascotaRes = await makeRequest('POST', '/mascotas', {
        nombre: 'Mascota Test',
        especie: 'Perro',
        raza: 'Labrador',
        edad: 3,
        clienteId: clienteId
      });
      console.log(`Status: ${mascotaRes.status}`);
      console.log(`Mascota creada:`, mascotaRes.data);
      const mascotaId = mascotaRes.data?.id;

      // Test 7: Crear cita
      if (mascotaId && vetId) {
        console.log('');
        console.log('7️⃣ Creando cita...');
        const citaRes = await makeRequest('POST', '/citas', {
          fecha: '2024-06-15',
          hora: '14:30',
          motivo: 'Revisión general',
          estado: 'Pendiente',
          mascotaId: mascotaId,
          veterinarioId: vetId
        });
        console.log(`Status: ${citaRes.status}`);
        console.log(`Cita creada:`, citaRes.data);
      }
    }

    console.log('\n✅ Pruebas completadas exitosamente');
  } catch (error) {
    console.error('❌ Error durante las pruebas:', error.message);
    console.error('Asegúrate de que el servidor está corriendo en http://localhost:3307');
  }
}

runTests();
