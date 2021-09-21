'use strict'
const config = require('../config/config')
const { verify } = require("jsonwebtoken")

function authenticateUser(req, res, next) {
    // get the token from the header
    const authHeader = req.headers['authorization']
    // extract the token from the string -- "bearer <token>"
    const token = authHeader && authHeader.split(' ')[1]

    // if the token does not exists within the header of the request
    if (token == null) return res.sendStatus(401)
    // try to verify the token
    verify(token, config.JWTSIGNATURE, (err, user) => {
        if (err) return res.status(403).json({ error:err })

        // if the token is successfully verified then assign the user to the req.user
        req.user = user

        next()
    })
}

module.exports = authenticateUser;
