const express = require("express");
const cors = require('cors')

const app = express()

app.use(cors());
require("dotenv").config(0);

const database = require('./config/database');

const userRoute = require('./routes/user');  

app.use(express.json());

database();

app.use('/api/user', userRoute);

app.listen(process.env.PORT || 3000, (err) => {
    err ? console.log(err) : console.log('server in running')
})

