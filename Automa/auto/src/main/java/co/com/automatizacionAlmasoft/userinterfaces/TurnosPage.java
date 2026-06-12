package co.com.automatizacionAlmasoft.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class TurnosPage {

    public static final Target TITULO =
            Target.the("título de la página")
                    .located(By.className("page-title"));

    public static final Target BTN_AGREGAR =
            Target.the("botón crear turno")
                    .located(By.xpath("//button[contains(normalize-space(.), 'Crear turno') or contains(normalize-space(.), 'Nuevo turno')]"));

    public static final Target INPUT_FECHA =
            Target.the("campo fecha")
                    .located(By.xpath("//label[contains(normalize-space(.), 'Fecha')]/following::input[1]"));

    public static final Target INPUT_HORA =
            Target.the("campo hora")
                    .located(By.xpath("//label[contains(normalize-space(.), 'Hora')]/following::input[1]"));

    public static final Target SELECT_MASCOTA =
            Target.the("selector mascota")
                    .located(By.xpath("//label[contains(normalize-space(.), 'Mascota')]/following::select[1]"));

    public static final Target SELECT_VETERINARIO =
            Target.the("selector veterinario")
                    .located(By.xpath("//label[contains(normalize-space(.), 'Veterinario')]/following::select[1]"));

    public static final Target INPUT_MOTIVO =
            Target.the("campo motivo")
                    .located(By.xpath("//label[contains(normalize-space(.), 'Motivo')]/following::textarea[1]"));

    public static final Target SELECT_ESTADO =
            Target.the("selector estado")
                    .located(By.xpath("//label[contains(normalize-space(.), 'Estado')]/following::select[1]"));

    public static final Target BTN_GUARDAR =
            Target.the("botón guardar turno")
                    .located(By.xpath("//button[contains(normalize-space(.), 'Guardar Turno') or contains(normalize-space(.), 'Actualizar Turno')]"));
}
