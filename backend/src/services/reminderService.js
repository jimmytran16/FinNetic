const axios = require('axios')

module.exports = class ReminderService {

    constructor() { }

    async saveAccountToQueue(payload, cb) {
        console.log(payload)
        var url = 'http://localhost:4001/api/scheduler/addAccountToQueue'
        var data = {
            "payload": payload
        }
        try {
            let response = await axios.post(url,data);
            return cb(null,response.data);
        }catch(err) {
            return cb(err,null);
        }
    }

    async getAllAccounts(userId, cb) {
        var url = `http://localhost:4001/api/scheduler/getUserAccounts/${userId}`
        try {
            let response = await axios.get(url);
            return cb(null,response.data.message);
        }catch(err) {
            return cb(err,null);
        }
    }
}
