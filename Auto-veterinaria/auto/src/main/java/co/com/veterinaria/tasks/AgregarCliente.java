package co.com.veterinaria.tasks;

import co.com.veterinaria.userinterfaces.ClientesPage;
import co.com.veterinaria.userinterfaces.DashboardPage;
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
                Click.on(DashboardPage.MENU_CLIENTES),
                Click.on(ClientesPage.ADD_CLIENTE_BUTTON),
                Enter.theValue(nombre).into(ClientesPage.NOMBRE_FIELD),
                Enter.theValue(telefono).into(ClientesPage.TELEFONO_FIELD),
                Enter.theValue(email).into(ClientesPage.EMAIL_FIELD),
                Enter.theValue(direccion).into(ClientesPage.DIRECCION_FIELD),
                Click.on(ClientesPage.SAVE_BUTTON)
        );
    }
}
