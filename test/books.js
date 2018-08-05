var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);


describe('CRUD for books resources', function () {

    var id = "";

    it('Create new book', function (done) {
        chai.request(app)
        .post('/books')
        .send({
            title: 'Intro to testing',
            isbn: '1234',
            description: "Some random books",
            price: 2000,
            userId: '5b5eeeb3c83f5186c9eb0542'
        })
        .end(function (err, res) {
            if (err) console.error(err);            
            id = res.body._id;
            expect(res.body).to.have.property('_id');
            done();
        });
    });

    it('Get One Book', function (done) {
        chai.request(app)
        .get('/books/'+id)
        .end(function (err, res) {
            expect(res.body[0].title).to.be.equal('Intro to testing');
            done();
        });
    });

    it('Get All Books', function (done) {
        chai.request(app)
        .get('/books')
        .end(function (err, res) {
            expect(res.body.length).to.be.greaterThan(0)
            done();
        });
    });

    it('Update One Book', function (done) {
        chai.request(app)
        .put('/books/'+id)
        .send({
            title: 'New Edition Testing'
        })
        .end(function (err, res) {
            expect(res.body.title).to.be.equal('New Edition Testing');
            done();
        });
    });

    it('Delete One Book', function (done) {
        chai.request(app)
        .delete('/books/'+id)
        .end(function (err, res) {
            expect(res.status).to.be.equal(200);
            done();
        });
    });

});
