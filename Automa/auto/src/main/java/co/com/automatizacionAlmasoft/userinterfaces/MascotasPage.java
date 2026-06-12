package co.com.automatizacionAlmasoft.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class MascotasPage {

    public static final Target TITULO =
            Target.the("título de la página")
                    .located(By.className("page-title"));

    public static final Target BTN_AGREGAR =
            Target.the("botón agregar mascota")
                    .located(By.xpath("//button[contains(normalize-space(.), 'Agregar mascota') or contains(normalize-space(.), 'Agregar')]"));

    public static final Target INPUT_NOMBRE =
            Target.the("campo nombre de mascota")
                    .located(By.xpath("//label[contains(normalize-space(.), 'Nombre')]/following::input[1]"));

    public static final Target SELECT_TIPO =
            Target.the("selector tipo de mascota")
                    .located(By.xpath("//label[contains(normalize-space(.), 'Tipo')]/following::select[1]"));

    public static final Target INPUT_RAZA =
            Target.the("campo raza")
                    .located(By.xpath("//label[contains(normalize-space(.), 'Raza')]/following::input[1]"));

    public static final Target INPUT_EDAD =
            Target.the("campo edad")
                    .located(By.xpath("//label[contains(normalize-space(.), 'Edad')]/following::input[1]"));

    public static final Target SELECT_DUENO =
            Target.the("selector dueño")
                    .located(By.xpath("//label[contains(normalize-space(.), 'Dueño') or contains(normalize-space(.), 'Dueno')]/following::select[1]"));

    public static final Target BTN_GUARDAR =
            Target.the("botón guardar mascota")
                    .located(By.xpath("//button[contains(normalize-space(.), 'Guardar mascota') or contains(normalize-space(.), 'Guardar')]"));
}
