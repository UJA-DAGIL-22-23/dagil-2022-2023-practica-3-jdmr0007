/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"
const Titulo_mostrar_persona="Mostrar una persona"



const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })






})

/*describe('Plantilla.mostrar', function () {

    beforeEach(function () {
        spyOn(Plantilla, 'recuperaUnaPersona');
        spyOn(Plantilla, 'imprimeUnaPersona');
    });

    it('debería llamar a recuperaUnaPersona con el id de persona', function () {
        const idPersona = '123';
        Plantilla.mostrar(idPersona);
        expect(Plantilla.recuperaUnaPersona).toHaveBeenCalledWith(idPersona, jasmine.any(Function));
    });

    /*it('debería llamar a imprimeUnaPersona con los datos de la persona', function () {
        //const datosPersona = { nombre: 'Connor', apellidos: 'Clifton', año: 2018, posicion: "Defensa", años_jugados_NHL: [2018, 2019, 2020, 2021] };
        const callback = jasmine.createSpy();
        Plantilla.imprimeUnaPersona(datosPersona, callback);
        expect(callback).toHaveBeenCalledWith(datosPersona);
    });

});

describe("Plantilla.obtenerIdAnterior", function () {
    let idActual, idAnterior;

    beforeEach(function () {
        Plantilla.datosMostrados = ["id1", "id2", "id3"];
    });

    it("debería devolver el ID anterior al actual si no es el primer elemento", function () {
        idActual = "id2";
        idAnterior = Plantilla.obtenerIdAnterior(idActual);
        expect(idAnterior).toEqual("id1");
    });

    it("debería devolver el último ID si el actual es el primer elemento", function () {
        idActual = "id1";
        idAnterior = Plantilla.obtenerIdAnterior(idActual);
        expect(idAnterior).toEqual("id3");
    });

    it("debería devolver undefined si el ID actual no está en el array de datos mostrados", function () {
        idActual = "id4";
        idAnterior = Plantilla.obtenerIdAnterior(idActual);
        expect(idAnterior).toBeUndefined();
    });
});

describe('Plantilla.imprimeUnaPersona', () => {
    let persona, msj;

    beforeEach(() => {
        // Crear un objeto persona de prueba
        persona = {
            ref: {
                '@ref': {
                    id: '123'
                }
            }
        };
        // Crear un mensaje de prueba
        msj = '<tabla con la información de la persona>';
        // Espiar en la función "console.log"
        spyOn(console, 'log');
        // Espiar en la función "Frontend.Article.actualizar"
        spyOn(Frontend.Article, 'actualizar');
    });

    it('debería actualizar el objeto que guarda los datos mostrados', () => {
        // Llamar a la función a probar
        Plantilla.imprimeUnaPersona(persona);
        // Comprobar que la función "almacenaDatos" se llama con el objeto persona
        expect(Plantilla.almacenaDatos).toHaveBeenCalledWith(persona);
    });

    it('debería actualizar la información mostrada en la plantilla', () => {
        // Llamar a la función a probar
        Plantilla.imprimeUnaPersona(persona);
        // Comprobar que la función "personaComoFormulario" se llama con el objeto persona
        expect(Plantilla.personaComoFormulario).toHaveBeenCalledWith(persona);
        // Comprobar que la función "Frontend.Article.actualizar" se llama con el mensaje de prueba
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Mostrar una persona", msj);
    });

    it('debería imprimir un mensaje en la consola con el ID actual de la persona', () => {
        // Llamar a la función a probar
        Plantilla.imprimeUnaPersona(persona);
        // Comprobar que la función "console.log" se llama con el mensaje esperado
        expect(console.log).toHaveBeenCalledWith("IDactual", persona);
    });

    it('debería llamar a la función "obtenerIdAnterior" con el ID actual de la persona', () => {
        // Llamar a la función a probar
        Plantilla.imprimeUnaPersona(persona);
        // Comprobar que la función "obtenerIdAnterior" se llama con el ID actual de la persona
        expect(Plantilla.obtenerIdAnterior).toHaveBeenCalledWith(persona.ref['@ref'].id);
    });
});

/*describe("Plantilla.imprimeMuchasPersonas", function() {

    beforeEach(function() {
        spyOn(Frontend.Article, "actualizar");
    });

    it("debería actualizar los datos mostrados en el objeto Article", function() {
        let vector = [
            {
                ID: "362342206676143308",
                nombre: "Connor",
                apellidos: "Clifton",
                año:"2018",
                mes:"05",
                dia:"18",
                posicion: "Defensa",
                años_jugados_NHL: [2018, 2019, 2020, 2021]
            }
        ];
        Plantilla.imprimeMuchasPersonas(vector);
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith(
            "Listado de personas",
            "<table><thead><tr><th>ID</th><th>Nombre</th><th>Apellidos</th><th>Año</th><th>Mes</th><th>Día</th><th>Posición</th><th>Años jugados NHL</th></tr></thead><tbody><tr><td>362342206676143308</td><td>Connor</td><td>Clifton</td><td>2018</td><td>05</td><td>18</td><td>Defensa</td><td>[2018, 2019, 2020, 2021]</td></tr></tbody></table>"
        );
    });

    it("debería añadir los IDs de los datos mostrados al array 'datosMostrados'", function() {
        let vector = [
            {
                ID: "362342206676143308",
                nombre: "Connor",
                apellidos: "Clifton",
                año:"2018",
                mes:"05",
                dia:"18",
                posicion: "Defensa",
                años_jugados_NHL: [2018, 2019, 2020, 2021]
            }
        ];
        Plantilla.datosMostrados = [];
        Plantilla.imprimeMuchasPersonas(vector);
        expect(Plantilla.datosMostrados).toEqual(["362342206676143308"]);
    });

});

describe("Plantilla.recupera", function() {

    beforeEach(function() {
        spyOn(window, "fetch").and.returnValue(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                data: [
                    { ID: "123", nombre: "John", edad: 30 },
                    { ID: "456", nombre: "Jane", edad: 25 },
                    { ID: "789", nombre: "Bob", edad: 40 }
                ]
            })
        }));
    });

    it("debería recuperar los datos del API y llamar a la función de devolución de llamada con ellos", async function() {
        let callBackFn = jasmine.createSpy();
        await Plantilla.recupera(callBackFn);
        expect(window.fetch).toHaveBeenCalledWith(
            Frontend.API_GATEWAY + "/plantilla/getTodas"
        );
        expect(callBackFn).toHaveBeenCalledWith([
            { ID: "123", nombre: "John", edad: 30 },
            { ID: "456", nombre: "Jane", edad: 25 },
            { ID: "789", nombre: "Bob", edad: 40 }
        ]);
        expect(Plantilla.datosMostrados).toEqual([
            { ID: "123", nombre: "John", edad: 30 },
            { ID: "456", nombre: "Jane", edad: 25 },
            { ID: "789", nombre: "Bob", edad: 40 }
        ]);
    });

    it("debería manejar errores al obtener datos desde la API", async function() {
        spyOn(window, "alert");
        spyOn(console, "error");
        window.fetch.and.returnValue(Promise.reject("API Gateway error"));
        await Plantilla.recupera(jasmine.createSpy());
        expect(window.alert).toHaveBeenCalledWith("Error:recupera: No se han podido acceder al API Gateway");
        expect(console.error).toHaveBeenCalledWith("API Gateway error");
        expect(Plantilla.datosMostrados).toBeNull();
    });

});*/




/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
