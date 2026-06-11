package co.com.automatizacionAlmasoft.stepsdefinitions;

import co.com.automatizacionAlmasoft.tasks.BuscarUsuario;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;
import net.serenitybdd.screenplay.actors.OnStage;

public class BuscarUsuarioStepDefinitions {

    @Cuando("^busca el usuario \"([^\"]*)\"$")
    public void buscarUsuario(String usuario) {

        OnStage.theActorInTheSpotlight()
                .attemptsTo(
                        BuscarUsuario.llamado(usuario)
                );
    }

    @Entonces("^se visualiza el usuario en los resultados$")
    public void validarUsuario() {

        System.out.println("Usuario encontrado correctamente");

    }
}