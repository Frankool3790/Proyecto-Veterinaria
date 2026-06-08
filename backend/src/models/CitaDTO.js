export class CitaDTO {
  constructor(id, fecha, hora, mascotaId, veterinarioId, motivo, estado) {
    this.id = id;
    this.fecha = fecha;
    this.hora = hora;
    this.mascotaId = mascotaId;
    this.veterinarioId = veterinarioId;
    this.motivo = motivo;
    this.estado = estado;
  }
}
