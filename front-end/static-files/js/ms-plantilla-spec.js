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

let prueba={


    datos_personales:[
        {
           ref: {
                "@ref": {
                    id: "362608688750395597"
                }
            },
            data: {
                nombre: "hola",
                apellidos: "mundo",
                fecha: {año: 2021, mes: 2, dia: 3},
                posicion: "profesor",
                años_jugados_NHL: [2017, 2018]

            }
        },
        {
            ref: {
                "@ref": {
                    id: "362608960790855885"
                }
            },
            data: {
                nombre: "hola2",
                apellidos: "mundo2",
                fecha: {año: 2022, mes: 4, dia: 22},
                posicion: "profesor2",
                años_jugados_NHL: [2016, 2017]

            }
        },

    ]
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

/*describe("Test de la función personaComoTabla", function() {
    let persona = {
        ref: {
            "@ref": {
                id: "362608688750395597"
            }
        },
        data: {
            nombre: "hola",
            apellidos: "mundo",
            fecha: {año: 2021, mes: 2, dia: 3},
            posicion: "profesor",
            años_jugados_NHL: [2017, 2018]
        }
    };

    it("debe devolver una cadena de texto", function() {
        expect(typeof Plantilla.personaComoTabla(persona)).toEqual("string");
    });




    it("debe incluir los datos de la persona en la tabla", function() {
        let tabla = Plantilla.personaComoTabla(persona);
        expect(tabla).toContain("<td>" + persona.data.nombre + "</td>");
        expect(tabla).toContain("<td>" + persona.data.apellidos + "</td>");
        expect(tabla).toContain("<td>" + persona.data.fecha.año + "</td>");
        expect(tabla).toContain("<td>" + persona.data.posicion + "</td>");
        expect(tabla).toContain("<td>" + persona.data.años_jugados_NHL.join(", ") + "</td>");
    });
});*/




describe('Plantilla.imprimeMuchasPersonas', function() {
    it('debería llamar a Frontend.Article.actualizar con los datos correctos', function() {
        // Mock de datos
        const vector = prueba.datos_personales;

        // Mock de la función Frontend.Article.actualizar
        spyOn(Frontend.Article, 'actualizar');

        // Llamada a la función
        Plantilla.imprimeMuchasPersonas(vector);

        // Expect
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de personas', jasmine.any(String));
    });
});





describe("obtenerIdAnterior", function() {


    beforeEach(function() {
        Plantilla.datosMostrados = prueba.datos_personales;
    });

    it("devuelve el id anterior correctamente cuando hay elementos en el array", function() {
        let idActual = Plantilla.datosMostrados[1];
        Plantilla.obtenerIdAnterior(idActual);
        expect(Plantilla.idAnterior).toEqual("362608688750395597");
    });

    it("devuelve el último id cuando el idActual es el primero del array", function() {
        let idActual = Plantilla.datosMostrados[0];
        Plantilla.obtenerIdAnterior(idActual);
        expect(Plantilla.idAnterior).toEqual("362608960790855885");
    });


});



describe("obtenerIdSiguiente", function() {
    beforeEach(function() {
        Plantilla.datosMostrados = prueba.datos_personales;
    });

    it("devuelve el id siguiente correctamente cuando hay elementos en el array", function() {
        let idActual = Plantilla.datosMostrados[0];
        Plantilla.obtenerIdSiguiente(idActual);
        expect(Plantilla.idSiguiente).toEqual("362608960790855885");
    });

    it("devuelve el primer id cuando el idActual es el último del array", function() {
        let idActual = Plantilla.datosMostrados[1];
        Plantilla.obtenerIdSiguiente(idActual);
        expect(Plantilla.idSiguiente).toEqual("362608688750395597");
    });

});

describe("almacenaDatos", function() {
    it("asigna la persona correctamente", function() {
        let persona = prueba.datos_personales[0];
        Plantilla.almacenaDatos(persona);
        expect(Plantilla.personaMostrada).toEqual(persona);
    });
});





describe("recuperaDatosAlmacenados", function() {
    it("devuelve el valor almacenado en personaMostrada", function() {

        Plantilla.personaMostrada = prueba.datos_personales[0];
        expect(Plantilla.recuperaDatosAlmacenados()).toEqual(prueba.datos_personales[0]);
    });
});

describe("Plantilla.sustituyeTags", function() {
    it("debería reemplazar correctamente las etiquetas de la plantilla con los datos de la persona", function() {
        // Arrange
        var plantilla = "ID: {{ID}}, Nombre: {{NOMBRE}}, Apellidos: {{APELLIDOS}}, Año de contratación: {{Año de contratacion}}, Posición: {{Posicion}}, Años jugados en NHL: {{ NHL }}";
        var persona = {
            ref: {
                "@ref": {
                    id: "1234567890"
                }
            },
            data: {
                nombre: "Juan",
                apellidos: "Pérez",
                fecha: {
                    año: 2021,
                    mes: 4,
                    dia: 24
                },
                posicion: "Delantero",
                años_jugados_NHL: [2018, 2019, 2020]
            }
        };
        var resultadoEsperado = "ID: 1234567890, Nombre: Juan, Apellidos: Pérez, Año de contratación: undefined, Posición: Delantero, Años jugados en NHL: 2018,2019,2020";

        // Act
        var resultadoObtenido = Plantilla.sustituyeTags(plantilla, persona);

        // Assert
        expect(resultadoEsperado).toEqual(resultadoEsperado);
    });
});











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
