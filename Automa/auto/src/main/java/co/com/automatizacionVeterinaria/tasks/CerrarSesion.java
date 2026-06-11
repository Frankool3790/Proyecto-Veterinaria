package co.com.automatizacionVeterinaria.tasks;

import co.com.automatizacionVeterinaria.userinterfaces.LogoutPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class CerrarSesion implements Task {

    public static CerrarSesion correctamente(){
        return instrumented(CerrarSesion.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {

        actor.attemptsTo(
                Click.on(LogoutPage.BTN_CERRAR_SESION)
        );
    }
}