const Product = require("../models/product");

const createProduct = async (req, res) => {
    try {
        console.log(req.body);
        const product = new Product(req.body);

        const {name} = req.body;
        const exist = await Product.findOne({name});

        if (exist) res.status(400).send({error: "product already exists"});
        const newProduct = await product.save();
        return res.status(201).json(newProduct);
        
    } catch (error) {
        console.log (error)
    }
};

const getProducts = async (req, res) => {

    try{
        const productsList = await Product.find();

        res.json(productsList);
    } catch (error) {
        console.log("Error :", error);
    }

}

const getProduct = async (req, res) => {

    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        res.json(product);
    } catch (error) {
        console.log("Error : ", error);
    }
}

const removeProduct = async (req, res) => {

    try {
        const productId = req.params.id;
        const check_product = await Product.findById(productId);

        check_product ? await check_product.deleteOne() : res.status(400).json({
            msg: "Product not found"
        })
        returnres.status(201).json(
            {
                msg: "Product successfully deleted",
                product: Product
            }
        );
    } catch (error) {
        console.log("Error : ", error);
    }
}

const updateProduct = async (req,res) => {
    try {
        const productId = req.params.id;
        const updateProductInfo = res.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(400).json({ msg: "Product not found" })
        }
        await product.updateOne(updateProductInfo);

        const updatedProduct = await Product.findById(productId);

        return res.status(201).json({
            msg: "Product successfully updated",
            Product: updatedProduct
        });
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}
module.exports = {
    createProduct,
    getProducts,
    getProduct,
    removeProduct,
    updateProduct,
}