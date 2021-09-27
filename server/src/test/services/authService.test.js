require('dotenv').config()
const AuthService = require('../../services/authService')
const User = require('../../models/users')
const mongoose = require('mongoose')
const config = require('../../config/config')

let chai = require('chai');
let expect = chai.expect;

describe('TEST AUTH SERVICE', () => {
    const dbUriTest = config.DB_TEST
    const authService = new AuthService()
    const name = "Jimmy Tran"
    const username = "jimmy@gmail.com"
    const password = "thisisthepassword"

    before(async () => {
        await mongoose.connect(dbUriTest, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    })

    after(async () => {
        await User.deleteMany({});
        await mongoose.disconnect();
    })

    it('Register account', async () => {
        let result = await registerUser({ name: name, username: username, password: password });
        expect(result.username).equals('jimmy@gmail.com')
    })

    it('Login account', async () => {
        let result = await loginUser(username, password);
        expect(result).to.have.property('accessToken')
        expect(result).to.have.property('user')
        expect(result.isAuth).equals(true);
    })

    async function registerUser(payload) {
        return new Promise((resolve, reject) => {
            authService.registerUser(payload, (err, result) => {
                if (err) return reject(err);
                return resolve(result)
            })
        })
    }

    async function loginUser(username, passowrd) {
        return new Promise((resolve, reject) => {
            authService.loginUser(username, password, (err, result) => {
                if (err) return reject(err);
                return resolve(result)
            })
        })
    }
})