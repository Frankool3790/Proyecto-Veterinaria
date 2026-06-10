# language: es

Característica: Gestión de mascotas
  Como administrador del sistema
  Quiero poder registrar nuevas mascotas
  Para llevar el control de los pacientes

  Antecedente:
    Dado que el administrador ha iniciado sesión exitosamente en el sistema

  @agregar_mascota_admin
  Escenario: Registrar una nueva mascota exitosamente por el administrador
    Y se encuentra en la sección de mascotas del panel administrativo
    Cuando intenta registrar una mascota con los siguientes datos:
      | nombre | especie | raza | edad | cliente |
      | Firulais | Perro | Labrador | 5 | Juan Perez |
    Entonces la nueva mascota debería aparecer en la lista general de pacientes
