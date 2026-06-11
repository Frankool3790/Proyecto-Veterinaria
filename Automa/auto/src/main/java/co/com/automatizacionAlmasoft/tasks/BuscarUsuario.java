package co.com.automatizacionAlmasoft.tasks;

import co.com.automatizacionAlmasoft.userinterfaces.AdminPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class BuscarUsuario implements Task {

    private final String usuario;

    public BuscarUsuario(String usuario) {
        this.usuario = usuario;
    }

    public static BuscarUsuario llamado(String usuario) {
        return instrumented(BuscarUsuario.class, usuario);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {

        actor.attemptsTo(
                Click.on(AdminPage.MENU_ADMIN),
                Enter.theValue(usuario).into(AdminPage.USERNAME_FIELD),
                Click.on(AdminPage.SEARCH_BUTTON)
        );
    }
}