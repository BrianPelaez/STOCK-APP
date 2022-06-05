require('dotenv').config(); // Busca si hay un archivo con variables de entorno .env
const express = require('express');

const app = express();

app.get('/', (req, res) => {

    console.log("Peticion recibida");

    res.status(200).send("Hola Mundo!");
});

const PORT = process.env.PORT || 4000 // Para acceder a las variables de entorno .env o hardcodear puerto 4000

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
}) // Para que el server empiece a escuchar por un puerto