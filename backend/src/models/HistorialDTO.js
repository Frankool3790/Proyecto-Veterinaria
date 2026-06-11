export class HistorialDTO {
  constructor(id, mascotaId, fecha, motivoConsulta, peso, temperatura, diagnostico, tratamiento, medicamentos, observaciones, notasPrivadas, veterinarioId, cerrado) {
    this.id = id;
    this.mascotaId = mascotaId;
    this.fecha = fecha;
    this.motivoConsulta = motivoConsulta;
    this.peso = peso;
    this.temperatura = temperatura;
    this.diagnostico = diagnostico;
    this.tratamiento = tratamiento;
    this.medicamentos = medicamentos;
    this.observaciones = observaciones;
    this.notasPrivadas = notasPrivadas;
    this.veterinarioId = veterinarioId;
    this.cerrado = cerrado || false;
  }
}
