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
        alert("Error: No se han podido acceder al API Gateway")
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

let Proyectos = {};

/**
 * Función principal para mostrar los datos enviados por la ruta " Equipo" de MS Plantilla
 */

Proyectos.mostrarEquipo = function (datosDescargados) {
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
    Frontend.Article.actualizar("Equipo", mensajeAMostrar)
}

Proyectos.procesarEquipo = function () {
    this.descargarRuta("/plantilla/equipoHokey", this.mostrarEquipo());
}



/**
* Función que recuperar todos los proyectos junto con las personas asignadas a cada uno de ellos
* llamando al MS Proyectos
* @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
*/
Proyectos.recuperaConJugadores = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/ms-plantilla/getTodosConPersonas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorProyectos = null
    if (response) {
        vectorProyectos = await response.json()
        callBackFn(vectorProyectos.data)
    }
}


// Funciones para mostrar como TABLE

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Proyectos.cabeceraTable = function () {
    return `<table class="listado-proyectos">
        <thead>
        <th>Dorsal</th><th>Nombre</th><th>Apellidos</th><th>Fecha</th><th>Posicion</th>
        </thead>
        <tbody>
    `;
}

/**
 * Muestra la información de cada proyecto en un elemento TR con sus correspondientes TD
 * @param {proyecto} p Datos del proyecto a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Proyectos.cuerpoTr = function (p) {
    const dorsal = p.dorsal;
    const nombre = d.nombre;
    const apellidos = d.apellidos;
    const posicion =d.posicion;
    const fecha=f.fecha;

    return `<tr title="${p.ref['@ref'].id}">
    <td>${d.dorsal}</td>
    <td><em>${d.nombre}</em></td>
    <td>${d.apellidos}</td>
    <td>${f.dia}/${f.mes}/${f.año}</td>
    </tr>
    `;
}




/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
Proyectos.pieTable = function () {
    return "</tbody></table>";
}



/**
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBDD.
 * @param {Vector_de_proyectos} vector Vector con los datos de los proyectos a mostrar
 */
Proyectos.imprime = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Proyectos.cabeceraTable();
    vector.forEach(e => msj += Proyectos.cuerpoTr(e))
    msj += Proyectos.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de proyectos", msj )

}

Proyectos.listar = function () {
    this.recupera(this.imprime);
}



/**
 * Método para obtener todos los proyectos de la BBDD y, además, las personas que hay en cada proyecto
 * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL
 * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
 */
