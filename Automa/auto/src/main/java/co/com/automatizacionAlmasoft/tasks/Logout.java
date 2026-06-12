package co.com.automatizacionAlmasoft.tasks;

import co.com.automatizacionAlmasoft.userinterfaces.LogoutPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class Logout implements Task {

    public static Logout delSistema(){
        return instrumented(Logout.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {

        actor.attemptsTo(
                Click.on(LogoutPage.BTN_CERRAR_SESION)
        );
    }
}