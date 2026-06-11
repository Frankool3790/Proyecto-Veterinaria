package co.com.automatizacionAlmasoft.stepsdefinitions;

import co.com.automatizacionAlmasoft.questions.LoginVisible;
import co.com.automatizacionAlmasoft.tasks.CerrarSesion;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;
import net.serenitybdd.screenplay.actors.OnStage;
import org.junit.Assert;

public class CerrarSesionStepDefinitions {

    @Cuando("cierra la sesión")
    public void cerrarSesion() {

        OnStage.theActorInTheSpotlight()
                .attemptsTo(
                        CerrarSesion.correctamente()
                );
    }

    @Entonces("se visualiza nuevamente el login")
    public void validarLogout() {

        Assert.assertTrue(
                LoginVisible.nuevamente()
                        .answeredBy(OnStage.theActorInTheSpotlight())
        );
    }
}