require('dotenv').config(); // Busca si hay un archivo con variables de entorno .env
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');

const app = express();


// BASE DE DATOS
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PW}@development.sai65.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
    )
    .then( (result) => {
        app.listen(PORT, () => {
            console.log(`Escuchando en el puerto ${PORT}`);
        }) // Para que el server empiece a escuchar por un puerto
        console.log("Conexión exitosa a DB")
    })
    .catch((err) => console.log(err));


const productSchema = mongoose.Schema({
    name: { type:String, require: true },
    price: Number,
},
{timestamps: true} // FECHA DE CREACION Y ACTUALIZACION DE CADA DOCUMENTO
)

const Product = mongoose.model('Product', productSchema)

// BASE DE DATOS

app.use(express.json()); // Parsea los request para que permita JSON

app.post('/api/v1/products', async (req, res) => {
    console.log("Peticion recibida - Consola de servidor");
    console.log({ body: req.body});
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price
    })

    await newProduct.save()
    res.status(201).json({ok: true});
});

/*app.get('/', (req, res, next) => {
    console.log("Peticion recibida - Consola de servidor");
    next(); // Para que la logica continue con el siguiente Middleware (app.use())
});*/

app.use(express.static(path.join(__dirname, 'public'))); // Concatena la direccion de la ruta root de app.js con /public sin importar el S.O. ( '\' o '/' )
                                                        // EJ: C:/USER/STOCK-APP/BACKEND/PUBLIC

const PORT = process.env.PORT || 4000 // Para acceder a las variables de entorno .env o hardcodear puerto 4000

