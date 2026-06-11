#language: es

Característica: Ver Turnos

  Escenario: Visualizar lista de turnos

    Dado que el usuario se encuentra en la página de inicio de sesión del proyecto veterinaria
    Cuando el usuario ingresa sus credenciales válidas
      | usuario          | contrasena |
      | admin@gmail.com  | 123456     |
    Y se navega a la página de turnos
    Entonces se valida que la página de turnos está visible
