package co.com.automatizacionAlmasoft.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class ClientesPage {

    public static final Target TITULO =
            Target.the("título de la página")
                    .located(By.className("page-title"));

    public static final Target BTN_AGREGAR =
            Target.the("botón agregar dueño")
                    .located(By.xpath("//button[contains(text(), 'Agregar dueño')]"));

    public static final Target INPUT_NOMBRE =
            Target.the("campo nombre completo")
                    .located(By.name("nombre"));

    public static final Target INPUT_TELEFONO =
            Target.the("campo teléfono")
                    .located(By.name("telefono"));

    public static final Target INPUT_EMAIL =
            Target.the("campo email")
                    .located(By.name("email"));

    public static final Target INPUT_DIRECCION =
            Target.the("campo dirección")
                    .located(By.name("direccion"));

    public static final Target BTN_GUARDAR =
            Target.the("botón guardar dueño")
                    .located(By.xpath("//button[contains(text(), 'Guardar dueño')]"));
}
