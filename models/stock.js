const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const stocksSchema = new Schema(
    {
        quantity: {
            type: Number,
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true ,
        }
        
    },
    {
        timestamps: true
    }
)
module.exports = stock = model("Stock", stockSchema );