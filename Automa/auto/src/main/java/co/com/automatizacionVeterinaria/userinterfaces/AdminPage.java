package co.com.automatizacionVeterinaria.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class AdminPage {

    public static final Target MENU_ADMIN =
            Target.the("menu admin")
                    .located(By.xpath("//span[text()='Admin']"));

    public static final Target USERNAME_FIELD =
            Target.the("campo username")
                    .located(By.xpath("(//input[contains(@class,'oxd-input')])[2]"));

    public static final Target SEARCH_BUTTON =
            Target.the("boton buscar")
                    .located(By.xpath("//button[@type='submit']"));

    public static final Target RESULT_ADMIN =
            Target.the("resultado admin")
                    .located(By.xpath("//div[text()='Admin']"));
}