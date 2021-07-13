const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
var User = require('../models/user');
chai.use(chaiHttp);

const server = require('../index')


describe('User API', function () {
    beforeEach(function (done) {
        var newUser = new User({
            'firstName': 'Filip',
            'lastName': 'Dimitrijeski',
            'sex': 'Male',
            'ages': 23,
            'email': 'filip@gmail.com',
            'password': 'filip123',
            'role': 'Admin'
        });
        newUser.save(function (err) {
            done();
        });
    });

    afterEach(function (done) {
        User.collection.drop().then(function () {
            // success
        }).catch(function () {

            // error handling
            console.warn(' collection may not exists!');
        })
        done();
    });


    it('Should register User', function (done) {
        chai.request(server)
            .post('/users')
            .send({
                'firstName': 'Filip',
                'lastName': 'Dimitrijeski',
                'sex': 'Male',
                'ages': 23,
                'email': 'filip2@gmail.com',
                'password': 'filip123',
                'role': 'user'
            })
            .end((err, res) => {
                res.should.have.status(201)
                done()
            })
    })

    it('Should login User', function () {
        chai.request(server)
            .post('/login')
            .send({
                'email': 'filip2@gmail.com',
                'password': 'filip123',
            })
            .end(function (err, res){
                res.body.should.have.property('token');
                let token = res.body.token;
                console.log('token: ' + token);
                done();
            })
    })
});