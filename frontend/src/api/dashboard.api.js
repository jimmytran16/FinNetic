const axios = require("axios")
const AuthService = require("../services/authService");
const Configs = require('./config')
const url = Configs.url;

const getDashboardGridContent = () => {
    return axios({
        method: 'GET',
        url: `${url}/dashboard/getDashboardContent`,
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`,
            "Content-Type": "application/json"
        },
    });
}

const getUserAccounts = (id) => {
    return axios({
        method: 'GET',
        url: `${url}/dashboard/getUserAccounts`,
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`,
            "Content-Type": "application/json"
        },
    });
}

const createBillingDetails = (name, balance, accountDueDay) => {
    return axios({
        method: 'POST',
        url: `${url}/dashboard/createBillingDetails`,
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`,
            "Content-Type": "application/json"
        },
        data: {
            "name": name,
            "balance": balance,
            "accountHolder": AuthService.default.getUserNameFromStore(),
            "accountDueDay": accountDueDay
        }
    });
}

const deleteBillingAccount = (id) => {
    return axios({
        method: 'DELETE',
        url: `${url}/dashboard/deleteBillingDetails`,
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`,
            "Content-Type": "application/json"
        },
        data: {
            "id": id
        }
    });
}

const getUserPayments = () => {
    return axios({
        method: 'GET',
        url: `${url}/dashboard/getUserPayments`,
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`,
            "Content-Type": "application/json"
        },
    });
}

const createUserPayment = (accountId, accountName, payment, date) => {
    return axios({
        method: 'POST',
        url: `${url}/dashboard/createUserPayment`,
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`,
            "Content-Type": "application/json"
        },
        data: {
            "name": accountName,
            "accountId": accountId,
            "accountName": AuthService.default.getUserNameFromStore(),
            "amountPaid": payment,
            "paymentDate": date
        }
    });
}

module.exports = {
    getDashboardGridContent,
    createBillingDetails,
    getUserAccounts,
    getUserPayments,
    deleteBillingAccount,
    createUserPayment
};
