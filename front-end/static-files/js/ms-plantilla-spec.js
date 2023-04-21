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

/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @param {String} idPersona Identificador de la persona a mostrar
 */
/*Plantilla.mostrar = function (idPersona) {
    console.log('Mostrar: ', idPersona)
    this.recuperaUnaPersona(idPersona, function(datosPersona) {
        this.imprimeUnaPersona(datosPersona);
    }.bind(this));
};

describe('Plantilla.mostrar', function () {
    beforeEach(function () {
        spyOn(Plantilla, 'recuperaUnaPersona');
        spyOn(Plantilla, 'imprimeUnaPersona');
    });

    it('debería llamar a recuperaUnaPersona con el id de persona', function () {
        const idPersona = '123';
        Plantilla.mostrar(idPersona);
        expect(Plantilla.recuperaUnaPersona).toHaveBeenCalledWith(idPersona, jasmine.any(Function));
    });

    it('debería llamar a imprimeUnaPersona con los datos de la persona', function () {
        const datosPersona = {
            nombre: 'Connor',
            apellidos: 'Clifton',
            año: 2018,
            mes: 5,
            dia: 18,
            posicion: "Defensa",
            años_jugados_NHL: [2018, 2019, 2020, 2021]
        };

        Plantilla.imprimeUnaPersona(datosPersona);
        expect(Plantilla.imprimeUnaPersona).toHaveBeenCalledWith(datosPersona);
    });
});


describe("Plantilla.obtenerIdAnterior", function () {
    let idActual, idAnterior;

    beforeEach(function () {
        Plantilla.datosMostrados = ["362342206676140236",
            "362342206676140237",
            "362342206676141260",
            "362342206676141261",
            "362342206676142284",
            "362342206676142285",
            "362342206676143308",
            "362342206676143309",
            "362342206676144332",
            "362342206676144333",
            "362342206676145357",
            "362342206677188812"];
    });

    it("debería devolver el ID anterior al actual si no es el primer elemento", function () {
        idActual = "362342206676140237";
        idAnterior = Plantilla.obtenerIdAnterior(idActual);
        expect(idAnterior).toEqual("362342206676140236");
    });

    it("debería devolver el último ID si el actual es el primer elemento", function () {
        idActual = "362342206676140236";
        idAnterior = Plantilla.obtenerIdAnterior(idActual);
        expect(idAnterior).toEqual("362342206677188812");
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
                        id: '361270097929568461'
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

describe("Plantilla.imprimeMuchasPersonas", function () {
    let vector;
    beforeEach(function () {
        // Preparar datos de prueba
        vector = [
            {nombre: "Tuukka", apellidos: "Rask", año:"2007", mes:"06", dia:"05", posicion: "Portero", años_jugados_NHL: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]},
            {nombre: "David", apellidos: "Krejci", año:"2006", mes:"06", dia:"08", posicion: "Centro", años_jugados_NHL: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]},

        ];

        spyOn(Frontend.Article, "actualizar");
        spyOn(Plantilla.plantillaTablaPersonas, "actualiza").and.callThrough();
    });

    it("debería actualizar el objeto Article con el listado de personas", function () {
        Plantilla.imprimeMuchasPersonas(vector);

        let msjEsperado = Plantilla.plantillaTablaPersonas.cabecera;
        vector.forEach(e => {
            expect(Plantilla.plantillaTablaPersonas.actualiza).toHaveBeenCalledWith(e);
            msjEsperado += Plantilla.plantillaTablaPersonas.actualiza(e);
        });
        msjEsperado += Plantilla.plantillaTablaPersonas.pie;

        expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de personas", msjEsperado);
    });

    it("debería añadir los IDs de los datos mostrados al array 'datosMostrados'", function () {
        Plantilla.datosMostrados = [];
        Plantilla.imprimeMuchasPersonas(vector);
        expect(Plantilla.datosMostrados).toEqual(jasmine.arrayContaining([
            vector[0].ID,
            vector[1].ID
        ]));
    });

    it("debería llamar a actualiza de plantillaTablaPersonas para cada persona", function () {
        Plantilla.imprimeMuchasPersonas(vector);
        expect(Plantilla.plantillaTablaPersonas.actualiza).toHaveBeenCalledTimes(2);
    });
});




describe("Plantilla.recupera", function () {

        beforeEach(function () {
            spyOn(window, "fetch").and.returnValue(Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    data: [
                        {nombre: "Tuukka", apellidos: "Rask", año:"2007", mes:"06", dia:"05", posicion: "Portero", años_jugados_NHL: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]},

                    ]
                })
            }));
        });

        it("debería recuperar los datos del API y resolver la promesa con ellos", async function () {
            const expectedData = [
                {nombre: "Tuukka", apellidos: "Rask", año:"2007", mes:"06", dia:"05", posicion: "Portero", años_jugados_NHL: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]},
                {nombre: "David", apellidos: "Krejci", año:"2006", mes:"06", dia:"08", posicion: "Centro", años_jugados_NHL: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]}]

                spyOn(window, "fetch").and.returnValue(Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    data: expectedData
                })
            }));

            const data = await Plantilla.recupera();
            expect(window.fetch).toHaveBeenCalledWith(
                Frontend.API_GATEWAY + "/plantilla/getTodas"
            );
            expect(data).toEqual(expectedData);
            expect(Plantilla.datosMostrados).toEqual(expectedData);
        });

        it("debería manejar errores al obtener datos desde la API", async function () {
            spyOn(window, "alert");
            spyOn(console, "error");
            window.fetch.and.returnValue(Promise.reject("API Gateway error"));

            await expect(Plantilla.recupera()).rejects.toBe("API Gateway error");

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
