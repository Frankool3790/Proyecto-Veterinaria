package co.com.veterinaria.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class LoginPage {

    public static final Target USERNAME_FIELD =
            Target.the("campo de usuario")
                    .located(By.cssSelector("input[type='text']"));

    public static final Target PASSWORD_FIELD =
            Target.the("campo de contraseña")
                    .located(By.cssSelector("input[type='password']"));

    public static final Target LOGIN_BUTTON =
            Target.the("botón de login")
                    .located(By.cssSelector("button[type='submit']"));
}
