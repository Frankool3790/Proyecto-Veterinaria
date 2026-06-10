package co.com.veterinaria.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class DashboardPage {

    public static final Target WELCOME_MESSAGE =
            Target.the("mensaje de bienvenida")
                    .located(By.cssSelector("h1.page-title"));

    public static final Target MENU_VETERINARIOS =
            Target.the("menú veterinarios")
                    .located(By.xpath("//span[text()='Veterinarios']"));

    public static final Target MENU_CLIENTES =
            Target.the("menú clientes")
                    .located(By.xpath("//span[text()='Dueños']"));

    public static final Target MENU_MASCOTAS =
            Target.the("menú mascotas")
                    .located(By.xpath("//span[text()='Mascotas']"));
}
