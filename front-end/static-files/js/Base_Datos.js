const fauna = require('faunadb');
const client = new fauna.Client({ secret: 'fnAE_aP3MKAAzJ2OxyRIj5HVRufFhXIzCRxEdgJu' });

const jugadores = [
    {
        id: 1,
        dorsal: 40,
        nombre: "Tuukka",
        apellidos: "Rask",
        año_entrada: 2007,
        posicion: "Portero"
    },
    {
        id: 2,
        dorsal: 46,
        nombre: "David",
        apellidos: "Krejci",
        año_entrada: 2006,
        posicion: "Centro"
    },
    {
        id: 3,
        dorsal: 37,
        nombre: "Patrice",
        apellidos: "Bergeron",
        año_entrada: 2003,
        posicion: "Centro"
    },
    {
        id: 4,
        dorsal: 63,
        nombre: "Brad",
        apellidos: "Marchand",
        año_entrada: 2009,
        posicion: "Ala Izquierda"
    },
    {
        id: 5,
        dorsal: 88,
        nombre: "David",
        apellidos: "Pastrnak",
        año_entrada: 2014,
        posicion: "Ala Derecha"
    },
    {
        id: 6,
        dorsal: 73,
        nombre: "Charlie",
        apellidos: "McAvoy",
        año_entrada: 2016,
        posicion: "Defensa"
    },
    {
        id: 7,
        dorsal: 48,
        nombre: "Matt",
        apellidos: "Grzelcyk",
        año_entrada: 2016,
        posicion: "Defensa"
    },
    {
        id: 8,
        dorsal: 75,
        nombre: "Connor",
        apellidos: "Clifton",
        año_entrada: 2018,
        posicion: "Defensa"
    },
    {
        id: 9,
        dorsal: 21,
        nombre: "Nick",
        apellidos: "Foligno",
        año_entrada: 2021,
        posicion: "Ala Izquierda"
    },
    {
        id: 10,
        dorsal: 46,
        nombre: "Erik",
        apellidos: "Haula",
        año_entrada: 2021,
        posicion: "Centro"
    },
    {
        id: 11,
        dorsal: 7,
        nombre: "Derek",
        apellidos: "Forbort",
        año_entrada: 2021,
        posicion: "Defensa"
    },
    {
        id: 12,
        dorsal: 13,
        nombre: "Jake",
        apellidos: "DeBrusk",
        año_entrada: 2016,
        posicion: "Ala Izquierda"
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