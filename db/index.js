const mongoose = require('mongoose')

// BASE DE DATOS

const dbConnect = (app) =>{

    mongoose.connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PW}@${process.env.MONGO_DB_CLUSTER_NAME}.hnaaw.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
        )
        .then( (result) => {
            const PORT = process.env.PORT || 4000 // Para acceder a las variables de entorno .env o hardcodear puerto 4000
            app.listen(PORT, () => {
                console.log(`Escuchando en el puerto ${PORT}`);
            }) // Para que el server empiece a escuchar por un puerto
            console.log("Conexión exitosa a DB")
        })
        .catch((err) => console.log(err));

}



module.exports = dbConnect;
