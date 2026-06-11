export class VacunaDTO {
  constructor(id, nombreVacuna, fechaAplicacion, fechaProximaDosis, veterinarioId, mascotaId, notas) {
    this.id = id;
    this.nombreVacuna = nombreVacuna;
    this.fechaAplicacion = fechaAplicacion;
    this.fechaProximaDosis = fechaProximaDosis;
    this.veterinarioId = veterinarioId;
    this.mascotaId = mascotaId;
    this.notas = notas;
  }
}
