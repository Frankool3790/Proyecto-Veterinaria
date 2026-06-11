package co.com.automatizacionVeterinaria.stepsdefinitions;

import co.com.automatizacionVeterinaria.tasks.BuscarEmpleado;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;
import net.serenitybdd.screenplay.actors.OnStage;

public class BuscarEmpleadoStepDefinitions {

    @Cuando("^busca el empleado \"([^\"]*)\"$")
    public void buscarEmpleado(String empleado) {

        OnStage.theActorInTheSpotlight()
                .attemptsTo(
                        BuscarEmpleado.porNombre(empleado)
                );
    }

    @Entonces("el empleado aparece en la lista")
    public void validarEmpleado() {

        System.out.println("Empleado encontrado");

    }
}