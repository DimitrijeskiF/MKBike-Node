const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { expect } = chai;
const fs = require('fs')


const { server } = require('../index');

chai.use(chaiHttp);

let token;
let id;

describe('User Routes', () => {
    const register = '/users';
    const login = '/login';
    const readProfile = '/users/me';
    const fcmToken = '/users/fcmToken'

    const user = {
        firstName: 'Filip',
        lastName: 'Dimitrijeski',
        ages: 23,
        sex: 'Male',
        email: 'filip@gmail.com',
        password: '1234567',
        role: 'user'
    }

    const preSave = {
        firstName: 'Filip',
        lastName: 'Dimitrijeski',
        ages: 23,
        sex: 'Male',
        email: 'filip2@gmail.com',
        password: '1234567',
        role: 'user'
    }

    before(async () => {
        const result = await chai
            .request(server)
            .post(register)
            .send(preSave);
        expect(result.status).to.equal(201);
    });

    after('droping test db', async () => {
        await mongoose.connection.dropDatabase(() => {
            console.log('\n Test database dropped');
        });
        await mongoose.connection.close();
    });


    describe('Register', () => {
        it('should crete new user if email not found', async () => {
            try {
                const result = await chai
                    .request(server)
                    .post(register)
                    .send(user);
                expect(result.status).to.equal(201);
            } catch (error) {
                console.log(error);
            }
        });
    });

    describe('Login', () => {
        it('should return 201 and our token', async () => {
            try {
                const result = await chai
                    .request(server)
                    .post(login)
                    .send({
                        email: 'filip@gmail.com',
                        password: '1234567',
                    });
                expect(result.status).to.equal(201);
                expect(result.body).not.to.be.empty;
                expect(result.body).to.have.property('token');
                token = result.body.token;
            } catch (error) {
                throw new Error(error);
            }
        });
    });

    describe('My Profile', () => {
        it('Should get my profile', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get(readProfile)
                    .set('Authorization', 'Bearer ' + token);
                role =  result.body.user.role;
                expect(result.status).to.equal(200);
                id = result.body.user._id
            } catch (error) {
                throw new Error(error);

            }
        })
    })

    describe('Fcm Token', () => {
        it('Should set fcmToken', async () => {
            try {
                const result = await chai
                    .request(server)
                    .post(fcmToken)
                    .send({
                        fcmToken: 'dhLkJj3mqswzXoyJnfsGinsYA3lGqkzAfDaUPlIGHRphl'
                    })
                    .set('Authorization', 'Bearer ' + token);
                expect(result.status).to.equal(201);
            } catch (error) {
                throw new Error(error);
            }
        })
    })

    describe('Upload Image', () => {
        it('Should upload profile picture', async () => {
            try {
                const result = await chai
                    .request(server)
                    .put('/users/' + id + '/photo')
                    .set('Content-Type', 'multipart/form-data')
                    .attach('file','./test.jpg')
                    .set('Authorization', 'Bearer ' + token)
                expect(result.status).to.equal(200);
            } catch (error) {
                throw new Error(error)
            }
        })
    })
});