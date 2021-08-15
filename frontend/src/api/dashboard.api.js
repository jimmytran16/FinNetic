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
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`,
            "Content-Type": "application/json"
        },
    });
}

const createBillingDetails = (name, accountHolder, due) => {
    return axios({
        method: 'POST',
        url: 'http://localhost:4000/dashboard/createBillingDetails',
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`,
            "Content-Type": "application/json"
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
        url: `http://localhost:4000/dashboard/getUserPayments`,
        headers: {
            "Authorization": `Bearer ${AuthService.default.getTokenFromStore()}`,
            "Content-Type": "application/json"
        },
    });
}

const createUserPayment = (accountId, accountName, payment, date) => {
    return axios({
        method: 'POST',
        url: `http://localhost:4000/dashboard/createUserPayment`,
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
