package co.com.automatizacionAlmasoft.runners;

import cucumber.api.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/01_Usuarios/02_IniciarSesion.feature",
        glue = {
                "co.com.automatizacionAlmasoft.stepsdefinitions",
                "co.com.automatizacionAlmasoft.utils.hooks"
        },
        plugin = {
                "pretty",
                "html:target/cucumber-reports",
                "json:target/cucumber.json"
        },
        monochrome = true
)
public class LoginRunner {
}
