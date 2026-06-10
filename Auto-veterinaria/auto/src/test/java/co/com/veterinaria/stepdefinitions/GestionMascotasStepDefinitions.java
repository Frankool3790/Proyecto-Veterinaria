package co.com.veterinaria.stepdefinitions;

import co.com.veterinaria.questions.ValidacionDashboard;
import co.com.veterinaria.tasks.AgregarMascota;
import co.com.veterinaria.userinterfaces.MascotasPage;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;
import cucumber.api.java.es.Y;
import net.serenitybdd.screenplay.questions.Visibility;

import java.util.List;
import java.util.Map;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static org.hamcrest.Matchers.is;

import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;
import static net.serenitybdd.screenplay.questions.WebElementQuestion.stateOf;

public class GestionMascotasStepDefinitions {

    @Dado("^que el cliente ha iniciado sesión en su cuenta personal$")
    public void queElClienteHaIniciadoSesionEnSuCuentaPersonal() {
    }

    @Y("^se encuentra en el módulo de gestión de mascotas$")
    public void seEncuentraEnElModuloDeGestionDeMascotas() {
        theActorInTheSpotlight().should(seeThat(ValidacionDashboard.validacion()));
    }

    @Cuando("^registra una mascota con los siguientes datos$")
    public void registraUnaMascotaConLosSiguientesDatos(List<Map<String, String>> datos) {
        Map<String, String> data = datos.get(0);
        theActorInTheSpotlight().attemptsTo(
                AgregarMascota.conDatos(data.get("nombre"), data.get("especie"), data.get("raza"), data.get("edad"), "Administrador")
        );
    }

    @Entonces("^el sistema debería guardar la mascota y mostrarla en su lista de \"([^\"]*)\"$")
    public void elSistemaDeberiaGuardarLaMascotaYMostrarlaEnSuListaDe(String lista) {
        theActorInTheSpotlight().should(seeThat(stateOf(MascotasPage.MASCOTA_IN_LIST.of("Firulais")), isVisible()));
    }
}
