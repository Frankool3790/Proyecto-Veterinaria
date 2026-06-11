#language: es

Característica: Cerrar sesión

  Escenario: Logout exitoso

    Dado que el usuario se encuentra en la página de inicio de sesión del proyecto veterinaria
    Cuando el usuario ingresa sus credenciales válidas
      | usuario          | contrasena |
      | admin@gmail.com  | 123456     |
    Y cierra la sesión
    Entonces se visualiza nuevamente el login