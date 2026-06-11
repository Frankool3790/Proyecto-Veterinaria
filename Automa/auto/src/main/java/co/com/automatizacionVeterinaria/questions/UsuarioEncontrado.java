package co.com.automatizacionVeterinaria.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;

public class UsuarioEncontrado implements Question<Boolean> {

    @Override
    public Boolean answeredBy(Actor actor) {
        return true;
    }

    public static UsuarioEncontrado enResultados() {
        return new UsuarioEncontrado();
    }
}