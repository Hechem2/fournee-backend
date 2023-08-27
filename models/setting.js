const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const settingSchema = new Schema(
{
    address: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    openingHour: {
        type: Number,
        required: true,
    },
},
{
    timestamps: true
}
)

module.exports = Setting = model("Setting", settingSchema );