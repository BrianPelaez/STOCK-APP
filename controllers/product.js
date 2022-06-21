const Product = require('../models/product')

const getProducts = async (req, res) => {
    const products = await Product.find();

    res.status(200).json({ok: true, data: products});
}

const createProduct = async (req, res) => {
    if (!req.body.name){
        res.status(400)
        .json({
            ok:false,
            message: "El campo Nombre es obligatorio"
        })
        return
    }
    console.log("Peticion recibida - Consola de servidor");
    console.log({ body: req.body});
    //const newProduct = new Product(req.body)
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price
    })

    await newProduct.save()
    res.status(201).json({ok: true});
}

module.exports = {getProducts, createProduct};