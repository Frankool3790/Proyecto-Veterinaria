# language: es

Característica: Autenticacion en el sistema veterinaria
  Como cliente registrado
  Quiero iniciar sesion en el sistema
  Para acceder al contenido y funcionalidades disponibles en mi cuenta

  Antecedente:
    Dado que el cliente navega al sitio web de la veterinaria

  @login_cliente
  Esquema del escenario: Verificar el inicio de sesion exitoso del cliente
    Cuando el cliente decide iniciar sesión desde la página principal
    Y completa el formulario de ingreso con sus credenciales "<correo>" y la contraseña "<contraseña>"
    Entonces el sistema debería permitirle el acceso a su panel personal

    Ejemplos:
      | correo              | contraseña |
      | maicol777@gmail.com | 123456789  |
      | nelson@gmail.com    | 123456789  |
