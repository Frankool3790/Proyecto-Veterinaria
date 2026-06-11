#language: es

Característica: Buscar usuario

  Escenario: Buscar usuario Admin

    Dado que el usuario se encuentra en la página de inicio del proyecto veterinaria
    Cuando el usuario ingresa sus credenciales válidas
      | usuario   | contrasena |
      | Admin     | admin123   |
    Y busca el usuario "Admin"
    Entonces se visualiza el usuario en los resultados
