package co.com.automatizacionVeterinaria.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;

public class EmpleadoCreado implements Question<Boolean> {

    @Override
    public Boolean answeredBy(Actor actor) {
        return true;
    }

    public static EmpleadoCreado correctamente() {
        return new EmpleadoCreado();
    }
}