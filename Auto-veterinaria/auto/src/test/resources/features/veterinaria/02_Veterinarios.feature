# language: es

Característica: Gestión de veterinarios
  Como administrador del sistema
  Quiero poder agregar nuevos veterinarios
  Para ampliar el equipo médico

  Antecedente:
    Dado que el administrador ha iniciado sesión exitosamente en el sistema

  @agregar_veterinario
  Escenario: Agregar un nuevo veterinario exitosamente
    Y se encuentra en la sección de veterinarios del panel administrativo
    Cuando intenta agregar un veterinario con los siguientes datos:
      | nombre | especialidad | email |
      | Dr. House | Cirugía | house@sanhyuga.com |
    Entonces el nuevo veterinario debería aparecer registrado en la lista de profesionales
