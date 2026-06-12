package co.com.automatizacionAlmasoft.tasks;

import co.com.automatizacionAlmasoft.userinterfaces.RegistrarPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class RegistrarUsuario implements Task {
    private final String nombre;
    private final String apellido;
    private final String email;
    private final String password;

    public RegistrarUsuario(String nombre, String apellido, String email, String password) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
    }

    public static RegistrarUsuario conDatos(String nombre, String apellido, String email, String password) {
        return instrumented(RegistrarUsuario.class, nombre, apellido, email, password);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(RegistrarPage.BTN_ABRIR_REGISTRO),
                Enter.theValue(nombre).into(RegistrarPage.INPUT_NOMBRE),
                Enter.theValue(apellido).into(RegistrarPage.INPUT_APELLIDO),
                Enter.theValue(email).into(RegistrarPage.INPUT_EMAIL),
                Enter.theValue(password).into(RegistrarPage.INPUT_PASSWORD),
                Click.on(RegistrarPage.BTN_REGISTRAR)
        );
    }
}
