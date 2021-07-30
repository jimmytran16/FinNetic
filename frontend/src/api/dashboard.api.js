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

module.exports = { getDashboardGridContent, createBillingDetails }