package co.com.automatizacionAlmasoft.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class LoginPage {

    public static final Target INPUT_USUARIO =
            Target.the("Campo de usuario/email")
                    .located(By.xpath("//div[contains(@class, 'form-group-new')][1]//input"));

    public static final Target INPUT_PASSWORD =
            Target.the("Campo de contraseña")
                    .located(By.xpath("//div[contains(@class, 'form-group-new')][2]//input"));

    public static final Target BTN_INICIAR_SESION =
            Target.the("Botón de iniciar sesión")
                    .located(By.xpath("//button[@type='submit']"));
}
