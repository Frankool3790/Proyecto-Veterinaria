package co.com.automatizacionVeterinaria.tasks;

import co.com.automatizacionVeterinaria.userinterfaces.PimPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class AgregarEmpleado implements Task {

    private final String nombre;
    private final String apellido;

    public AgregarEmpleado(String nombre, String apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
    }

    public static AgregarEmpleado conDatos(String nombre,String apellido){
        return instrumented(AgregarEmpleado.class,nombre,apellido);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {

        actor.attemptsTo(
                Click.on(PimPage.MENU_PIM),
                Click.on(PimPage.ADD_EMPLOYEE),

                Enter.theValue(nombre)
                        .into(PimPage.FIRST_NAME),

                Enter.theValue(apellido)
                        .into(PimPage.LAST_NAME),

                Click.on(PimPage.SAVE_BUTTON)
        );
    }
}