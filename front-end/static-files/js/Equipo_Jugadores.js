"use strict";


let Jugadores = {};
Jugadores.TablaEquipo = {};

//Tags que voy a usar para sustituir los campos
Jugadores.Tags = {
    "ID": "### ID ###",
    "Dorsal": "### DORSAL ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "Año de contratacion": "### AÑO CONTRATACION ###",
    "Posicion": "### Posicion ###",
}


Jugadores.TablaEquipo.cabecera = `<table width="100%" class="listado-personas">
    <thead>
        <tr>
            <th width="10%">ID</th>
            <th width="10%">Dorsal</th>
            <th width="30%">Nombre completo</th>
            <th width="20%">Año de contratación</th>
            <th width="20%">Posición</th>
        </tr>
    </thead>
    <tbody>
`;



Jugadores.TablaEquipo.cuerpo = `
    <tr title="${Jugadores.Tags.ID}">
        <td>${Jugadores.Tags.ID}</td>
        <td>${Jugadores.Tags.Dorsal}</td>
        <td>${Jugadores.Tags.NOMBRE} ${Jugadores.Tags.APELLIDOS}</td>
        <td>${Jugadores.Tags["Año de contratacion"]}</td>
        <td>${Jugadores.Tags.Posicion}</td>
        <td>
            <div><a href="javascript:Proyectos.listar('${Jugadores.Tags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
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

Jugadores.sustituyeTags = function (plantilla, jugador) {
    return plantilla
        .replace(new RegExp(Jugadores.Tags.ID, 'g'), jugador.ref['@ref'].id)
        .replace(new RegExp(Jugadores.Tags.Dorsal, 'g'), jugador.ref['@ref'].dorsal)
        .replace(new RegExp(Jugadores.Tags.NOMBRE, 'g'), jugador.data.nombre)
        .replace(new RegExp(Jugadores.Tags.APELLIDOS, 'g'), jugador.data.apellidos)
        .replace(new RegExp(Jugadores.Tags["Año de contratacion"], 'g'), jugador.data.año_entrada)
        .replace(new RegExp(Jugadores.Tags.Posicion, 'g'), jugador.data.posicion)
}

Jugadores.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorjugadores = null
    if (response) {
        vectorjugadores = await response.json()
        callBackFn(vectorjugadores.data)
    }
}



Jugadores.recuperaUnaPersona = async function (idjugador, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idjugador
        const response = await fetch(url);
        if (response) {
            const jugador = await response.json()
            callBackFn(jugador)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

Jugadores.imprimeUnaPersona = function (jugador) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Jugadores.JugadorComoFormulario(jugador)

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Jugadores.almacenaDatos(jugador)
}

Jugadores.TablaEquipo.actualiza = function (jugador) {
    return Jugadores.sustituyeTags(this.cuerpo, jugador)
}

Jugadores.imprimeMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Jugadores.TablaEquipo.cabecera
    vector.forEach(e => msj += Jugadores.TablaEquipo.actualiza(e))
    msj += Jugadores.TablaEquipo.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de jugadores", msj)
}

Jugadores.listar = function () {
    Jugadores.recupera(Jugadores.imprimeMuchasPersonas);
}



