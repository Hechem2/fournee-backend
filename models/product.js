const mongoose = require("mongoose");
const {Schema, model} = mongoose;


const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true, 
        },
        description: {
            type: String,
            required: true,
        },


    },
    {
        timestamps: true
    }

);

module.exports = Product = model("Product", productSchema );