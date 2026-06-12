package co.com.automatizacionAlmasoft.stepsdefinitions;

import co.com.automatizacionAlmasoft.questions.ValidarTurnoCreado;
import co.com.automatizacionAlmasoft.tasks.AgregarTurno;
import cucumber.api.DataTable;
import cucumber.api.java.es.Entonces;
import cucumber.api.java.es.Y;

import java.util.List;
import java.util.Map;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static org.hamcrest.CoreMatchers.is;

public class TurnosStepDefinitions {
    private String ultimaMascotaTurno;
    private String ultimoVeterinarioTurno;

    @Y("^se agrega un nuevo turno con los datos$")
    public void agregarNuevoTurno(DataTable dataTable) {
        List<Map<String, String>> datos = dataTable.asMaps(String.class, String.class);

        String fecha = datos.get(0).get("fecha");
        String hora = datos.get(0).get("hora");
        String mascota = datos.get(0).get("mascota");
        String veterinario = datos.get(0).get("veterinario");
        String motivo = datos.get(0).get("motivo");
        String estado = datos.get(0).get("estado");

        ultimaMascotaTurno = mascota;
        ultimoVeterinarioTurno = veterinario;
        theActorInTheSpotlight().attemptsTo(
                AgregarTurno.conDatos(fecha, hora, mascota, veterinario, motivo, estado)
        );
    }

    @Entonces("^se valida que el turno fue creado correctamente$")
    public void validarTurnoCreado() {
        seeThat(ValidarTurnoCreado.conDatos(ultimaMascotaTurno, ultimoVeterinarioTurno), is(true));
    }
}
