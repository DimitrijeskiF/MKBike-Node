const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { expect } = chai;

const { server } = require('../index');

chai.use(chaiHttp);

let token;

describe('Events Routes', () => {
    const register = '/users';
    const login = '/login';
    const sendEventNotification = '/notification/event';
    const sendNewsNotification = '/notification/news';

    const user = {
        firstName: 'Filip',
        lastName: 'Dimitrijeski',
        ages: 23,
        sex: 'Male',
        email: 'filip@gmail.com',
        password: '1234567',
        role: 'admin',
        fcmTokens: [
            "eUneyJ2Tv3TdrGJf_qwKqF:APA91bFcyB0z-OazpxUjU82dK7-OXQH1Q5ls78KXZVBIZMr27KhTF7VBfYZ-ovAr3SUql2hCrv9XPf5FgNYUmIj56BvDAtkXQzt6HwrQdLiReA4OD7EgEKZgqnlq2pAWOVJKvc9Bef4C"
        ]
    }

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

    describe('Event Notification', () => {
        it('Should send notification when event is created!', async () => {
            try {
                const result = await chai
                    .request(server)
                    .post(sendEventNotification)
                    .set('Authorization', 'Bearer ' + token);
                expect(result.body.success).to.equal(true);
            } catch (error) {
                console.log(error);
            }
        })
    })

    describe('News Notification', () => {
        it('Should send notification when news are created!', async () => {
            try {
                const result = await chai
                    .request(server)
                    .post(sendNewsNotification)
                    .set('Authorization', 'Bearer ' + token);
                expect(result.body.success).to.equal(true);
            } catch (error) {
                console.log(error);
            }
        })
    })
});