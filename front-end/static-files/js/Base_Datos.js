const fauna = require('faunadb');
const client = new fauna.Client({ secret: 'fnAE_aP3MKAAzJ2OxyRIj5HVRufFhXIzCRxEdgJu' });

const jugadores = [
    {

        nombre: "Tuukka",
        apellidos: "Rask",
        fecha_entrada: "05/06/2007",
        posicion: "Portero",
        años_jugados_NHL: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    },

    {

        nombre: "David",
        apellidos: "Krejci",
        fecha_entrada: "08/06/2006",
        posicion: "Centro",
        años_jugados_NHL: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    },


    { nombre: "Patrice",
        apellidos: "Bergeron",
        fecha_entrada: "10/06/2003",
        posicion: "Centro",
        años_jugados_NHL: [2003, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    },
    {

        nombre: "Brad",
        apellidos: "Marchand",
        fecha_entrada: "20/05/2009",
        posicion: "Ala Izquierda",
        años_jugados_NHL: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    },
    {

        nombre: "David",
        apellidos: "Pastrnak",
        fecha_entrada: "22/05/2014",
        posicion: "Ala Derecha",
        años_jugados_NHL: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    },
    {

        nombre: "Charlie",
        apellidos: "McAvoy",
        fecha_entrada: "21/04/2016",
        posicion: "Defensa",
        años_jugados_NHL: [2016, 2017, 2018, 2019, 2020, 2021]
    },
    {

        nombre: "Matt",
        apellidos: "Grzelcyk",
        fecha_entrada: "14/04/2016",
        posicion: "Defensa",
        años_jugados_NHL: [2016, 2017, 2018, 2019, 2020, 2021]
    },
    {

        nombre: "Connor",
        apellidos: "Clifton",
        fecha_entrada: "18/05/2018",
        posicion: "Defensa",
        años_jugados_NHL: [2018, 2019, 2020, 2021]
    },
    {

        nombre: "Nick",
        apellidos: "Foligno",
        fecha_entrada: "12/04/2021",
        posicion: "Ala Izquierda",
        años_jugados_NHL: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    },
    {
        nombre: "Erik",
        apellidos: "Haula",
        fecha_entrada: "01/07/2021",
        posicion: "Centro",
        años_jugados_NHL: [2021]
    },
    {
        nombre: "Derek",
        apellidos: "Forbort",
        fecha_entrada: "01/07/2021",
        posicion: "Defensa",
        años_jugados_NHL: [2016, 2017, 2018, 2019, 2020, 2021]
    },
    {
        nombre: "Jake",
        apellidos: "DeBrusk",
        fecha_entrada: "01/07/2016",
        posicion: "Ala Izquierda",
        años_jugados_NHL: [2016, 2017, 2018, 2019, 2020, 2021, 2022]
    }

];







for (const jugador of jugadores) {
    client.query(
        fauna.query.Create(
            fauna.query.Collection('Equipos_Hokey_Hielo'),
            { data: jugador }
        )
    )
        .then((response) => {
            console.log("Jugador creado:", response);
        })
        .catch((error) => {
            console.error('Error al crear el jugador: ', error);
        });
}