package co.com.veterinaria.stepdefinitions;

import co.com.veterinaria.questions.ValidacionDashboard;
import co.com.veterinaria.tasks.AgregarVeterinario;
import co.com.veterinaria.userinterfaces.VeterinariosPage;
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

public class VeterinariosStepDefinitions {

    @Dado("^que el administrador ha iniciado sesión exitosamente en el sistema$")
    public void queElAdministradorHaIniciadoSesionExitosamenteEnElSistema() {
        // Este paso suele llamar a otros pasos o tareas de login
    }

    @Y("^se encuentra en la sección de veterinarios del panel administrativo$")
    public void seEncuentraEnLaSeccionDeVeterinariosDelPanelAdministrativo() {
        theActorInTheSpotlight().should(seeThat(ValidacionDashboard.validacion()));
    }

    @Cuando("^intenta agregar un veterinario con los siguientes datos:$")
    public void intentaAgregarUnVeterinarioConLosSiguientesDatos(List<Map<String, String>> datos) {
        Map<String, String> data = datos.get(0);
        theActorInTheSpotlight().attemptsTo(
                AgregarVeterinario.conDatos(data.get("nombre"), data.get("especialidad"), data.get("email"))
        );
    }

    @Entonces("^el nuevo veterinario debería aparecer registrado en la lista de profesionales$")
    public void elNuevoVeterinarioDeberiaAparecerRegistradoEnLaListaDeProfesionales() {
        theActorInTheSpotlight().should(seeThat(stateOf(VeterinariosPage.VETERINARIO_IN_LIST.of("Dr. House")), isVisible()));
    }
}
