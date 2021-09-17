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

    async updateSendReminder(userId, accountId, sendReminder, cb) {
        var data = {
            userId: userId,
            accountId: accountId,
            sendReminder: sendReminder
        }
        var url = 'http://localhost:4001/api/scheduler/updateSendReminderOption'
        try {
            let response = await axios.put(url, data);
            return cb(null,response.data.message);
        }catch(err) {
            return cb(err,null);
        }
    }

    updateQueuePhoneNumber(userId, phone) {
        return new Promise(async (resolve, reject) => {
            var data = {
                userId: userId,
                phone: phone
            }
            var url = 'http://localhost:4001/api/scheduler/updateQueuePhoneNumbers'
            try {
                let response = await axios.put(url, data);
                if (response.data.sucess) 
                    return resolve(respones.data.message);
                else
                    return reject(response.data.message);
            }catch(err) {
                return reject(err.toString())
            }
        })
    }

    deleteAccountFromQueue(accountId) {
        return new Promise(async (resolve, reject) => {
            var data = {
                data: {
                        accountId: accountId,
                }
            }
            var url = 'http://localhost:4001/api/scheduler/deleteAccountInQueue'
            try {
                let response = await axios.delete(url, data);

                if (response.data.success) 
                    return resolve(response.data.message);
                else 
                    return reject(response.data.message);
            }catch(err) {
                return reject(err.toString());
            }
        })
    }
}
