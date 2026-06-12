package co.com.automatizacionAlmasoft.runners;

import io.cucumber.junit.CucumberOptions;
import io.cucumber.junit.CucumberOptions.SnippetType;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/01_Usuarios/06_CerrarSesion.feature",
        glue = {
                "co.com.automatizacionAlmasoft.stepsdefinitions"
        },
        snippets = SnippetType.CAMELCASE
)
public class CerrarSesionRunner {
}