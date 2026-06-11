package co.com.automatizacionVeterinaria.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class LandingPage {

    public static final Target BTN_INICIAR_SESION_NAV =
            Target.the("Botón de Iniciar Sesión en la barra de navegación")
                    .located(By.className("btn-login"));

    public static final Target BTN_GESTIONAR_CLINICA =
            Target.the("Botón de Gestionar Clínica en la sección Hero")
                    .located(By.className("btn-primary-link"));
}
