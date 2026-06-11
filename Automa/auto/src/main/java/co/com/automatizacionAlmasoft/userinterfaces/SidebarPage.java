package co.com.automatizacionAlmasoft.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class SidebarPage {

    public static final Target LINK_DASHBOARD =
            Target.the("link dashboard en sidebar")
                    .located(By.xpath("//nav//span[text()='Dashboard']"));

    public static final Target LINK_CLIENTES =
            Target.the("link dueños en sidebar")
                    .located(By.xpath("//nav//span[text()='Dueños']"));

    public static final Target LINK_MASCOTAS =
            Target.the("link mascotas en sidebar")
                    .located(By.xpath("//nav//span[text()='Mascotas']"));

    public static final Target LINK_TURNOS =
            Target.the("link turnos en sidebar")
                    .located(By.xpath("//nav//span[text()='Turnos']"));

    public static final Target LINK_VETERINARIOS =
            Target.the("link veterinarios en sidebar")
                    .located(By.xpath("//nav//span[text()='Veterinarios']"));

    public static final Target LINK_HISTORIAL =
            Target.the("link historial en sidebar")
                    .located(By.xpath("//nav//span[text()='Historial']"));

    public static final Target LINK_PAGOS =
            Target.the("link pagos en sidebar")
                    .located(By.xpath("//nav//span[text()='Pagos']"));
}
