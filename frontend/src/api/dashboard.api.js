const axios = require("axios")
const AuthService = require("../services/authService");

const getDashboardGridContent = () => {
    return axios({
        method: 'GET',
        url: 'http://localhost:4000/dashboard/getDashboardContent',
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`,
            "Content-Type": "application/json"
        },
    });
}

const getUserAccounts = (id) => {
    return axios({
        method: 'GET',
        url: `http://localhost:4000/dashboard/getUserAccounts`,
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`
        },
    });
}

const getUserPayments = (id) => {
    return axios({
        method: 'GET',
        url: `http://localhost:4000/dashboard/getUserPayments?id=${id}`,
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`
        },
    });
}

const createBillingDetails = (name, accountHolder, due) => {
    return axios({
        method: 'POST',
        url: 'http://localhost:4000/dashboard/createBillingDetails',
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`
        },
        data: {
            "name": name,
            "balance": due,
            "accountHolder": accountHolder
        }
    });
}

const deleteBillingAccount = (id) => {
    return axios({
        method: 'DELETE',
        url: 'http://localhost:4000/dashboard/deleteBillingDetails',
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`
        },
        data: {
            "id": id
        }
    });
}

module.exports = {
    getDashboardGridContent,
    createBillingDetails,
    getUserAccounts,
    getUserPayments,
    deleteBillingAccount
};