
client.query(
    fauna.query.Map(
        fauna.query.Paginate(fauna.query.Match(fauna.query.Index("jugadores_por_equipo"), "Boston Bruins")),
        fauna.query.Lambda("jugador", fauna.query.Get(fauna.query.Var("jugador")))
    )
)
    .then((response) => {
        const jugadores = response.data.map((jugador) => jugador.data);
        const tabla = construirTabla(jugadores);
        // Hacer algo con la tabla generada
    })
    .catch((error) => {
        console.error('Error al obtener los jugadores: ', error);
    });

Jugadores.TablaEquipo.cabecera = `<table width="100%" class="listado-personas">
    <thead>
        <tr>
            <th width="10%">Dorsal</th>
            <th width="30%">Nombre completo</th>
            <th width="20%">Equipo</th>
            <th width="20%">Año de contratación</th>
            <th width="20%">Posición</th>
        </tr>
    </thead>
    <tbody>
`;

Jugadores.TablaEquipo.cuerpo = `
    <tr title="${jugador.nombre}">
        <td>${jugador.dorsal}</td>
        <td>${jugador.nombre} ${jugador.apellidos}</td>
        <td>${jugador.equipo}</td>
        <td>${jugador.año_contratación}</td>
        <td>${jugador.posicion}</td>
        <td>
            <div><a href="javascript:Personas.mostrar('${Personas.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
`;

Jugadores.TablaEquipo.pie = `
    </tbody>
    </table>
`;

Jugadores.mostrarTabla = function (jugador) {
    return Jugadores.TablaEquipo.cabecera
        + Jugadores.TablaEquipo.cuerpo
        + Jugadores.TablaEquipo.pie;
}
