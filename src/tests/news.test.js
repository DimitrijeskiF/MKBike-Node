const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { expect } = chai;

const { server } = require('../index');

chai.use(chaiHttp);

let token;
let role;
let id;

describe('Events Routes', () => {
    const register = '/users';
    const login = '/login';
    const readProfile = '/users/me';
    const addNews = '/news';
    const deleteNews = '/news/'
    const getNews = '/news?limit=1&page1'

    const user = {
        firstName: 'Filip',
        lastName: 'Dimitrijeski',
        ages: 23,
        sex: 'Male',
        email: 'filip@gmail.com',
        password: '1234567',
        role: 'admin'
    }

    const news = {
        title: "Fixing Bikes",
        img: "bwchbwcwchjwhcbwhbwhcb",
        content: "Bikes will be not available next few days"
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

    describe('Add news', () => {
        it('Should add news as admin', async () => {
            try {
                const result = await chai
                    .request(server)
                    .post(addNews)
                    .send(news)
                    .set('Authorization', 'Bearer ' + token);
                expect(role).to.equal('admin')
                expect(result.status).to.equal(201)
            } catch (error) {
                throw new Error(error);
            }
        })
    })

    describe('Get News', () => {
        it('Should get all news', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get(getNews)
                    .set('Authorization', 'Bearer ' + token);
                    id = result.body.news[0]._id
                expect(result.status).to.equal(200)
            } catch (error) {
                throw new Error(error);
            }
        })
    });

    describe('Delete a news', () => {
        it('Should delete a news', async () => {
            try {
                const result = await chai
                    .request(server)
                    .delete(deleteNews + id)
                    .set('Authorization', 'Bearer ' + token);
                expect(result.status).to.equal(204);
                expect(role).to.equal('admin');
            } catch (error) {
                throw new Error(error);
            }
        })
    })
});