const axios = require('axios')
const Configs = require('./config')
const AuthService = require('../services/authService')
const url = Configs.url;

const getBudgetBreakdown = () => {
    return axios({
        method: 'GET',
        url: `${url}/budget/getBudgetBreakdown`,
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`,
            "Content-Type": "application/json"
        }
    });
}

module.exports = {
    getBudgetBreakdown
}