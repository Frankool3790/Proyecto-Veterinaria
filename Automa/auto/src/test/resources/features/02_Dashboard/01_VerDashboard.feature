#language: es

Característica: Ver Dashboard

  Escenario: Visualizar Dashboard exitoso

    Dado que el usuario se encuentra en la página de inicio de sesión del proyecto veterinaria
    Cuando el usuario ingresa sus credenciales válidas
      | usuario          | contrasena |
      | admin@gmail.com  | 123456     |
    Entonces se valida el acceso al panel principal
