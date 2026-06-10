package co.com.veterinaria.questions;

import co.com.veterinaria.userinterfaces.DashboardPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Visibility;

public class ValidacionDashboard implements Question<Boolean> {

    public static ValidacionDashboard validacion() {
        return new ValidacionDashboard();
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        return Visibility.of(DashboardPage.WELCOME_MESSAGE).viewedBy(actor).asBoolean();
    }
}
