package co.com.veterinaria.stepdefinitions;

import co.com.veterinaria.questions.ValidacionDashboard;
import co.com.veterinaria.tasks.Login;
import co.com.veterinaria.userinterfaces.LandingPage;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Entonces;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Open;
import net.serenitybdd.screenplay.waits.WaitUntil;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class LoginStepDefinitions {

    @Dado("^que el administrador navega al sitio web de la veterinaria$")
    public void queElAdministradorNavegaAlSitioWebDeLaVeterinaria() {
        theActorInTheSpotlight().attemptsTo(
                Open.url("http://localhost:3000/")
        );
    }

    @Cuando("^el administrador decide iniciar sesión desde la página principal$")
    public void elAdministradorDecideIniciarSesionDesdeLaPaginaPrincipal() {
        theActorInTheSpotlight().attemptsTo(
                WaitUntil.the(LandingPage.BTN_LOGIN, isVisible()).forNoMoreThan(30).seconds(),
                Click.on(LandingPage.BTN_LOGIN)
        );
    }

    @Cuando("^completa el formulario de ingreso con el usuario \"([^\"]*)\" y la contraseña \"([^\"]*)\"$")
    public void completaElFormularioDeIngresoConElUsuarioYLaContrasena(String usuario, String contrasena) {
        theActorInTheSpotlight().attemptsTo(
                Login.withCredentials(usuario, contrasena)
        );
    }

    @Entonces("^el sistema debería permitirle el acceso y mostrar el mensaje de bienvenida en el dashboard$")
    public void elSistemaDeberiaPermitirleElAccesoYMostrarElMensajeDeBienvenidaEnElDashboard() {
        theActorInTheSpotlight().should(
                seeThat(ValidacionDashboard.validacion())
        );
    }
}
