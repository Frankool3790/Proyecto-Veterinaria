package co.com.veterinaria.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class MascotasPage {

    public static final Target ADD_MASCOTA_BUTTON =
            Target.the("botón agregar mascota")
                    .located(By.xpath("//button[contains(text(), 'Agregar mascota')]"));

    public static final Target NOMBRE_FIELD =
            Target.the("campo nombre")
                    .located(By.name("nombre"));

    public static final Target ESPECIE_SELECT =
            Target.the("campo especie")
                    .located(By.name("especie"));

    public static final Target RAZA_FIELD =
            Target.the("campo raza")
                    .located(By.name("raza"));

    public static final Target EDAD_FIELD =
            Target.the("campo edad")
                    .located(By.name("edad"));

    public static final Target CLIENTE_SELECT =
            Target.the("campo cliente")
                    .located(By.name("clienteId"));

    public static final Target SAVE_BUTTON =
            Target.the("botón guardar")
                    .located(By.xpath("//button[@type='submit']"));

    public static final Target MASCOTA_IN_LIST =
            Target.the("mascota en la lista")
                    .locatedBy("//td[contains(text(), '{0}')]");
}
