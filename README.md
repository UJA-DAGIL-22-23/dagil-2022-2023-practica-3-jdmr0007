


Captura de pantalla del Home de Fauna

![Home Fauna](./assets/img/Home_Fauna.png)

Captura de pantala de la Base de datos de Fauna

![Base de datos de Fauna](./assets/img/Base_datos_fauna.png)

Captura de pantalla de la colección de Fauna

![Colección de Fauna](./assets/img/Coleccion_fauna.png)

Json de los documentos subido a fauna

```

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



```
Primer Incremento:
Lo que se ha echo en este incremento es implementar una tabla con los datos de un equipo de hokey sobre hielo 
,para ello se ha usado la base de datos de fauna, para poder mostrar los datos de los jugadores de este equipo.
En la clase ms-plantilla se ha implementado todo lo que tiene que ver con la tabla, como el nombre de las columnas,
los datos de los jugadores y el estilo de la tabla.Ademas se ha creado un archivo json con los datos de los jugadores

Captura de la tabla:

![Tabla](./assets/img/Captura_tabla.png)

Captura de inicio de trello:
![Inicio Trello](./assets/img/trello_inicial_primer_incremento.png)

Captura de final de trello:
![Final Trello](./assets/img/trello_final_primer_incremento.png)

Como se puede ver en las capturas hay dos historias de usuarios que no se han podido completar, esto se debe a que ha habido problemas en la implementacion de la tabla 
pos lo que esas historias de usuario se podran completar en el siguiente incremento.

Segundo Incremento:
Se ha corregido la fecha de la tabla añadiendo día/mes/año y añadido un vector con los años de participation en la NHL de cada jugador.
Se ha añadido la funcionalidad de darle al boton mostrar en la tabla y que se muestren los datos del jugador seleccionado. Añadiendo varios metodos al archivo ms-plantilla.js en el front-end y en la clase ms-plantilla 
Se ha añadido la funcionalidad de poder editar los datos de los jugadores de la tabla.
Como último se ha añadido la información del autor en el apartado "acerca de" de la página.

Captura de los datos del jugador:

![Datos jugador](./assets/img/mostrar_usuario_segundo_incremento.png)

Captura de la edición de los datos del jugador:

![Edición datos jugador](./assets/img/editar_usuario_segundo_incremento.PNG)

Captura de los datos del autor:

![Datos autor](./assets/img/acerca_de_segundo_incremento.png)

Captura de inicio de trello:

![Inicio Trello](./assets/img/trello_inicial_segundo_incremento.png)

Captura de final de trello:

![Final Trello](./assets/img/trello_final_segundo_incremento.png)





Historias de usuario:
* Como usuario quiero poder ver los jugadores de mi equipo de hockey favorito.
* Como usuario quiero poder ver los datos de los jugadores de mi equipo de hockey favorito.
* Como usuario quiero poder editar los datos(nombre, apellido, posicion y fecha) de los jugadores de mi equipo favorito.
* Como usuario quiero poder ver los datos del autor de la página web.
