package co.com.automatizacionVeterinaria.tasks;

import co.com.automatizacionVeterinaria.userinterfaces.SidebarPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;

import static net.serenitybdd.screenplay.Tasks.instrumented;

public class NavegarA implements Task {

    private final String pagina;

    public NavegarA(String pagina) {
        this.pagina = pagina;
    }

    public static NavegarA laPagina(String pagina) {
        return instrumented(NavegarA.class, pagina);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        switch (pagina.toLowerCase()) {
            case "clientes":
            case "dueños":
                actor.attemptsTo(Click.on(SidebarPage.LINK_CLIENTES));
                break;
            case "mascotas":
                actor.attemptsTo(Click.on(SidebarPage.LINK_MASCOTAS));
                break;
            case "turnos":
            case "citas":
                actor.attemptsTo(Click.on(SidebarPage.LINK_TURNOS));
                break;
            case "veterinarios":
                actor.attemptsTo(Click.on(SidebarPage.LINK_VETERINARIOS));
                break;
            case "historial":
                actor.attemptsTo(Click.on(SidebarPage.LINK_HISTORIAL));
                break;
            case "pagos":
                actor.attemptsTo(Click.on(SidebarPage.LINK_PAGOS));
                break;
            case "dashboard":
            default:
                actor.attemptsTo(Click.on(SidebarPage.LINK_DASHBOARD));
                break;
        }
    }
}
