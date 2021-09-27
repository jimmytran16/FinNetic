const axios = require('axios')
const Configs = require('./config')
const url = Configs.url;

const registerUser = (username, password, name) => {
    return axios({
        method: 'POST',
        url: `${url}/auth/register`,
        data: {
            "name": name,
            "username": username,
            "password":password
        }
    });
}

const loginUser = (username, password, name) => {
    return axios({
        
        method: 'POST',
        url: `${url}/auth/login`,
        data: {
            "username": username,
            "password":password
        }
    });
}

module.exports = { registerUser, loginUser };
