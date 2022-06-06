require('dotenv').config(); // Busca si hay un archivo con variables de entorno .env
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const axios = require('axios') // Fetch de lado de servidor

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

// IMPRIMIR DEL LADO DEL SERVIDOR
app.get('/', (req, res, next) => {
    const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon" // + { id o nombre }
    

        axios(`${POKE_API_URL}/`+1)
        .then((response) => {
            
            const pokemon = response.data; 
            console.log(pokemon)
            const html = `
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <!-- CSS Start -->
                <link rel="stylesheet" href="style.css">
                <!-- CSS End-->
                <title>Document</title>
            </head>
            <body>
                <h1>App de productos</h1>
                <a href="about.html">About</a>
                <div class="form-container">
                    <input type="text" id="productName" placeholder="Nombre del producto...">
                    <input type="number" id="productPrice" placeholder="Precio...">
                    <button>Crear Producto</button>
                </div>
            
                <h2>Listado de Productos</h2>
            
                <div class="pokemon-container">
                    <div class="poke-card">
                        <h3>${pokemon.name}</h3>
                        <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}">
                        <span>#${pokemon.id}</span>
                    </div>
                </div>
                <script src="script.js"></script>
            </body>
            `
            res.send(html)
        })
            
});

app.use(express.static(path.join(__dirname, 'public'))); // Hace que todo el contenido de la carpeta public este disponible en la WEB
                                                        // EJ: C:/USER/STOCK-APP/BACKEND/PUBLIC

const PORT = process.env.PORT || 4000 // Para acceder a las variables de entorno .env o hardcodear puerto 4000

