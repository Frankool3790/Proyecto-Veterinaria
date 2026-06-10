package co.com.veterinaria.stepdefinitions;

import co.com.veterinaria.questions.ValidacionDashboard;
import co.com.veterinaria.tasks.AgregarMascota;
import co.com.veterinaria.userinterfaces.MascotasPage;
import io.cucumber.java.es.Cuando;
import io.cucumber.java.es.Entonces;
import io.cucumber.java.es.Y;
import net.serenitybdd.screenplay.questions.Visibility;

import java.util.List;
import java.util.Map;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static org.hamcrest.Matchers.is;

import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;
import static net.serenitybdd.screenplay.questions.WebElementQuestion.stateOf;

public class MascotasStepDefinitions {

    @Y("^se encuentra en la sección de mascotas del panel administrativo$")
    public void seEncuentraEnLaSeccionDeMascotasDelPanelAdministrativo() {
        theActorInTheSpotlight().should(seeThat(ValidacionDashboard.validacion()));
    }

    @Cuando("^intenta registrar una mascota con los siguientes datos:$")
    public void intentaRegistrarUnaMascotaConLosSiguientesDatos(List<Map<String, String>> datos) {
        Map<String, String> data = datos.get(0);
        theActorInTheSpotlight().attemptsTo(
                AgregarMascota.conDatos(data.get("nombre"), data.get("especie"), data.get("raza"), data.get("edad"), data.get("cliente"))
        );
    }

    @Entonces("^la nueva mascota debería aparecer en la lista general de pacientes$")
    public void laNuevaMascotaDeberiaAparecerEnLaListaGeneralDePacientes() {
        theActorInTheSpotlight().should(seeThat(stateOf(MascotasPage.MASCOTA_IN_LIST.of("Firulais")), isVisible()));
    }
}
