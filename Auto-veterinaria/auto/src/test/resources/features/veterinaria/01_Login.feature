# language: es

Característica: Gestión de usuarios
  Como administrador del sistema
  Quiero poder iniciar sesión en la aplicación
  Para gestionar la veterinaria

  Antecedente:
    Dado que el administrador navega al sitio web de la veterinaria

  @login_admin
  Escenario: Inicio de sesión exitoso como administrador
    Cuando el administrador decide iniciar sesión desde la página principal
    Y completa el formulario de ingreso con el usuario "admin@gmail.com" y la contraseña "admin123"
    Entonces el sistema debería permitirle el acceso y mostrar el mensaje de bienvenida en el dashboard
