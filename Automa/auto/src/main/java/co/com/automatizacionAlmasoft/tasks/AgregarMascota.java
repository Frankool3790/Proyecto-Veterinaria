package co.com.automatizacionAlmasoft.tasks;

import co.com.automatizacionAlmasoft.userinterfaces.MascotasPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.actions.SelectFromOptions;
import net.serenitybdd.screenplay.waits.WaitUntil;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

import java.util.List;

import static net.serenitybdd.screenplay.Tasks.instrumented;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isClickable;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class AgregarMascota implements Task {
    private final String nombre;
    private final String especie;
    private final String raza;
    private final String edad;
    private final String propietario;

    public AgregarMascota(String nombre, String especie, String raza, String edad, String propietario) {
        this.nombre = nombre;
        this.especie = especie;
        this.raza = raza;
        this.edad = edad;
        this.propietario = propietario;
    }

    public static AgregarMascota conDatos(String nombre, String especie, String raza, String edad, String propietario) {
        return instrumented(AgregarMascota.class, nombre, especie, raza, edad, propietario);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                WaitUntil.the(MascotasPage.BTN_AGREGAR, isClickable()).forNoMoreThan(10).seconds(),
                Click.on(MascotasPage.BTN_AGREGAR),
                WaitUntil.the(MascotasPage.INPUT_NOMBRE, isVisible()).forNoMoreThan(10).seconds(),
                Enter.theValue(nombre).into(MascotasPage.INPUT_NOMBRE),
                SelectFromOptions.byVisibleText(especie).from(MascotasPage.SELECT_TIPO),
                Enter.theValue(raza).into(MascotasPage.INPUT_RAZA),
                Enter.theValue(edad).into(MascotasPage.INPUT_EDAD),
                WaitUntil.the(MascotasPage.SELECT_DUENO, isVisible()).forNoMoreThan(10).seconds()
        );

        seleccionarDueno(actor);
        actor.attemptsTo(
                WaitUntil.the(MascotasPage.BTN_GUARDAR, isClickable()).forNoMoreThan(10).seconds(),
                Click.on(MascotasPage.BTN_GUARDAR)
        );
    }

    private <T extends Actor> void seleccionarDueno(T actor) {
        Select select = new Select(MascotasPage.SELECT_DUENO.resolveFor(actor));
        List<WebElement> opciones = esperarOpcionesDeDueno(select);

        for (WebElement opcion : opciones) {
            if (opcion.getText().trim().equalsIgnoreCase(propietario.trim())) {
                select.selectByVisibleText(opcion.getText().trim());
                return;
            }
        }

        for (WebElement opcion : opciones) {
            String texto = opcion.getText().trim();
            if (!texto.isEmpty() && !texto.toLowerCase().contains("selecciona")) {
                select.selectByVisibleText(texto);
                return;
            }
        }
    }

    private List<WebElement> esperarOpcionesDeDueno(Select select) {
        for (int i = 0; i < 10; i++) {
            List<WebElement> opciones = select.getOptions();
            if (opciones.size() > 1) {
                return opciones;
            }
            dormir(500);
        }
        return select.getOptions();
    }

    private void dormir(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("La espera para cargar los dueños fue interrumpida", e);
        }
    }
}
