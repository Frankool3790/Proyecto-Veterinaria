package co.com.automatizacionVeterinaria.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class DashboardPage {

    public static final Target WELCOME_TITLE =
            Target.the("título de bienvenida")
                    .located(By.className("page-title"));

    public static final Target STATS_CARDS =
            Target.the("tarjetas de estadísticas")
                    .located(By.className("stat-card"));
}
