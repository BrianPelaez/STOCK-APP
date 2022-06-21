const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: { type:String, require: true },
    price: Number,
},
{timestamps: true} // FECHA DE CREACION Y ACTUALIZACION DE CADA DOCUMENTO
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product;