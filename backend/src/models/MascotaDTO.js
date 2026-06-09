export class MascotaDTO {
  constructor(id, nombre, especie, raza, edad, clienteId, fotoUrl) {
    this.id = id;
    this.nombre = nombre;
    this.especie = especie;
    this.raza = raza;
    this.edad = edad;
    this.clienteId = clienteId;
    this.fotoUrl = fotoUrl;
  }
}
