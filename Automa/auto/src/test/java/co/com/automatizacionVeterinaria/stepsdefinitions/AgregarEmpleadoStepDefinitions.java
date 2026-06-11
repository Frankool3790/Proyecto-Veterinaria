package co.com.automatizacionVeterinaria.stepsdefinitions;

import co.com.automatizacionVeterinaria.tasks.AgregarEmpleado;
import cucumber.api.DataTable;
import cucumber.api.java.es.Cuando;
import cucumber.api.java.es.Entonces;
import net.serenitybdd.screenplay.actors.OnStage;

import java.util.List;
import java.util.Map;

public class AgregarEmpleadoStepDefinitions {

    @Cuando("agrega un empleado")
    public void agregarEmpleado(DataTable dataTable) {

        List<Map<String, String>> datos =
                dataTable.asMaps(String.class, String.class);

        String nombre = datos.get(0).get("nombre");
        String apellido = datos.get(0).get("apellido");

        OnStage.theActorInTheSpotlight()
                .attemptsTo(
                        AgregarEmpleado.conDatos(nombre, apellido)
                );
    }

    @Entonces("el empleado es creado correctamente")
    public void validarEmpleado() {

        System.out.println("Empleado creado correctamente");

    }
}