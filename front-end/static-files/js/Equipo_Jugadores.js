
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


/// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
Jugadores.FormularioJugador = {}


// Cabecera del formulario
Jugadores.EditarJugador.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-jugadores">
        <thead>
            <th width="10%">Dorsal</th><th width="20%">Nombre</th><th width="20%">Apellidos</th><th width="10%">Equipo</th>
            <th width="15%">Año contratación</th><th width="25%">posicion</th>
        </thead>
        <tbody>
            <tr title="${Jugadores.Tags.dorsal}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-jugadores-dorsal"
                        value="${Jugadores.Tags.dorsal}" 
                        name="dorsal_jugador"/></td>
                <td><input type="text" class="form-jugador-elemento editable" disabled
                        id="form-jugador-dorsal" required value="${Jugadores.Tags.dorsal}" 
                        name="dorsal_jugador"/></td>
                <td><input type="text" class="form-jugador-elemento editable" disabled
                        id="form-jugador_nombre" value="${Jugadores.Tags.nombre}" 
                        name="nombre_jugador"/></td>
                <td><input type="text" class="form-jugador-elemento editable" disabled
                        id="form-jugador_apellido" required value="${jugador.Tags.apellidos}" 
                        name="apellido_jugador"/></td>
                <td><input type="number" class="form-jugador-elemento editable" disabled
                        id="form-jugador-anio" min="1950" max="2030" size="8" required
                        value="${Jugadores.Tags["AÑO ENTRADA"]}" 
                        name="año_entrada_jugador"/></td>
                <td>
                    <div><a href="javascript:Jugador.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Jugador.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Jugador.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;
