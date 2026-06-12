package co.com.automatizacionAlmasoft.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class RegistrarPage {

    public static final Target BTN_ABRIR_REGISTRO =
            Target.the("Botón abrir registro")
                    .located(By.xpath("//button[contains(@class, 'btn-register') and text()='Registrarse']"));

    public static final Target INPUT_NOMBRE =
            Target.the("Input nombre")
                    .located(By.name("nombre"));

    public static final Target INPUT_APELLIDO =
            Target.the("Input apellido")
                    .located(By.name("apellido"));

    public static final Target INPUT_EMAIL =
            Target.the("Input email")
                    .located(By.name("email"));

    public static final Target INPUT_PASSWORD =
            Target.the("Input contraseña")
                    .located(By.name("password"));

    public static final Target BTN_REGISTRAR =
            Target.the("Botón registrar")
                    .located(By.xpath("//form[contains(@class, 'register-form')]//button[contains(text(), 'Registrarse')]"));
}
