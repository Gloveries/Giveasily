var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);

describe('CRUD for users resources', function () {

    var userId = "";
    var token = "";

    it('Create new users', function (done) {
        chai.request(app)
            .post('/users/register')
            .send({
                "name": "JOseph",
                "email": "j@g.com",
                "password": "j",
                "role": "author",
                "purchased": "",
                "address":"",
                "personal_phone":"08045473747"
            })
            .end(function (err, res) {
                userId = res.body._id;
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('salt')
                expect(res.body).to.have.property('halt');


                done();
            });
    });

    it('Login With Correct User Credentials', function (done) {
        chai.request(app)
            .post('/users/login')
            .send({
                email: "sam@gmail.com",
                password: "sam"
            })
            .end(function (err, res) {
                token = res.body.token;
                // expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('salt');
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
                expect(res.body).to.have.property('error');
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
