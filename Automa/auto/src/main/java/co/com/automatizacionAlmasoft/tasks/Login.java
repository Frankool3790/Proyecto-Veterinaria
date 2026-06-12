package co.com.automatizacionAlmasoft.tasks;

import co.com.automatizacionAlmasoft.userinterfaces.LoginPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class Login implements Task {

    private final String usuario;
    private final String contrasena;

    public Login(String usuario, String contrasena) {
        this.usuario = usuario;
        this.contrasena = contrasena;
    }

    public static Login conCredenciales(String usuario, String contrasena) {
        return instrumented(Login.class, usuario, contrasena);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Enter.theValue(usuario).into(LoginPage.INPUT_USUARIO),
                Enter.theValue(contrasena).into(LoginPage.INPUT_PASSWORD),
                Click.on(LoginPage.BTN_INICIAR_SESION)
        );
    }
}
