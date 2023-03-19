
import "./Base_Datos"


const fauna = require('faunadb');
const client = new fauna.Client({ secret: 'YOUR_SECRET_KEY' });

client.query(
    fauna.query.Map(
        fauna.query.Paginate(fauna.query.Match(fauna.query.Index("jugadores_por_equipo"), "Boston Bruins")),
        fauna.query.Lambda("jugador", fauna.query.Get(fauna.query.Var("jugador")))
    )
)
    .then((response) => {
        const jugadores = response.data.map((jugador) => jugador.data);


    })
    .catch((error) => {
        console.error('Error al obtener los jugadores: ', error);
    });
function construirTabla(jugadores) {
    let tabla = Jugadores.Tabla_de_Jugadores.cabecera;

    jugadores.forEach((jugador) => {
        const fila = Jugadores.Tabla_de_Jugadores.cuerpo
            .replace("${Personas.Tabla_jugadores.DORSAL}", jugador.dorsal)
            .replace("${Personas.Tabla_jugadores.NOMBRE}", jugador.nombre)
            .replace("${Personas.Tabla_jugadores.APELLIDOS}", jugador.apellidos)
            .replace("${Personas.Tabla_jugadores.EQUIPO}", jugador.equipo)
            .replace("${Personas.plantillaTags['AÑO ENTRADA']}", jugador.año_contratación)
            .replace("${Personas.Tabla_jugadores.POSICION}", jugador.posicion);

        tabla += fila;
    });

    tabla += '</tbody></table>';

    // Aquí se podría agregar la tabla al DOM o hacer algo más con ella
    console.log(tabla);
}
