#language: es

Característica: Gestionar Turnos

  Escenario: Agregar un nuevo turno exitosamente

    Dado que el usuario se encuentra en la página de inicio de sesión del proyecto veterinaria
    Cuando el usuario ingresa sus credenciales válidas
      | usuario          | contrasena |
      | admin@gmail.com  | 123456     |
    Y se navega a la página de turnos
    Y se agrega un nuevo turno con los datos
      | fecha      | hora  | mascota | veterinario | motivo                 | estado    |
      | 2026-06-20 | 09:30 | Luna    | Juan Perez  | Control general Luna   | Pendiente |
    Entonces se valida que el turno fue creado correctamente

  Esquema del escenario: Agregar turnos con distintos datos

    Dado que el usuario está logueado en el panel principal
    Cuando se navega a la página de turnos
    Y se agrega un nuevo turno con los datos
      | fecha   | hora   | mascota   | veterinario   | motivo   | estado   |
      | <fecha> | <hora> | <mascota> | <veterinario> | <motivo> | <estado> |
    Entonces se valida que el turno fue creado correctamente

    Ejemplos:
      | fecha      | hora  | mascota | veterinario | motivo               | estado    |
      | 2026-06-21 | 10:00 | Milo    | Juan Perez  | Vacunacion Milo      | Pendiente |
      | 2026-06-22 | 11:30 | Luna    | Juan Perez  | Revision postoperatoria | Confirmado |
