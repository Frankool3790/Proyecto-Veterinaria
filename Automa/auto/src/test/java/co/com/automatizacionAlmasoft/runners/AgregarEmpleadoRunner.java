package co.com.automatizacionAlmasoft.runners;

import cucumber.api.CucumberOptions;
import cucumber.api.SnippetType;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/01_Usuarios/04_AgregarEmpleado.feature",
        glue = {
                "co.com.automatizacionAlmasoft.stepsdefinitions"
        },
        snippets = SnippetType.CAMELCASE
)
public class AgregarEmpleadoRunner {
}