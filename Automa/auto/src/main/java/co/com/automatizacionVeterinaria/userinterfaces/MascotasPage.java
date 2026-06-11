package co.com.automatizacionVeterinaria.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class MascotasPage {

    public static final Target TITULO =
            Target.the("título de la página")
                    .located(By.className("page-title"));

    public static final Target BTN_AGREGAR =
            Target.the("botón agregar mascota")
                    .located(By.xpath("//button[contains(text(), 'Agregar')]"));
}
