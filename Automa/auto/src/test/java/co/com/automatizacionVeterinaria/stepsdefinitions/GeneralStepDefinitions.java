package co.com.automatizacionVeterinaria.stepsdefinitions;

import co.com.automatizacionVeterinaria.questions.ValidarPaginaVisible;
import co.com.automatizacionVeterinaria.tasks.NavegarA;
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
