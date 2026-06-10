package co.com.veterinaria.stepdefinitions;

import co.com.veterinaria.questions.ValidacionDashboard;
import co.com.veterinaria.tasks.AgendarCita;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;
import cucumber.api.java.es.Y;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

import java.util.List;
import java.util.Map;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static net.serenitybdd.screenplay.questions.WebElementQuestion.stateOf;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class AgendamientoCitaStepDefinitions {

    @Y("^se encuentra en el módulo de agendamiento de turnos$")
    public void seEncuentraEnElModuloDeAgendamientoDeTurnos() {
        theActorInTheSpotlight().should(seeThat(ValidacionDashboard.validacion()));
    }

    @Cuando("^solicita una cita con los siguientes detalles$")
    public void solicitaUnaCitaConLosSiguientesDetalles(List<Map<String, String>> datos) {
        Map<String, String> data = datos.get(0);
        theActorInTheSpotlight().attemptsTo(
                AgendarCita.conDetalles(data.get("mascota"), data.get("veterinario"), data.get("fecha"), data.get("hora"), data.get("motivo"))
        );
    }

    @Entonces("^el sistema debería confirmar la solicitud y mostrarla con estado \"([^\"]*)\"$")
    public void elSistemaDeberiaConfirmarLaSolicitudYMostrarlaConEstado(String estado) {
        Target statusCell = Target.the("celda de estado").located(By.xpath("//select[contains(@class, 'status-pendiente')]"));
        theActorInTheSpotlight().should(seeThat(stateOf(statusCell), isVisible()));
    }
}
