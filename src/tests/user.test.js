const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { expect } = chai;

const {server} = require('../index');

chai.use(chaiHttp);

let token;

describe('User Routes', () => {
    const register = '/users';
    const login = '/login';

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
            .send(user);
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
                console.log('Result ' + result.body);
                expect(result.status).to.equal(201);
                // expect(result.body).not.to.be.empty;
            } catch (error) {
                console.log(error);
            }
        });
    });

    describe('Login', (done) => {
        it('should return 201 and our token', async () => {
            try {
                const result = await chai
                    .request(server)
                    .post(login)
                    .send({
                        email: 'filip@gmail.com',
                        password: '1234567',
                    });
                expect(result.status).to.be.equal(201);
                expect(result.body).not.to.be.empty;
                expect(result.body).to.have.property('token');
            } catch (error) {
                throw new Error(error);
            }
        });
    });
});