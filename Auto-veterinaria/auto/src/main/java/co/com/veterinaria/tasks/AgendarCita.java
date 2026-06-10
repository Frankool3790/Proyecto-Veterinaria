package co.com.veterinaria.tasks;

import co.com.veterinaria.userinterfaces.DashboardPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.actions.SelectFromOptions;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class AgendarCita implements Task {
    private final String mascota;
    private final String veterinario;
    private final String fecha;
    private final String hora;
    private final String motivo;

    public static final Target MENU_CITAS = Target.the("menú citas").located(By.xpath("//span[text()='Turnos']"));
    public static final Target ADD_CITA_BUTTON = Target.the("botón agregar cita").located(By.xpath("//button[contains(text(), 'Agregar turno')]"));
    public static final Target MASCOTA_SELECT = Target.the("campo mascota").located(By.name("mascotaId"));
    public static final Target VETERINARIO_SELECT = Target.the("campo veterinario").located(By.name("veterinarioId"));
    public static final Target FECHA_FIELD = Target.the("campo fecha").located(By.name("fecha"));
    public static final Target HORA_FIELD = Target.the("campo hora").located(By.name("hora"));
    public static final Target MOTIVO_FIELD = Target.the("campo motivo").located(By.name("motivo"));
    public static final Target SAVE_BUTTON = Target.the("botón guardar").located(By.xpath("//button[@type='submit']"));

    public AgendarCita(String mascota, String veterinario, String fecha, String hora, String motivo) {
        this.mascota = mascota;
        this.veterinario = veterinario;
        this.fecha = fecha;
        this.hora = hora;
        this.motivo = motivo;
    }

    public static AgendarCita conDetalles(String mascota, String veterinario, String fecha, String hora, String motivo) {
        return instrumented(AgendarCita.class, mascota, veterinario, fecha, hora, motivo);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(MENU_CITAS),
                Click.on(ADD_CITA_BUTTON),
                SelectFromOptions.byVisibleText(mascota).from(MASCOTA_SELECT),
                SelectFromOptions.byVisibleText(veterinario).from(VETERINARIO_SELECT),
                Enter.theValue(fecha).into(FECHA_FIELD),
                Enter.theValue(hora).into(HORA_FIELD),
                Enter.theValue(motivo).into(MOTIVO_FIELD),
                Click.on(SAVE_BUTTON)
        );
    }
}
