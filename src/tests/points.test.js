const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { expect } = chai;

const { server } = require('../index');

chai.use(chaiHttp);

let token;
let role;

describe('Events Routes', () => {
    const register = '/users';
    const login = '/login';
    const readProfile = '/users/me';
    const addPoint = '/points'
    const getPoints = '/points'

    const user = {
        firstName: 'Filip',
        lastName: 'Dimitrijeski',
        ages: 23,
        sex: 'Male',
        email: 'filip@gmail.com',
        password: '1234567',
        role: 'admin'
    }

    const point = {
        address: "Boulevard Mitropolit Teodosij Gologanov, 42 Skopje 1000"
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
            } catch (error) {
                throw new Error(error);
            }
        })
    });


    describe('Add Point', () => {
        it('Should add point as admin', async () => {
            try {
                const result = await chai
                    .request(server)
                    .post(addPoint)
                    .send(point)
                    .set('Authorization', 'Bearer ' + token);
                expect(result.status).to.equal(201);
                expect(role).to.equal('admin');
            } catch (error) {
                throw new Error(error);
            }
        })
    });

    describe('Get Point', () => {
        it('Should get point', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get(getPoints)
                    .set('Authorization', 'Bearer ' + token);
                expect(result.status).to.equal(200);
            } catch (error) {
                throw new Error(error);
            }
        })
    });
});