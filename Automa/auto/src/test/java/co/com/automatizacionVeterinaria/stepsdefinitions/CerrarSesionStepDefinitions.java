package co.com.automatizacionVeterinaria.stepsdefinitions;

import co.com.automatizacionVeterinaria.questions.LoginVisible;
import co.com.automatizacionVeterinaria.tasks.CerrarSesion;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static org.hamcrest.CoreMatchers.is;

public class CerrarSesionStepDefinitions {

    @Cuando("^cierra la sesión$")
    public void cerrarSesion() {

        theActorInTheSpotlight()
                .attemptsTo(
                        CerrarSesion.correctamente()
                );
    }

    @Entonces("^se visualiza nuevamente el login$")
    public void validarLogout() {

        seeThat(LoginVisible.nuevamente(), is(true));
    }
}
