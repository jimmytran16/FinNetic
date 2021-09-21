"use strict"

const mongoose = require('mongoose')
const config =  require('../config/config')

require('dotenv').config()
var dbUri = (config.NODE_ENV !== 'production')
                ? config.DB_DEV_URI
                : config.DB_URI

const connect = () => {
    mongoose.connect(dbUri, 
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, 
        (err) => { (err) ? console.log(err) : console.log("successfully connected to DB") });
}

module.exports = { connect }