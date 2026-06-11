package co.com.automatizacionVeterinaria.questions;

import co.com.automatizacionVeterinaria.userinterfaces.LoginPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;

public class ValidarRegistroExitoso implements Question<Boolean> {

    public static ValidarRegistroExitoso seRedirigeALogin() {
        return new ValidarRegistroExitoso();
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        return LoginPage.INPUT_USUARIO.resolveFor(actor).isVisible();
    }
}
