#language: es

Característica: Gestionar Mascotas

  Escenario: Agregar una nueva mascota exitosamente

    Dado que el usuario se encuentra en la página de inicio de sesión del proyecto veterinaria
    Cuando el usuario ingresa sus credenciales válidas
      | usuario          | contrasena |
      | admin@gmail.com  | 123456     |
    Y se navega a la página de mascotas
    Y se agrega una nueva mascota con los datos
      | nombre | especie | raza     | edad | propietario    |
      | Milo   | Perro   | Beagle   | 3    | María González |
    Entonces se valida que la mascota fue creada correctamente

  Esquema del escenario: Agregar mascotas con distintos datos

    Dado que el usuario está logueado en el panel principal
    Cuando se navega a la página de mascotas
    Y se agrega una nueva mascota con los datos
      | nombre   | especie   | raza   | edad   | propietario   |
      | <nombre> | <especie> | <raza> | <edad> | <propietario> |
    Entonces se valida que la mascota fue creada correctamente

    Ejemplos:
      | nombre | especie | raza       | edad | propietario    |
      | Luna   | Perro   | Labrador   | 2    | María González |
      | Rocky  | Perro   | Beagle     | 5    | María González |
