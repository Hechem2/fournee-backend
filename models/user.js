const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

module.exports = User = model("User", userSchema );