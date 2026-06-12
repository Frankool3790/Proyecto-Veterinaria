package co.com.automatizacionAlmasoft.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;

public class EmpleadoEncontrado implements Question<Boolean> {

    @Override
    public Boolean answeredBy(Actor actor) {
        return true;
    }

    public static EmpleadoEncontrado enResultados() {
        return new EmpleadoEncontrado();
    }
}