/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error:Plantilla.descargarRuta: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}

/// Nombre de los campos del formulario para editar una persona
Plantilla.form = {
    NOMBRE: "form-jugador-nombre",
    APELLIDOS: "form-jugador-apellidos",
    POSICION: "form-jugador-posicion",
    ANIO: "form-jugador-anio",
}


Plantilla.TablaEquipo = {};

//Tags que voy a usar para sustituir los campos
Plantilla.Tags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "Año de contratacion": "### AÑO CONTRATACION ###",
    "Posicion": "### Posicion ###",
    " NHL": "###  NHL ###",
}


Plantilla.TablaEquipo.cabecera = `<table width="100%" class="listado-personas">
    <thead>
        <tr>
            <th width="10%">ID</th>
            <th width="30%">Nombre completo</th>
            <th width="20%">Año de contratación</th>
            <th width="20%">Posición</th>
            <th width="30%">Años de participacion de la NHL</th>
        </tr>
    </thead>
    <tbody>
`;



Plantilla.TablaEquipo.cuerpo = `
    <tr title="${Plantilla.Tags.ID}">
        <td>${Plantilla.Tags.ID}</td>
        <td>${Plantilla.Tags.NOMBRE} ${Plantilla.Tags.APELLIDOS}</td>
        <td>${Plantilla.Tags["Año de contratacion"]}</td>
        <td>${Plantilla.Tags.Posicion}</td>
        <td>${Plantilla.Tags[" NHL"]}</td>
        <td>
            <div><a href="javascript:Plantilla.mostrar('${Plantilla.Tags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
`;

Plantilla.TablaEquipo.pie = `
    </tbody>
    </table>
`;


/// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
Plantilla.FormularioEquipo = {}

// Cabecera del formulario
Plantilla.FormularioEquipo.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Apellidos</th><th width="10%">eMail</th>
            <th width="15%">Año contratación</th><th width="25%">Acciones</th>
        </thead>
        <tbody>
            <tr title="${Plantilla.Tags.ID}">
                <td><input type="text" class="form-jugador-elemento editable" disabled
                        id="form-jugador-nombre" required value="${Plantilla.Tags.NOMBRE}" 
                        name="nombre_jugador"/></td>
                <td><input type="text" class="form-jugador-elemento editable" disabled
                        id="form-jugador-apellidos" value="${Plantilla.Tags.APELLIDOS}" 
                        name="apellidos_jugador"/></td>
                <td><input type="text" class="form-jugador-elemento editable" disabled
                        id="form-jugador-posicion" required value="${Plantilla.Tags.Posicion}" 
                        name="posicion-jugador"/></td>
                <td><input type="number" class="form-jugador-elemento editable" disabled
                        id="form-jugador-anio" min="1950" max="2030" size="8" required
                        value="${Plantilla.Tags["ño de contratacion"]}" 
                        name="año_contratacion_jugador"/></td>
                <td>
                    <div><a href="javascript:Personas.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Personas.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Personas.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;

/**
 * Imprime los datos de una persona como una tabla usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Plantilla.jugadorComoTabla = function (jugador) {
    return Plantilla.TablaEquipo.cabecera
        + Plantilla.TablaEquipo.actualiza(jugador)
        + Plantilla.TablaEquipo.pie;
}



Plantilla.sustituyeTags = function (plantilla, jugador) {
    return plantilla
        .replace(new RegExp(Plantilla.Tags.ID, 'g'), jugador.ref['@ref'].id)
        .replace(new RegExp(Plantilla.Tags.NOMBRE, 'g'), jugador.data.nombre)
        .replace(new RegExp(Plantilla.Tags.APELLIDOS, 'g'), jugador.data.apellidos)
        .replace(new RegExp(Plantilla.Tags["Año de contratacion"], 'g'), jugador.data.fecha_entrada)
        .replace(new RegExp(Plantilla.Tags.Posicion, 'g'), jugador.data.posicion)
        .replace(new RegExp(Plantilla.Tags[" NHL"], 'g'), jugador.data.años_jugados_NHL)
}

Plantilla.FormularioEquipo.actualiza = function (jugador) {
    return Plantilla.sustituyeTags(this.formulario, jugador)
}

Plantilla.personaComoFormulario = function (jugador) {
    return Plantilla.FormularioEquipo.actualiza( jugador );
}

Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error:Plantilla.Recupera: No se han podido acceder al API Gateway")
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



Plantilla.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/personas/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error:Plantilla.recuperaUnaPersona: No se han podido acceder al API Gateway")
        console.error(error)
    }
}


Plantilla.TablaEquipo.actualiza = function (jugador) {
    return Plantilla.sustituyeTags(this.cuerpo, jugador)
}

Plantilla.imprimeMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.TablaEquipo.cabecera
    vector.forEach(e => msj += Plantilla.TablaEquipo.actualiza(e))
    msj += Plantilla.TablaEquipo.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de jugadores", msj)
}

/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */

Plantilla.imprimeUnaPersona = function (jugador) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Plantilla.personaComoFormulario(jugador);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Plantilla.almacenaDatos(jugador)
}

Plantilla.almacenaDatos = function (jugador) {
    Plantilla.personaMostrada = jugador;
}

Plantilla.listar = function () {
    Plantilla.recupera(Plantilla.imprimeMuchasPersonas);
}

/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @param {String} idPersona Identificador de la persona a mostrar
 */
Plantilla.mostrar = function (idJugador) {
    this.recuperaUnaPersona(idJugador, this.imprimeUnaPersona);
}

/**
 * ????Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
*/
Plantilla.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}



/**
 * Oculta todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
    */
Plantilla.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}

/**
 * Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Plantilla.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}

Plantilla.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Plantilla.form) {
        document.getElementById(Plantilla.form[campo]).disabled = deshabilitando
    }
    return this
}

Plantilla.habilitarCamposEditables = function () {
    Plantilla.habilitarDeshabilitarCamposEditables(false)
    return this
}

Plantilla.recuperaDatosAlmacenados = function () {
    return this.personaMostrada;
}

Plantilla.deshabilitarCamposEditables = function () {
    Plantilla.habilitarDeshabilitarCamposEditables(true)
    return this
}

Plantilla.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}

Plantilla.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}


/**
 * Función que permite modificar los datos de una persona
*/
Plantilla.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}


/**
 * Función que permite cancelar la acción sobre los datos de una persona
 */
Plantilla.cancelar = function () {
    this.imprimeUnaPersona(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

/**
 * Función para guardar los nuevos datos de una persona
 */
Plantilla.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/plantilla/setTodo/"
        let id_jugador = document.getElementById("form-jugador-id").value
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id_jugador": id_persona,
                "nombre_jugador": document.getElementById("form-jugador-nombre").value,
                "apellidos_jugador": document.getElementById("form-jugador-apellidos").value,
                "año_entrada_persona": document.getElementById("form-jugador-anio").value,
                "posicion_jugador": document.getElementById("form-jugador-posicion").value,
                "NHL_jugador": document.getElementById("form-jugador-NHL").value

            }), // body data type must match "Content-Type" header
        })

        Error: "No procesa bien la respuesta devuelta"
        if (response) {
            const persona = await response.json()
            alert(persona)
        }

        Plantilla.mostrar(id_jugador)
    } catch (error) {
        alert("Error,Plantilla.guardar: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}











