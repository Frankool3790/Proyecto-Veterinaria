package co.com.automatizacionAlmasoft.stepsdefinitions;

import co.com.automatizacionAlmasoft.questions.ValidarRegistroExitoso;
import co.com.automatizacionAlmasoft.tasks.RegistrarUsuario;
import cucumber.api.DataTable;
import cucumber.api.java.es.Dado;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;
import net.serenitybdd.screenplay.actions.Open;
import net.serenitybdd.screenplay.actors.OnStage;
import net.serenitybdd.screenplay.actors.OnlineCast;

import java.util.List;
import java.util.Map;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static org.hamcrest.CoreMatchers.is;

public class RegistrarStepDefinitions {

    @Dado("^que el usuario está en la página de inicio$")
    public void abrirPaginaInicio() {
        OnStage.setTheStage(new OnlineCast());

        OnStage.theActorCalled("Frank")
                .wasAbleTo(
                        Open.url("http://localhost:3000/")
                );
    }

    @Cuando("^el usuario abre el formulario de registro$")
    public void abrirFormularioRegistro() {
        // Already handled by RegistrarUsuario task
    }

    @Cuando("^el usuario completa el formulario con los datos:$")
    public void completarFormularioRegistro(DataTable dataTable) {
        List<Map<String, String>> datos = dataTable.asMaps(String.class, String.class);
        String nombre = datos.get(0).get("nombre");
        String apellido = datos.get(0).get("apellido");
        String email = datos.get(0).get("email");
        String password = datos.get(0).get("password");

        theActorInTheSpotlight().attemptsTo(
                RegistrarUsuario.conDatos(nombre, apellido, email, password)
        );
    }

    @Cuando("^el usuario envía el formulario de registro$")
    public void enviarFormularioRegistro() {
        // Already handled by RegistrarUsuario task
    }

    @Entonces("^el usuario es redirigido a la página de inicio de sesión$")
    public void validarRedireccionLogin() {
        seeThat(ValidarRegistroExitoso.seRedirigeALogin(), is(true));
    }
}
