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
        .post('/users')
        .send({
            name: "Sam Foo",
            email: "sam@gmail.com",
            password: "sam",
            role: "author"
        })
        .end(function (err, res) {
            userId = res.body._id;
            expect(res.body).to.have.property('_id');
            done();
        });
    });

    it('Login With Correct User Credentials', function (done) {
        chai.request(app)
        .post('/login')
        .send({
            email: "ben@gmail.com",
            password: "john"
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
