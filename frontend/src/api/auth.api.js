const axios = require('axios')
// const url = '10.0.0.108:4000'
const url = 'localhost:4000'

const registerUser = (username, password, name) => {
    return axios({
        method: 'POST',
        url: `http://${url}/auth/register`,
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
        url: `http://${url}/auth/login`,
        data: {
            "username": username,
            "password":password
        }
    });
}

module.exports = { registerUser, loginUser };
