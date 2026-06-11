package co.com.automatizacionVeterinaria.runners;

import cucumber.api.CucumberOptions;
import cucumber.api.SnippetType;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/02_Dashboard/01_VerDashboard.feature",
        glue = {
                "co.com.automatizacionVeterinaria.stepsdefinitions",
                "co.com.automatizacionVeterinaria.utils.hooks"
        },
        plugin = {
                "pretty",
                "html:target/cucumber-reports",
                "json:target/cucumber.json"
        },
        snippets = SnippetType.CAMELCASE,
        monochrome = true
)
public class DashboardRunner {
}
