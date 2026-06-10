package co.com.veterinaria.tasks;

import co.com.veterinaria.userinterfaces.DashboardPage;
import co.com.veterinaria.userinterfaces.MascotasPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.actions.SelectFromOptions;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class AgregarMascota implements Task {
    private final String nombre;
    private final String especie;
    private final String raza;
    private final String edad;
    private final String cliente;

    public AgregarMascota(String nombre, String especie, String raza, String edad, String cliente) {
        this.nombre = nombre;
        this.especie = especie;
        this.raza = raza;
        this.edad = edad;
        this.cliente = cliente;
    }

    public static AgregarMascota conDatos(String nombre, String especie, String raza, String edad, String cliente) {
        return instrumented(AgregarMascota.class, nombre, especie, raza, edad, cliente);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(DashboardPage.MENU_MASCOTAS),
                Click.on(MascotasPage.ADD_MASCOTA_BUTTON),
                Enter.theValue(nombre).into(MascotasPage.NOMBRE_FIELD),
                SelectFromOptions.byVisibleText(especie).from(MascotasPage.ESPECIE_SELECT),
                Enter.theValue(raza).into(MascotasPage.RAZA_FIELD),
                Enter.theValue(edad).into(MascotasPage.EDAD_FIELD),
                SelectFromOptions.byVisibleText(cliente).from(MascotasPage.CLIENTE_SELECT),
                Click.on(MascotasPage.SAVE_BUTTON)
        );
    }
}
