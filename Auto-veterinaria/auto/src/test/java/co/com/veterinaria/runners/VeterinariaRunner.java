package co.com.veterinaria.runners;

import io.cucumber.junit.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/veterinaria",
        glue = "co.com.veterinaria.stepdefinitions"
)
public class VeterinariaRunner {
}
