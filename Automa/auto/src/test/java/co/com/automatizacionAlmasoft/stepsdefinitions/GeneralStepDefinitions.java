package co.com.automatizacionAlmasoft.stepsdefinitions;

import co.com.automatizacionAlmasoft.questions.ValidarPaginaVisible;
import co.com.automatizacionAlmasoft.tasks.NavegarA;
import cucumber.api.java.es.Y;
import cucumber.api.java.es.Entonces;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static org.hamcrest.CoreMatchers.is;

public class GeneralStepDefinitions {

    @Y("^se navega a la página de (mascotas|turnos|veterinarios|historial|pagos)$")
    public void navegarAPagina(String pagina) {
        theActorInTheSpotlight().attemptsTo(NavegarA.laPagina(pagina));
    }

    @Entonces("^se valida que la página de (mascotas|turnos|veterinarios|historial|pagos) está visible$")
    public void validarPaginaVisible(String pagina) {
        seeThat(ValidarPaginaVisible.deLaPagina(pagina), is(true));
    }
}
