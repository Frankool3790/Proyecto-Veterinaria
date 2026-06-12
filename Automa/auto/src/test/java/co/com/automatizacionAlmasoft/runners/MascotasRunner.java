package co.com.automatizacionAlmasoft.runners;

import io.cucumber.junit.CucumberOptions;
import io.cucumber.junit.CucumberOptions.SnippetType;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/04_Mascotas/01_VerMascotas.feature",
        glue = {
                "co.com.automatizacionAlmasoft.stepsdefinitions",
                "co.com.automatizacionAlmasoft.utils.hooks"
        },
        plugin = {
                "pretty",
                "html:target/cucumber-reports",
                "json:target/cucumber.json"
        },
        snippets = SnippetType.CAMELCASE,
        monochrome = true
)
public class MascotasRunner {
}
