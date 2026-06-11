package co.com.automatizacionVeterinaria.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class HistorialPage {

    public static final Target TITULO =
            Target.the("título de la página")
                    .located(By.className("page-title"));
}
