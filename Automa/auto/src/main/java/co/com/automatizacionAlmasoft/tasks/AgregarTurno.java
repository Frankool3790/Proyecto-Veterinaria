package co.com.automatizacionAlmasoft.tasks;

import co.com.automatizacionAlmasoft.userinterfaces.TurnosPage;
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

public class AgregarTurno implements Task {
    private final String fecha;
    private final String hora;
    private final String mascota;
    private final String veterinario;
    private final String motivo;
    private final String estado;

    public AgregarTurno(String fecha, String hora, String mascota, String veterinario, String motivo, String estado) {
        this.fecha = fecha;
        this.hora = hora;
        this.mascota = mascota;
        this.veterinario = veterinario;
        this.motivo = motivo;
        this.estado = estado;
    }

    public static AgregarTurno conDatos(String fecha, String hora, String mascota, String veterinario, String motivo, String estado) {
        return instrumented(AgregarTurno.class, fecha, hora, mascota, veterinario, motivo, estado);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                WaitUntil.the(TurnosPage.BTN_AGREGAR, isClickable()).forNoMoreThan(10).seconds(),
                Click.on(TurnosPage.BTN_AGREGAR),
                WaitUntil.the(TurnosPage.INPUT_FECHA, isVisible()).forNoMoreThan(10).seconds(),
                Enter.theValue(fecha).into(TurnosPage.INPUT_FECHA),
                Enter.theValue(hora).into(TurnosPage.INPUT_HORA),
                WaitUntil.the(TurnosPage.SELECT_MASCOTA, isVisible()).forNoMoreThan(10).seconds()
        );

        seleccionarOpcion(actor, TurnosPage.SELECT_MASCOTA, mascota, "selecciona una mascota");
        seleccionarOpcion(actor, TurnosPage.SELECT_VETERINARIO, veterinario, "selecciona un veterinario");

        actor.attemptsTo(
                Enter.theValue(motivo).into(TurnosPage.INPUT_MOTIVO),
                SelectFromOptions.byVisibleText(estado).from(TurnosPage.SELECT_ESTADO),
                WaitUntil.the(TurnosPage.BTN_GUARDAR, isClickable()).forNoMoreThan(10).seconds(),
                Click.on(TurnosPage.BTN_GUARDAR)
        );
    }

    private <T extends Actor> void seleccionarOpcion(T actor, net.serenitybdd.screenplay.targets.Target target, String valorDeseado, String placeholder) {
        Select select = new Select(target.resolveFor(actor));
        List<WebElement> opciones = esperarOpciones(select);

        for (WebElement opcion : opciones) {
            String texto = opcion.getText().trim();
            if (texto.equalsIgnoreCase(valorDeseado.trim())) {
                select.selectByVisibleText(texto);
                return;
            }
        }

        for (WebElement opcion : opciones) {
            String texto = opcion.getText().trim();
            if (!texto.isEmpty() && !texto.toLowerCase().contains(placeholder.toLowerCase())) {
                select.selectByVisibleText(texto);
                return;
            }
        }
    }

    private List<WebElement> esperarOpciones(Select select) {
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
            throw new IllegalStateException("La espera para cargar opciones del turno fue interrumpida", e);
        }
    }
}
