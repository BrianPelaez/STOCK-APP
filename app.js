require('dotenv').config(); // Busca si hay un archivo con variables de entorno .env
const express = require('express');
const dbConnect = require('./db')
const cors = require('cors'); // Cross Origin 
const app = express();
const productRouter = require('./routes/product.route')
dbConnect(app);

app.use(cors({ origin: true }));

app.use(express.json()); // Parsea los request para que permita JSON

app.use('/api/v1/products', productRouter); // Permite crear peticiones en la ruta pasada.
//app.use('/api/v1/users', userRouter); // Permite crear peticiones en la ruta pasada.

//app.use(express.static(path.join(__dirname, 'public'))); // Hace que todo el contenido de la carpeta public este disponible en la WEB
                                                            // EJ: C:/USER/STOCK-APP/BACKEND/PUBLIC