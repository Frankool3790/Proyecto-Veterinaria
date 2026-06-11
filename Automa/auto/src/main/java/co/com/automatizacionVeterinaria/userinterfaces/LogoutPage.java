package co.com.automatizacionVeterinaria.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class LogoutPage {

    public static final Target BTN_CERRAR_SESION =
            Target.the("Botón cerrar sesión")
                    .located(By.className("logout-btn"));

}