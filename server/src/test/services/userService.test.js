const User = require('../../models/users');
const UserService = require('../../services/userService');
const AuthService = require('../../services/authService');
const mongoose = require('mongoose');
const config = require('../../config/config');

const expect = require('chai').expect;

describe('TEST USER SERVICE' , () => {
    const dbUriTest = config.DB_TEST;
    const userService = new UserService();
    const authService = new AuthService();
    var userId = '';

    before(async () => {
        await mongoose.connect(dbUriTest, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        let result = await createUserAccount();
        userId = result._id;
    })

    after(async () => {
        await User.deleteMany({});
        await mongoose.disconnect()
    })
    
    // get user from database and check username and name 
    it('Get the user from the database',  async () => {
        let result = await getUser(userId);
        expect(result.username).equals('jimmy@gmail.com');
        expect(result.name).equals('Jimmy Tran');
    })   
    
    // update the user and then retrieve to check that the name is updated
    it('Update user and then retrieve',  async () => {
        await updateUser(userId, { name: 'John Doe' });
        let updatedResult = await getUser(userId);
        expect(updatedResult.name).equals('John Doe');
    })

    async function getUser(id) {
        return new Promise((resolve,reject) => {
            userService.getUser(id, (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            })
        })
    }

    async function updateUser(id, update) {
        return new Promise((resolve,reject) => {
            userService.updateUser(id, update, (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            })
        })
    }

    async function createUserAccount() {
        return new Promise((resolve,reject) => {
            const payload = {
                name: 'Jimmy Tran',
                username: 'jimmy@gmail.com',
                password: 'testing'
            };

            authService.registerUser(payload, (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            })
        })
    }
})
