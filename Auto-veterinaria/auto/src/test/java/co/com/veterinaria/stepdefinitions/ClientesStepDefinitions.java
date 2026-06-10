package co.com.veterinaria.stepdefinitions;

import co.com.veterinaria.questions.ValidacionDashboard;
import co.com.veterinaria.tasks.AgregarCliente;
import co.com.veterinaria.userinterfaces.ClientesPage;
import cucumber.api.java.es.Cuando;
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

public class ClientesStepDefinitions {

    @Y("^se encuentra en la sección de clientes del panel administrativo$")
    public void seEncuentraEnLaSeccionDeClientesDelPanelAdministrativo() {
        theActorInTheSpotlight().should(seeThat(ValidacionDashboard.validacion()));
    }

    @Cuando("^intenta registrar un cliente con los siguientes datos:$")
    public void intentaRegistrarUnClienteConLosSiguientesDatos(List<Map<String, String>> datos) {
        Map<String, String> data = datos.get(0);
        theActorInTheSpotlight().attemptsTo(
                AgregarCliente.conDatos(data.get("nombre"), data.get("telefono"), data.get("email"), data.get("direccion"))
        );
    }

    @Entonces("^el nuevo cliente debería aparecer correctamente en la lista de dueños$")
    public void elNuevoClienteDeberiaAparecerCorrectamenteEnLaListaDeDuenos() {
        theActorInTheSpotlight().should(seeThat(stateOf(ClientesPage.CLIENTE_IN_LIST.of("Juan Perez")), isVisible()));
    }
}
