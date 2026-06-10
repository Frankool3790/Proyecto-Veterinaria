package co.com.veterinaria.userinterfaces;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import net.thucydides.core.annotations.DefaultUrl;
import org.openqa.selenium.By;

@DefaultUrl("http://localhost:5174/")
public class LandingPage extends PageObject {
    public static final Target BTN_LOGIN = Target.the("botón Iniciar Sesión")
            .located(By.xpath("//button[contains(@class, 'btn-login') or contains(text(), 'Iniciar Sesión')]"));

    public static final Target BTN_REGISTER = Target.the("botón Registrarse")
            .located(By.xpath("//button[contains(@class, 'btn-register') or contains(text(), 'Registrarse')]"));
}
