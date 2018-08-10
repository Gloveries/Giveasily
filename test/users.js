var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('CRUD for users resources', function () {

    var userId = "";
    var token = "";
    before(function () {
        chai.request(app)
            .delete('/users/')
    });

    it('Create new users', function (done) {
        chai.request(app)
            .post('/users/register')
            .send({
                "username": "sam",
                "name": "JOseph",
                "email": "j@g.com",
                "password": "j",
                "role": "author",
                "purchased": "",
                "address": "",
                "personal_phone": "08045473747"
            })
            .end(function(err, res) {
                userId = res.body._id;
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.be.a('string');
                expect(res.body.message).to.equal('registeration succesful');
                done();
            });
    });

    it('Login With Correct User Credentials', function (done) {
        chai.request(app)
            .post('/users/login')
            .send({
    "email": "j@g.com",
    "username": "sam",
    "password": "j"
})
            .end(function (err, res) {
                token = res.body.token;
                console.log(res.body)
                expect(res.body).to.have.property('token');
                expect(res.body.token).to.be.a('string');
                expect(res.body).to.have.property('completed_registeration');
                done();
            });
    });


    it('Login With Incorrect User Credentials', function (done) {
        chai.request(app)
            .post('/login')
            .send({
                email: "ben@gmail.com",
                password: "johnm"
            })
            .end(function (err, res) {
                console.log(res.body)
                expect(res.body).to.have.property('err');
                expect(res.body.err).to.be.a('object');
                expect(res.body.err.name).to.equal('IncorrectUsernameError');
                expect(res.body.err.message).to.equal("Password or username is incorrect")


                done();
            });
    });

    // it('Delete User', function (done) {
    //     chai.request(app)
    //     .delete('/users/'+userId)
    //     .set('Authorization', 'Bearer '+token)
    //     .end(function (err, res) {
    //         expect(res.status).to.be.equal(200);
    //         done();
    //     });
    // });

});
