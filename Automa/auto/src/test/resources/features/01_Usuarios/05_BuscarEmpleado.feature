#language: es

Característica: Buscar empleado

  Escenario: Buscar empleado creado

    Dado que el usuario se encuentra en la página de inicio del proyecto veterinaria

    Cuando el usuario ingresa sus credenciales válidas
      | usuario | contrasena |
      | Admin   | admin123   |

    Y busca el empleado "Juan"

    Entonces el empleado aparece en la lista
