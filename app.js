const express = require('express');

const app = express();

app.get('/', (req, res) => {

    console.log("Peticion recibida");

    res.status(200).send("Hola Mundo!");
});

app.listen(4000, () => {
    console.log("Escuchando en el puerto 4000");
}) // Para que el server empiece a escuchar por un puerto