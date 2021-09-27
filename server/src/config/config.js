'use strict'
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// all environment variables
module.exports = {
    DB_URI: process.env.DB_URI,
    DB_DEV_URI: process.env.DB_DEV_URI,
    DB_TEST: process.env.DB_TEST,
    REMINDER_DEV_URI: process.env.REMINDER_DEV_URI ,
    REMINDER_URI: process.env.REMINDER_URI,
    JWTSIGNATURE: process.env.JWTSIGNATURE,
    TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION,
    NODE_ENV: process.env.NODE_ENV
}