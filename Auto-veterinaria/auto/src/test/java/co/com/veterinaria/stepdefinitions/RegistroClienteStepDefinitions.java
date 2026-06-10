package co.com.veterinaria.stepdefinitions;

import co.com.veterinaria.tasks.RegistroCliente;
import co.com.veterinaria.userinterfaces.LandingPage;
import io.cucumber.java.es.Cuando;
import io.cucumber.java.es.Dado;
import io.cucumber.java.es.Entonces;
import io.cucumber.java.es.Y;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Open;
import net.serenitybdd.screenplay.waits.WaitUntil;

import java.util.List;
import java.util.Map;

import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class RegistroClienteStepDefinitions {

    @Dado("^que el usuario navega al sitio web de la veterinaria$")
    public void queElUsuarioNavegaAlSitioWebDeLaVeterinaria() {
        theActorInTheSpotlight().attemptsTo(Open.url("http://localhost:5174/"));
    }

    @Cuando("^el usuario decide registrarse desde la página principal$")
    public void elUsuarioDecideRegistrarseDesdeLaPaginaPrincipal() {
        theActorInTheSpotlight().attemptsTo(
                WaitUntil.the(LandingPage.BTN_REGISTER, isVisible()).forNoMoreThan(30).seconds(),
                Click.on(LandingPage.BTN_REGISTER)
        );
    }

    @Y("^completa el formulario de registro con sus datos personales$")
    public void completaElFormularioDeRegistroConSusDatosPersonales(List<Map<String, String>> datos) {
        Map<String, String> data = datos.get(0);
        theActorInTheSpotlight().attemptsTo(
                RegistroCliente.conDatos(data.get("nombre"), data.get("apellido"), data.get("email"), data.get("password"))
        );
    }

    @Entonces("^el sistema debería crear su cuenta satisfactoriamente$")
    public void elSistemaDeberiaCrearSuCuentaSatisfactoriamente() {
    }

    @Y("^mostrar el mensaje de confirmación \"([^\"]*)\"$")
    public void mostrarElMensajeDeConfirmacion(String mensaje) {
    }
}
