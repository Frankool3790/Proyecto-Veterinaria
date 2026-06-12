package co.com.automatizacionAlmasoft.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class ValidarTurnoCreado implements Question<Boolean> {

    private final String mascotaTurno;
    private final String veterinarioTurno;

    public ValidarTurnoCreado(String mascotaTurno, String veterinarioTurno) {
        this.mascotaTurno = mascotaTurno;
        this.veterinarioTurno = veterinarioTurno;
    }

    public static ValidarTurnoCreado conDatos(String mascotaTurno, String veterinarioTurno) {
        return new ValidarTurnoCreado(mascotaTurno, veterinarioTurno);
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        Target turnoEncontrado = Target.the("turno de " + mascotaTurno + " con " + veterinarioTurno)
                .located(By.xpath("//tr[td[contains(normalize-space(.), '" + mascotaTurno + "')] and td[contains(normalize-space(.), '" + veterinarioTurno + "')]]"));
        return turnoEncontrado.resolveFor(actor).isVisible();
    }
}
