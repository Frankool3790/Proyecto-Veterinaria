#language: es

Característica: Ver Mascotas

  Escenario: Visualizar lista de mascotas

    Dado que el usuario se encuentra en la página de inicio del proyecto veterinaria
    Cuando el usuario ingresa sus credenciales válidas
      | usuario          | contrasena |
      | admin@gmail.com  | 123456     |
    Y se navega a la página de mascotas
    Entonces se valida que la página de mascotas está visible
