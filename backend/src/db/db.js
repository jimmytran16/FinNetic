"use strict"

const mongoose = require('mongoose')
require('dotenv').config()
var db_uri = (process.env.NODE_ENV !== 'production')
                ? process.env.DB_DEV_URI
                : process.env.DB_URI

const connect = () => {
    mongoose.connect(db_uri, 
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, 
        (err) => { (err) ? console.log(err) : console.log("successfully connected to DB") });
}

module.exports = { connect }