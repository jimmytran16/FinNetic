"use strict"

const mongoose = require('mongoose')
const config = require('../config/config')

require('dotenv').config()
var dbUri = (config.NODE_ENV !== 'production')
    ? config.DB_DEV_URI
    : config.DB_URI

var dbType = (config.NODE_ENV !== 'production') ? 'dev' : 'prod';

const connect = () => {
    mongoose.connect(dbUri,
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
        (err) => { (err) ? console.log(err) : console.log("successfully connected to DB " + dbType) });
}

module.exports = { connect }