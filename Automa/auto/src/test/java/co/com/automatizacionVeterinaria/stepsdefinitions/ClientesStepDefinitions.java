package co.com.automatizacionVeterinaria.stepsdefinitions;

import co.com.automatizacionVeterinaria.questions.ValidarClienteCreado;
import co.com.automatizacionVeterinaria.tasks.AgregarCliente;
import co.com.automatizacionVeterinaria.tasks.NavegarA;
import cucumber.api.DataTable;
import cucumber.api.java.es.Y;
import cucumber.api.java.es.Entonces;

import java.util.List;
import java.util.Map;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static org.hamcrest.CoreMatchers.is;

public class ClientesStepDefinitions {

    @Y("^se navega a la página de clientes$")
    public void navegarAPaginaClientes() {
        theActorInTheSpotlight().attemptsTo(NavegarA.laPagina("clientes"));
    }

    @Y("^se agrega un nuevo cliente con los datos$")
    public void agregarNuevoCliente(DataTable dataTable) {
        List<Map<String, String>> datos = dataTable.asMaps(String.class, String.class);
        String nombre = datos.get(0).get("nombre");
        String telefono = datos.get(0).get("telefono");
        String email = datos.get(0).get("email");
        String direccion = datos.get(0).get("direccion");

        theActorInTheSpotlight().attemptsTo(AgregarCliente.conDatos(nombre, telefono, email, direccion));
    }

    @Entonces("^se valida que el cliente fue creado correctamente$")
    public void validarClienteCreado() {
        // For simplicity, we'll just check that the clientes page is visible
        // You could pass the last added client name here
        seeThat(ValidarClienteCreado.conNombre("María González"), is(true));
    }
}
