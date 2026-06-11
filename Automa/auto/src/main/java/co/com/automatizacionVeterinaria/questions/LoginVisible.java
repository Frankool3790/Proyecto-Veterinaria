package co.com.automatizacionVeterinaria.questions;

import co.com.automatizacionVeterinaria.userinterfaces.LoginPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;

public class LoginVisible implements Question<Boolean> {

    @Override
    public Boolean answeredBy(Actor actor) {
        return LoginPage.INPUT_USUARIO.resolveFor(actor).isVisible();
    }

    public static LoginVisible nuevamente(){
        return new LoginVisible();
    }
}