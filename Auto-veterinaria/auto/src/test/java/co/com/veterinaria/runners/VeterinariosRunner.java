package co.com.veterinaria.runners;

import cucumber.api.CucumberOptions;
import cucumber.api.SnippetType;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/veterinaria/02_Veterinarios.feature",
        glue = "co.com.veterinaria.stepdefinitions",
        plugin = {"pretty", "html:target/cucumber-reports/veterinarios"}
)
public class VeterinariosRunner {
}
