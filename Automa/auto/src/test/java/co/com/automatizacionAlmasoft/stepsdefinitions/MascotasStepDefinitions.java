package co.com.automatizacionAlmasoft.stepsdefinitions;

import co.com.automatizacionAlmasoft.questions.ValidarMascotaCreada;
import co.com.automatizacionAlmasoft.tasks.AgregarMascota;
import cucumber.api.DataTable;
import cucumber.api.java.es.Entonces;
import cucumber.api.java.es.Y;

import java.util.List;
import java.util.Map;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static org.hamcrest.CoreMatchers.is;

public class MascotasStepDefinitions {
    private String ultimoNombreMascota;

    @Y("^se agrega una nueva mascota con los datos$")
    public void agregarNuevaMascota(DataTable dataTable) {
        List<Map<String, String>> datos = dataTable.asMaps(String.class, String.class);

        String nombre = datos.get(0).get("nombre");
        String especie = datos.get(0).get("especie");
        String raza = datos.get(0).get("raza");
        String edad = datos.get(0).get("edad");
        String propietario = datos.get(0).get("propietario");

        ultimoNombreMascota = nombre;
        theActorInTheSpotlight().attemptsTo(
                AgregarMascota.conDatos(nombre, especie, raza, edad, propietario)
        );
    }

    @Entonces("^se valida que la mascota fue creada correctamente$")
    public void validarMascotaCreada() {
        seeThat(ValidarMascotaCreada.conNombre(ultimoNombreMascota), is(true));
    }
}
