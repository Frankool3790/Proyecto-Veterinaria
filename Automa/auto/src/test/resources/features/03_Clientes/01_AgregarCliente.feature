#language: es

Característica: Agregar y Gestionar Clientes

  Escenario: Agregar nuevo cliente exitoso

    Dado que el usuario se encuentra en la página de inicio de sesión del proyecto veterinaria
    Cuando el usuario ingresa sus credenciales válidas
      | usuario          | contrasena |
      | admin@gmail.com  | 123456     |
    Y se navega a la página de clientes
    Y se agrega un nuevo cliente con los datos
      | nombre          | telefono       | email               | direccion       |
      | María González  | 555-1234       | maria@example.com   | Calle 123       |
    Entonces se valida que el cliente fue creado correctamente

  Escenario Outline: Agregar múltiples clientes con diferentes datos

    Dado que el usuario está logueado en el panel principal
    Cuando se navega a la página de clientes
    Y se agrega un nuevo cliente con los datos
      | nombre          | telefono       | email               | direccion       |
      | <nombre>        | <telefono>     | <email>             | <direccion>     |
    Entonces se valida que el cliente fue creado correctamente

    Examples:
      | nombre          | telefono       | email               | direccion       |
      | Carlos López    | 555-5678       | carlos@example.com  | Av. Principal   |
      | Ana Ruiz        | 555-9012       | ana@example.com     | Calle 45        |
      | Luis Torres     | 555-3456       | luis@example.com    | Plaza Central   |
