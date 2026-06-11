package co.com.automatizacionVeterinaria.tasks;

import co.com.automatizacionVeterinaria.userinterfaces.PimPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class BuscarEmpleado implements Task {

    private final String empleado;

    public BuscarEmpleado(String empleado) {
        this.empleado = empleado;
    }

    public static BuscarEmpleado porNombre(String empleado){
        return instrumented(BuscarEmpleado.class,empleado);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {

        actor.attemptsTo(
                Click.on(PimPage.MENU_PIM),
                Click.on(PimPage.EMPLOYEE_LIST),

                Enter.theValue(empleado)
                        .into(PimPage.EMPLOYEE_SEARCH),

                Click.on(PimPage.SAVE_BUTTON)
        );
    }
}