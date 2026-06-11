#language: es

Característica: Registrar Usuario

  Escenario: Registrar nuevo usuario exitoso

    Dado que el usuario está en la página de inicio
    Cuando el usuario abre el formulario de registro
    Y el usuario completa el formulario con los datos:
      | nombre    | apellido | email               | password |
      | Carlos    | Lopez    | carlos@example.com  | 123456   |
    Y el usuario envía el formulario de registro
    Entonces el usuario es redirigido a la página de inicio de sesión
