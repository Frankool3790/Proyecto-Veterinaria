package co.com.automatizacionAlmasoft.questions;

import co.com.automatizacionAlmasoft.userinterfaces.LoginPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.waits.WaitUntil;

import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class LoginVisible implements Question<Boolean> {

    @Override
    public Boolean answeredBy(Actor actor) {
        actor.attemptsTo(WaitUntil.the(LoginPage.INPUT_USUARIO, isVisible()).forNoMoreThan(10).seconds());
        return LoginPage.INPUT_USUARIO.resolveFor(actor).isVisible();
    }

    public static LoginVisible nuevamente(){
        return new LoginVisible();
    }
}