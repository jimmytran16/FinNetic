"use strict"

const mongoose = require('mongoose')
require('dotenv').config()

const connect = () => {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => { (err) ? console.log(err) : console.log("successfully connected to DB") });
}

module.exports = { connect }