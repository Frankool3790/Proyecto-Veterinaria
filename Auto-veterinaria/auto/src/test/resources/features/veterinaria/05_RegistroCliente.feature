# language: es

Característica: Registro de usuario veterinaria
  Como cliente nuevo
  Quiero registrarme en el sistema
  Para acceder a los servicios de la veterinaria

  Antecedente:
    Dado que el usuario navega al sitio web de la veterinaria

  @registro_cliente
  Esquema del escenario: Registro exitoso de cliente nuevo
      Cuando el usuario decide registrarse desde la página principal
      Y completa el formulario de registro con sus datos personales
        | nombre   | apellido   | email   | password   |
        | <nombre> | <apellido> | <email> | <password> |
      Entonces el sistema debería crear su cuenta satisfactoriamente
      Y mostrar el mensaje de confirmación "Registro exitoso"

    Ejemplos:
      | nombre | apellido | email              | password |
      | Juan   | Perez    | juanperez@mail.com | 12345678 |
      | Maria  | Lopez    | marialopez@mail.com| password123 |
