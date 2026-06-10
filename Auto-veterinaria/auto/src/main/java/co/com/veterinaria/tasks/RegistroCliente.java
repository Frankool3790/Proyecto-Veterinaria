package co.com.veterinaria.tasks;

import co.com.veterinaria.userinterfaces.LoginPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;
import static net.serenitybdd.screenplay.Tasks.instrumented;

public class RegistroCliente implements Task {
    private final String nombre;
    private final String apellido;
    private final String email;
    private final String password;

    // Localizadores temporales para el registro (asumiendo que están en un modal o página aparte)
    public static final Target NOMBRE_FIELD = Target.the("campo nombre").located(By.name("nombre"));
    public static final Target APELLIDO_FIELD = Target.the("campo apellido").located(By.name("apellido"));
    public static final Target EMAIL_FIELD = Target.the("campo email").located(By.name("email"));
    public static final Target PASSWORD_FIELD = Target.the("campo password").located(By.name("password"));
    public static final Target SUBMIT_BUTTON = Target.the("botón registrarse").located(By.xpath("//form[contains(@class, 'register-form')]//button[@type='submit']"));

    public RegistroCliente(String nombre, String apellido, String email, String password) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
    }

    public static RegistroCliente conDatos(String nombre, String apellido, String email, String password) {
        return instrumented(RegistroCliente.class, nombre, apellido, email, password);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Enter.theValue(nombre).into(NOMBRE_FIELD),
                Enter.theValue(apellido).into(APELLIDO_FIELD),
                Enter.theValue(email).into(EMAIL_FIELD),
                Enter.theValue(password).into(PASSWORD_FIELD),
                Click.on(SUBMIT_BUTTON)
        );
    }
}
