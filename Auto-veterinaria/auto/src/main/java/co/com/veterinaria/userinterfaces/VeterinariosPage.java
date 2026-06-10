package co.com.veterinaria.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class VeterinariosPage {

    public static final Target ADD_VETERINARIO_BUTTON =
            Target.the("botón agregar veterinario")
                    .located(By.xpath("//button[contains(text(), 'Agregar veterinario')]"));

    public static final Target NOMBRE_FIELD =
            Target.the("campo nombre")
                    .located(By.name("nombre"));

    public static final Target ESPECIALIDAD_FIELD =
            Target.the("campo especialidad")
                    .located(By.name("especialidad"));

    public static final Target EMAIL_FIELD =
            Target.the("campo email")
                    .located(By.name("email"));

    public static final Target SAVE_BUTTON =
            Target.the("botón guardar")
                    .located(By.xpath("//button[@type='submit']"));

    public static final Target VETERINARIO_IN_LIST =
            Target.the("veterinario en la lista")
                    .locatedBy("//td[contains(text(), '{0}')]");
}
