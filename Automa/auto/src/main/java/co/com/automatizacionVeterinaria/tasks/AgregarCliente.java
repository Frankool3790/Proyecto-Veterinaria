package co.com.automatizacionVeterinaria.tasks;

import co.com.automatizacionVeterinaria.userinterfaces.ClientesPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class AgregarCliente implements Task {
    private final String nombre;
    private final String telefono;
    private final String email;
    private final String direccion;

    public AgregarCliente(String nombre, String telefono, String email, String direccion) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
    }

    public static AgregarCliente conDatos(String nombre, String telefono, String email, String direccion) {
        return instrumented(AgregarCliente.class, nombre, telefono, email, direccion);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(ClientesPage.BTN_AGREGAR),
                Enter.theValue(nombre).into(ClientesPage.INPUT_NOMBRE),
                Enter.theValue(telefono).into(ClientesPage.INPUT_TELEFONO),
                Enter.theValue(email).into(ClientesPage.INPUT_EMAIL),
                Enter.theValue(direccion).into(ClientesPage.INPUT_DIRECCION),
                Click.on(ClientesPage.BTN_GUARDAR)
        );
    }
}
