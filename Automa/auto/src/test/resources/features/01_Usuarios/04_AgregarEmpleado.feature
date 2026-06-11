#language: es

Característica: Agregar empleado

  Escenario: Crear empleado

    Dado que el usuario se encuentra en la página de inicio de sesión de OrangeHRM

    Cuando el usuario ingresa sus credenciales válidas
      | usuario | contrasena |
      | Admin   | admin123   |

    Y agrega un empleado
      | nombre | apellido |
      | Juan   | Perez    |

    Entonces el empleado es creado correctamente