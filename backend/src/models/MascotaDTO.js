export class MascotaDTO {
  constructor(id, nombre, especie, raza, edad, clienteId) {
    this.id = id;
    this.nombre = nombre;
    this.especie = especie;
    this.raza = raza;
    this.edad = edad;
    this.clienteId = clienteId;
  }
}
