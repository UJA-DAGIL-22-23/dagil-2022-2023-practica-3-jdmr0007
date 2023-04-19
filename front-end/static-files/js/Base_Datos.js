const fauna = require('faunadb');
const client = new fauna.Client({ secret: 'fnAFAxoD3mAAzZ8sstxKy6-AXDrXZvGEPxp5bmIN' });

const jugadores = [
    {


        nombre: "Tuukka",
        apellidos: "Rask",
        año:"2007",
        mes:"06",
        dia:"05",
        posicion: "Portero",
        años_jugados_NHL: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    },

    {


        nombre: "David",
        apellidos: "Krejci",
        año:"2006",
        mes:"06",
        dia:"08",
        posicion: "Centro",
        años_jugados_NHL: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    },


    {


        nombre: "Patrice",
        apellidos: "Bergeron",
        año:"2003",
        mes:"06",
        dia:"10",
        posicion: "Centro",
        años_jugados_NHL: [2003, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    },
    {


        nombre: "Brad",
        apellidos: "Marchand",
        año:"2009",
        mes:"05",
        dia:"20",
        posicion: "Ala Izquierda",
        años_jugados_NHL: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    },
    {


        nombre: "David",
        apellidos: "Pastrnak",
        año:"2014",
        mes:"05",
        dia:"22",
        posicion: "Ala Derecha",
        años_jugados_NHL: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    },
    {


        nombre: "Charlie",
        apellidos: "McAvoy",
        año:"2016",
        mes:"04",
        dia:"21",
        posicion: "Defensa",
        años_jugados_NHL: [2016, 2017, 2018, 2019, 2020, 2021]
    },
    {


        nombre: "Matt",
        apellidos: "Grzelcyk",
        año:"2016",
        mes:"04",
        dia:"14",
        posicion: "Defensa",
        años_jugados_NHL: [2016, 2017, 2018, 2019, 2020, 2021]
    },
    {


        nombre: "Connor",
        apellidos: "Clifton",
        año:"2018",
        mes:"05",
        dia:"18",
        posicion: "Defensa",
        años_jugados_NHL: [2018, 2019, 2020, 2021]
    },
    {


        nombre: "Nick",
        apellidos: "Foligno",
        año:"2021",
        mes:"04",
        dia:"12",
        posicion: "Ala Izquierda",
        años_jugados_NHL: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
    },
    {


        nombre: "Erik",
        apellidos: "Haula",
        año:"2021",
        mes:"07",
        dia:"01",
        posicion: "Centro",
        años_jugados_NHL: [2021]
    },
    {


        nombre: "Derek",
        apellidos: "Forbort",
        año:"2021",
        mes:"07",
        dia:"01",
        posicion: "Defensa",
        años_jugados_NHL: [2016, 2017, 2018, 2019, 2020, 2021]
    },
    {


        nombre: "Jake",
        apellidos: "DeBrusk",
        año:"2016",
        mes:"07",
        dia:"01",
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

//Eliminar jugadores
/*for (const jugador of jugadores) {
    client.query(
        fauna.query.Delete(
            fauna.query.Ref(
                fauna.query.Collection('Equipos_Hokey_Hielo'),
                jugador.id
            )
        )
    )
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
}*/