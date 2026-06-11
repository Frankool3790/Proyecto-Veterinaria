package co.com.automatizacionVeterinaria.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class ValidarDashboard implements Question<Boolean> {

    private static final Target WELCOME_TITLE = Target.the("título de bienvenida del dashboard")
            .located(By.className("page-title"));

    @Override
    public Boolean answeredBy(Actor actor) {
        return WELCOME_TITLE.resolveFor(actor).isVisible();
    }

    public static ValidarDashboard estaVisible() {
        return new ValidarDashboard();
    }
}
