package co.com.automatizacionAlmasoft.stepsdefinitions;

import co.com.automatizacionAlmasoft.questions.ValidarClienteCreado;
import co.com.automatizacionAlmasoft.tasks.AgregarCliente;
import cucumber.api.DataTable;
import cucumber.api.java.es.Y;
import cucumber.api.java.es.Entonces;

import java.util.List;
import java.util.Map;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static org.hamcrest.CoreMatchers.is;

public class ClientesStepDefinitions {
    private String ultimoNombreCliente;

    @Y("^se agrega un nuevo cliente con los datos$")
    public void agregarNuevoCliente(DataTable dataTable) {
        List<Map<String, String>> datos = dataTable.asMaps(String.class, String.class);
        String nombre = datos.get(0).get("nombre");
        String telefono = datos.get(0).get("telefono");
        String email = datos.get(0).get("email");
        String direccion = datos.get(0).get("direccion");

        ultimoNombreCliente = nombre;
        theActorInTheSpotlight().attemptsTo(AgregarCliente.conDatos(nombre, telefono, email, direccion));
    }

    @Entonces("^se valida que el cliente fue creado correctamente$")
    public void validarClienteCreado() {
        seeThat(ValidarClienteCreado.conNombre(ultimoNombreCliente), is(true));
    }
}
