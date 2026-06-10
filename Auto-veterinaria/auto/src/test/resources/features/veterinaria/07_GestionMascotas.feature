# language: es

Característica: Registro de mascota en la veterinaria
  Como cliente autenticado
  Quiero registrar a mi mascota
  Para llevar el control de su historial medico

  Antecedente:
    Dado que el cliente ha iniciado sesión en su cuenta personal

  @registro_mascota_cliente
  Esquema del escenario: Registro exitoso de mascota por parte del cliente
    Y se encuentra en el módulo de gestión de mascotas
    Cuando registra una mascota con los siguientes datos
      | nombre   | especie   | raza   | edad   |
      | <nombre> | <especie> | <raza> | <edad> |
    Entonces el sistema debería guardar la mascota y mostrarla en su lista de "Mis Mascotas"

    Ejemplos:
      | nombre   | especie | raza       | edad |
      | Firulais | Perro   | Labrador   | 5    |
      | Michi    | Gato    | Siames     | 2    |
