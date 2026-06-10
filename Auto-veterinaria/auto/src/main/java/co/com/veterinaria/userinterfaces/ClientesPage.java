package co.com.veterinaria.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class ClientesPage {

    public static final Target ADD_CLIENTE_BUTTON =
            Target.the("botón agregar cliente")
                    .located(By.xpath("//button[contains(text(), 'Agregar dueño')]"));

    public static final Target NOMBRE_FIELD =
            Target.the("campo nombre")
                    .located(By.name("nombre"));

    public static final Target TELEFONO_FIELD =
            Target.the("campo teléfono")
                    .located(By.name("telefono"));

    public static final Target EMAIL_FIELD =
            Target.the("campo email")
                    .located(By.name("email"));

    public static final Target DIRECCION_FIELD =
            Target.the("campo dirección")
                    .located(By.name("direccion"));

    public static final Target SAVE_BUTTON =
            Target.the("botón guardar")
                    .located(By.xpath("//button[@type='submit']"));

    public static final Target CLIENTE_IN_LIST =
            Target.the("cliente en la lista")
                    .locatedBy("//td[contains(text(), '{0}')]");
}
