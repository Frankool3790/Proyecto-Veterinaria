package co.com.automatizacionVeterinaria.runners;

import cucumber.api.CucumberOptions;
import cucumber.api.SnippetType;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/01_Usuarios/06_CerrarSesion.feature",
        glue = {
                "co.com.automatizacionVeterinaria.stepsdefinitions",
                "co.com.automatizacionVeterinaria.utils.hooks"
        },
        snippets = SnippetType.CAMELCASE
)
public class CerrarSesionRunner {
}
