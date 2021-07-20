const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { expect } = chai;

const { server } = require('../index');

chai.use(chaiHttp);

let token;
let role;
let position;

describe('Events Routes', () => {
    const register = '/users';
    const login = '/login';
    const readProfile = '/users/me';
    const addPrice = '/prices';
    const getPricesForYoung = '/prices/young'
    const getPricesForWorker = '/prices/worker'
    const getPricesForRetiree = '/prices/retiree'

    const user = {
        firstName: 'Filip',
        lastName: 'Dimitrijeski',
        ages: 23,
        sex: 'Male',
        email: 'filip@gmail.com',
        password: '1234567',
        role: 'admin'
    }

    const price = {
        type: "young",
        prices: [
            {
                day: 100,
                month: 400,
                year: 4000
            }
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

    describe('Get Role', () => {
        it('Should get my role of logged in user', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get(readProfile)
                    .set('Authorization', 'Bearer ' + token);
                expect(result.status).to.equal(200);
                role = result.body.user.role;
                position = result.body.user.position;
            } catch (error) {
                throw new Error(error);
            }
        })
    });

    describe('Add Price', () => {
        it('Should add new event as admin', async () => {
            try {
                const result = await chai
                    .request(server)
                    .post(addPrice)
                    .send(price)
                    .set('Authorization', 'Bearer ' + token);
                expect(role).to.equal('admin')
                expect(result.status).to.equal(201)
            } catch (error) {
                throw new Error(error);
            }
        })
    })

    describe('Get Prices for Young', () => {
        it('Should get prices for young people', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get(getPricesForYoung)
                expect
                expect(result.status).to.equal(200)
                expect(position).to.equal('young')
            } catch (error) {
                throw new Error(error);
            }
        })
    })

    describe('NO PRICES FOR WORKERS', () => {
        it('Should get 400 status and position not to be worker', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get(getPricesForWorker)
                expect
                expect(result.status).to.equal(400)
                expect(position).not.to.equal('worker')
            } catch (error) {
                throw new Error(error);
            }
        })
    })

    describe('NO PRICES FOR RETIREE', () => {
        it('Should get 400 status and position not to be retiree', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get(getPricesForRetiree)
                expect
                expect(result.status).to.equal(400)
                expect(position).not.to.equal('retiree')
            } catch (error) {
                throw new Error(error);
            }
        })
    })
});