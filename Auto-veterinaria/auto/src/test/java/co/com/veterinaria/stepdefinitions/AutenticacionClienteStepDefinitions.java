package co.com.veterinaria.stepdefinitions;

import co.com.veterinaria.questions.ValidacionDashboard;
import co.com.veterinaria.tasks.Login;
import co.com.veterinaria.userinterfaces.LandingPage;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;
import cucumber.api.java.es.Y;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Open;
import net.serenitybdd.screenplay.waits.WaitUntil;

import java.util.List;
import java.util.Map;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class AutenticacionClienteStepDefinitions {

    @Dado("^que el cliente navega al sitio web de la veterinaria$")
    public void queElClienteNavegaAlSitioWebDeLaVeterinaria() {
        theActorInTheSpotlight().attemptsTo(Open.url("http://localhost:5174/"));
    }

    @Cuando("^el cliente decide iniciar sesión desde la página principal$")
    public void elClienteDecideIniciarSesionDesdeLaPaginaPrincipal() {
        theActorInTheSpotlight().attemptsTo(
                WaitUntil.the(LandingPage.BTN_LOGIN, isVisible()).forNoMoreThan(30).seconds(),
                Click.on(LandingPage.BTN_LOGIN)
        );
    }

    @Y("^completa el formulario de ingreso con sus credenciales \"([^\"]*)\" y la contraseña \"([^\"]*)\"$")
    public void completaElFormularioDeIngresoConSusCredencialesYLaContrasena(String usuario, String contrasena) {
        theActorInTheSpotlight().attemptsTo(
                Login.withCredentials(usuario, contrasena)
        );
    }

    @Entonces("^el sistema debería permitirle el acceso a su panel personal$")
    public void elSistemaDeberiaPermitirleElAccesoASuPanelPersonal() {
        theActorInTheSpotlight().should(seeThat(ValidacionDashboard.validacion()));
    }
}
