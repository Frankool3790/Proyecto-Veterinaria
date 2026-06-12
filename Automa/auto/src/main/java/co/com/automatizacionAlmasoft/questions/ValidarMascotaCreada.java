package co.com.automatizacionAlmasoft.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class ValidarMascotaCreada implements Question<Boolean> {

    private final String nombreMascota;

    public ValidarMascotaCreada(String nombreMascota) {
        this.nombreMascota = nombreMascota;
    }

    public static ValidarMascotaCreada conNombre(String nombreMascota) {
        return new ValidarMascotaCreada(nombreMascota);
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        Target mascotaEncontrada = Target.the("mascota con nombre " + nombreMascota)
                .located(By.xpath("//td[contains(normalize-space(.), '" + nombreMascota + "')]"));
        return mascotaEncontrada.resolveFor(actor).isVisible();
    }
}
