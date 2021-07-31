const axios = require("axios")

const getDashboardGridContent = () => {
    return axios({
        method: 'GET',
        url: 'http://localhost:4000/dashboard/getDashboardContent',
        headers : {
            "Authorization":"YAHHHH"
        },
    });
}

const getUserAccounts = (id) => {
    return axios({
        method: 'GET',
        url: `http://localhost:4000/dashboard/getUserAccounts?id=${id}`,
        headers : {
            "Authorization":"YAHHHH"
        },
    });
}

const getUserPayments = (id) => {
    return axios({
        method: 'GET',
        url: `http://localhost:4000/dashboard/getUserPayments?id=${id}`,
        headers : {
            "Authorization":"YAHHHH"
        },
    });
}

const createBillingDetails = (name, due) => {
    console.log(name,due)
    return axios({
        method: 'POST',
        url: 'http://localhost:4000/dashboard/createBillingDetails',
        headers : {
            "Authorization":"YAHHHH"
        },
        data: {
            "name": name,
            "due": due
        }
    });
}

module.exports = { getDashboardGridContent, createBillingDetails, getUserAccounts, getUserPayments }