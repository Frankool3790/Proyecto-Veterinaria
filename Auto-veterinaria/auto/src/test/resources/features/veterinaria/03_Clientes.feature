# language: es

Característica: Gestión de clientes
  Como administrador del sistema
  Quiero poder registrar nuevos clientes
  Para mantener un registro de los dueños de las mascotas

  Antecedente:
    Dado que el administrador ha iniciado sesión exitosamente en el sistema

  @agregar_cliente
  Escenario: Registrar un nuevo cliente exitosamente
    Y se encuentra en la sección de clientes del panel administrativo
    Cuando intenta registrar un cliente con los siguientes datos:
      | nombre | telefono | email | direccion |
      | Juan Perez | 123456789 | juan@gmail.com | Calle 123 |
    Entonces el nuevo cliente debería aparecer correctamente en la lista de dueños
