package co.com.veterinaria.runners;

import io.cucumber.junit.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/veterinaria/07_GestionMascotas.feature",
        glue = "co.com.veterinaria.stepdefinitions",
        plugin = {"pretty", "html:target/cucumber-reports/gestion-mascotas"},
        snippets = SnippetType.CAMELCASE
)
public class GestionMascotasRunner {
}
