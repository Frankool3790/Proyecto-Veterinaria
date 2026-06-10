# language: es

Característica: Agendamiento de citas veterinarias
  Como cliente con mascotas registradas
  Quiero agendar una cita medica
  Para que mi mascota reciba atencion profesional

  Antecedente:
    Dado que el cliente ha iniciado sesión en su cuenta personal

  @agendar_cita_cliente
  Esquema del escenario: Agendamiento exitoso de cita medica por el cliente
    Y se encuentra en el módulo de agendamiento de turnos
    Cuando solicita una cita con los siguientes detalles
      | mascota   | veterinario   | fecha   | hora   | motivo   |
      | <mascota> | <veterinario> | <fecha> | <hora> | <motivo> |
    Entonces el sistema debería confirmar la solicitud y mostrarla con estado "Pendiente"

    Ejemplos:
      | mascota  | veterinario | fecha      | hora  | motivo         |
      | Firulais | Dr. House   | 2026-07-15 | 10:00 | Chequeo general |
      | Michi    | Dr. House   | 2026-07-16 | 15:30 | Vacunacion     |
