const axios = require('axios')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

module.exports = class ReminderService {

    constructor() {
        this.baseUrl = (process.env.NODE_ENV !== 'production')
            ? process.env.REMINDER_DEV_URI
            : process.env.REMINDER_URI
    }

    async saveAccountToQueue(payload, cb) {
        var url = `${this.baseUrl}/api/scheduler/addAccountToQueue`
        var data = {
            "payload": payload
        }
        try {
            let response = await axios.post(url, data);
            return cb(null, response.data);
        } catch (err) {
            return cb(err, null);
        }
    }

    async getAllAccounts(userId, cb) {
        var url = `${this.baseUrl}/api/scheduler/getUserAccounts/${userId}`
        try {
            let response = await axios.get(url);
            return cb(null, response.data.message);
        } catch (err) {
            return cb(err, null);
        }
    }

    async updateSendReminder(userId, accountId, sendReminder, cb) {
        var data = {
            userId: userId,
            accountId: accountId,
            sendReminder: sendReminder
        }
        var url = `${this.baseUrl}/api/scheduler/updateSendReminderOption`
        try {
            let response = await axios.put(url, data);
            return cb(null, response.data.message);
        } catch (err) {
            return cb(err, null);
        }
    }

    updateQueuePhoneNumber(userId, phone) {
        return new Promise(async (resolve, reject) => {
            var data = {
                userId: userId,
                phone: phone
            }
            var url = `${this.baseUrl}/api/scheduler/updateQueuePhoneNumbers`
            try {
                let response = await axios.put(url, data);
                if (response.data.sucess)
                    return resolve(respones.data.message);
                else
                    return reject(response.data.message);
            } catch (err) {
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
            var url = `${this.baseUrl}/api/scheduler/deleteAccountInQueue`
            try {
                let response = await axios.delete(url, data);

                if (response.data.success)
                    return resolve(response.data.message);
                else
                    return reject(response.data.message);
            } catch (err) {
                return reject(err.toString());
            }
        })
    }
}
