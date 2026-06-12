package co.com.automatizacionAlmasoft.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class LogoutPage {

    public static final Target BTN_CERRAR_SESION =
            Target.the("Botón cerrar sesión")
                    .located(By.xpath("//button[contains(normalize-space(.), 'Cerrar') or contains(normalize-space(.), 'Logout')]"));

}