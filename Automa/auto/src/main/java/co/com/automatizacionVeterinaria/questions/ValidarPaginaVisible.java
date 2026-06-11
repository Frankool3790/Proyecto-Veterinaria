package co.com.automatizacionVeterinaria.questions;

import co.com.automatizacionVeterinaria.userinterfaces.*;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.targets.Target;

public class ValidarPaginaVisible implements Question<Boolean> {

    private final String pagina;

    public ValidarPaginaVisible(String pagina) {
        this.pagina = pagina;
    }

    public static ValidarPaginaVisible deLaPagina(String pagina) {
        return new ValidarPaginaVisible(pagina);
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        Target titulo;
        switch (pagina.toLowerCase()) {
            case "clientes":
            case "dueños":
                titulo = ClientesPage.TITULO;
                break;
            case "mascotas":
                titulo = MascotasPage.TITULO;
                break;
            case "turnos":
            case "citas":
                titulo = TurnosPage.TITULO;
                break;
            case "veterinarios":
                titulo = VeterinariosPage.TITULO;
                break;
            case "historial":
                titulo = HistorialPage.TITULO;
                break;
            case "pagos":
                titulo = PagosPage.TITULO;
                break;
            case "dashboard":
            default:
                titulo = DashboardPage.WELCOME_TITLE;
                break;
        }
        return titulo.resolveFor(actor).isVisible();
    }
}
