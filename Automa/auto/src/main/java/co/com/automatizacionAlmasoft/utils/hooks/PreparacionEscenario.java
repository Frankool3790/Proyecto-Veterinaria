package co.com.automatizacionAlmasoft.utils.hooks;

import cucumber.api.java.After;
import cucumber.api.java.Before;
import net.serenitybdd.screenplay.actors.OnlineCast;

import static net.serenitybdd.screenplay.actors.OnStage.*;

public class PreparacionEscenario {

    @Before
    public void configurarEscenario() {
        // Inicializa el escenario de actores antes de cada prueba
        setTheStage(new OnlineCast());
        theActorCalled("usuario");
    }

    @After
    public void limpiarEscenario() {
        // Limpia los actores y cierra el telón después de cada prueba
        drawTheCurtain();
    }
}
