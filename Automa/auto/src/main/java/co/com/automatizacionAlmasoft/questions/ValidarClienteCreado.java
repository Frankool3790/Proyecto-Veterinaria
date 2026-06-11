package co.com.automatizacionAlmasoft.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class ValidarClienteCreado implements Question<Boolean> {

    private final String nombreCliente;

    public ValidarClienteCreado(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public static ValidarClienteCreado conNombre(String nombreCliente) {
        return new ValidarClienteCreado(nombreCliente);
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        Target clienteEncontrado = Target.the("cliente con nombre " + nombreCliente)
                .located(By.xpath("//td[contains(text(), '" + nombreCliente + "')]"));
        return clienteEncontrado.resolveFor(actor).isVisible();
    }
}
