const axios = require('axios')
const Configs = require('./config')
const AuthService = require('../services/authService')
const url = Configs.url;

const getUserInfo = () => {
    return axios({
        method: 'GET',
        url: `${url}/settings/getUser`,
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`,
            "Content-Type": "application/json"
        }
    });
}

const getUserAccounts = () => {
    return axios({
        method: 'GET',
        url: `${url}/settings/getAccounts`,
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`,
            "Content-Type": "application/json"
        }
    });
}

const updateAccountSendReminder = (accountId, sendReminder) => {
    return axios({
        method: 'PUT',
        url: `${url}/settings/updateSendReminder`,
        data : {
            accountId: accountId,
            sendReminder: sendReminder
        },
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`,
            "Content-Type": "application/json"
        }
    });
}

module.exports = { getUserInfo, getUserAccounts, updateAccountSendReminder };
