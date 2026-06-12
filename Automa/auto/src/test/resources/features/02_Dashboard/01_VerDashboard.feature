#language: es

Característica: Ver Dashboard y Navegar por el Sistema

  Escenario: Visualizar Dashboard exitoso

    Dado que el usuario se encuentra en la página de inicio de sesión del proyecto veterinaria
    Cuando el usuario ingresa sus credenciales válidas
      | usuario          | contrasena |
      | admin@gmail.com  | 123456     |
    Entonces se valida el acceso al panel principal

  Escenario: Navegar por todas las secciones del sistema

    Dado que el usuario está logueado en el panel principal
    Cuando se navega a la página de clientes
    Entonces se valida que la página de clientes está visible

    Cuando se navega a la página de mascotas
    Entonces se valida que la página de mascotas está visible

    Cuando se navega a la página de turnos
    Entonces se valida que la página de turnos está visible

    Cuando se navega a la página de veterinarios
    Entonces se valida que la página de veterinarios está visible

    Cuando se navega a la página de historial
    Entonces se valida que la página de historial está visible

    Cuando se navega a la página de pagos
    Entonces se valida que la página de pagos está visible

    Cuando se navega a la página de dashboard
    Entonces se valida el acceso al panel principal
