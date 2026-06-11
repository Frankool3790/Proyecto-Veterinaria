#language: es

Característica: Agregar Cliente

  Escenario: Agregar nuevo cliente exitoso

    Dado que el usuario se encuentra en la página de inicio del proyecto veterinaria
    Cuando el usuario ingresa sus credenciales válidas
      | usuario          | contrasena |
      | admin@gmail.com  | 123456     |
    Y se navega a la página de clientes
    Y se agrega un nuevo cliente con los datos
      | nombre          | telefono       | email               | direccion       |
      | María González  | 555-1234       | maria@example.com   | Calle 123       |
    Entonces se valida que el cliente fue creado correctamente
