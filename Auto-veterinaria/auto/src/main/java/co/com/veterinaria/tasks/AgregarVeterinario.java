package co.com.veterinaria.tasks;

import co.com.veterinaria.userinterfaces.DashboardPage;
import co.com.veterinaria.userinterfaces.VeterinariosPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class AgregarVeterinario implements Task {
    private final String nombre;
    private final String especialidad;
    private final String email;

    public AgregarVeterinario(String nombre, String especialidad, String email) {
        this.nombre = nombre;
        this.especialidad = especialidad;
        this.email = email;
    }

    public static AgregarVeterinario conDatos(String nombre, String especialidad, String email) {
        return instrumented(AgregarVeterinario.class, nombre, especialidad, email);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(DashboardPage.MENU_VETERINARIOS),
                Click.on(VeterinariosPage.ADD_VETERINARIO_BUTTON),
                Enter.theValue(nombre).into(VeterinariosPage.NOMBRE_FIELD),
                Enter.theValue(especialidad).into(VeterinariosPage.ESPECIALIDAD_FIELD),
                Enter.theValue(email).into(VeterinariosPage.EMAIL_FIELD),
                Click.on(VeterinariosPage.SAVE_BUTTON)
        );
    }
}
