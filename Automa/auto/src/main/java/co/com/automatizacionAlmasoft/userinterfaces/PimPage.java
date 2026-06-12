package co.com.automatizacionAlmasoft.userinterfaces;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class PimPage {

    public static final Target MENU_PIM =
            Target.the("menu pim")
                    .located(By.xpath("//span[text()='PIM']"));

    public static final Target ADD_EMPLOYEE =
            Target.the("add employee")
                    .located(By.xpath("//a[text()='Add Employee']"));

    public static final Target EMPLOYEE_LIST =
            Target.the("employee list")
                    .located(By.xpath("//a[text()='Employee List']"));

    public static final Target FIRST_NAME =
            Target.the("nombre")
                    .located(By.name("firstName"));

    public static final Target LAST_NAME =
            Target.the("apellido")
                    .located(By.name("lastName"));

    public static final Target SAVE_BUTTON =
            Target.the("guardar")
                    .located(By.xpath("//button[@type='submit']"));

    public static final Target EMPLOYEE_SEARCH =
            Target.the("buscar empleado")
                    .located(By.xpath("(//input[@placeholder='Type for hints...'])[1]"));

}