package co.com.automatizacionAlmasoft.stepsdefinitions;

import co.com.automatizacionAlmasoft.questions.ValidarDashboard;
import co.com.automatizacionAlmasoft.tasks.Login;
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

public class LoginStepDefinitions {

    @Dado("^que el usuario se encuentra en la página de inicio de sesión del proyecto veterinaria$")
    public void abrirPaginaLogin() {
        OnStage.setTheStage(new OnlineCast());
        OnStage.theActorCalled("Usuario")
                .wasAbleTo(
                        Open.url("http://localhost:3000/login")
                );
    }

    @Dado("^que el usuario está logueado en el panel principal$")
    public void usuarioLogueadoEnDashboard() {
        OnStage.setTheStage(new OnlineCast());
        OnStage.theActorCalled("Usuario")
                .wasAbleTo(
                        Open.url("http://localhost:3000/login"),
                        Login.conCredenciales("admin@gmail.com", "123456")
                );
        seeThat(ValidarDashboard.estaVisible(), is(true));
    }

    @Cuando("^el usuario ingresa sus credenciales válidas$")
    public void ingresarCredenciales(DataTable dataTable) {
        List<Map<String, String>> credenciales = dataTable.asMaps(String.class, String.class);
        String usuario = credenciales.get(0).get("usuario");
        String contrasena = credenciales.get(0).get("contrasena");

        theActorInTheSpotlight()
                .attemptsTo(
                        Login.conCredenciales(usuario, contrasena)
                );
    }

    @Entonces("^se valida el acceso al panel principal$")
    public void validarAccesoDashboard() {
        seeThat(ValidarDashboard.estaVisible(), is(true));
    }
}
