#language: es

Característica: Ver Veterinarios

  Escenario: Visualizar lista de veterinarios

    Dado que el usuario se encuentra en la página de inicio del proyecto veterinaria
    Cuando el usuario ingresa sus credenciales válidas
      | usuario          | contrasena |
      | admin@gmail.com  | 123456     |
    Y se navega a la página de veterinarios
    Entonces se valida que la página de veterinarios está visible
