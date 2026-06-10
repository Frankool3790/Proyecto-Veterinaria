package co.com.veterinaria.runners;

import io.cucumber.junit.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/veterinaria/05_RegistroCliente.feature",
        glue = "co.com.veterinaria.stepdefinitions",
        plugin = {"pretty", "html:target/cucumber-reports/registro"}
)
public class RegistroClienteRunner {
}
