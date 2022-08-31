const chai = require('chai');
const chaihttp = require('chai-http');

const app = require('../index');
const query = require('../db/movies');
const should = chai.should();

chai.use(chaihttp);

const testMovie = {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972
}

// First test-case (add movie to database):
describe('/POST movies', () => {
    beforeEach((done) => {
        query.deleteAllMovies();
        done();
    })

    it('Add new movie', (done) => {
        chai.request(app) // Starts the server (listening incoming requests)
            .post('/api/movies') // Add new movie, as test, so using object: "chai.request().post(/*MY_ENDPOINT*/)"
            .set('Content-Type', 'application/json') // Request headers (similar to what used in Postman/RapidAPI)
            .send(JSON.stringify(testMovie)) // Send the request (in JSON string format)
            // .end finally sends it and callback-function is called when response arrives
            .end((err, res) => {
                // should is a chainable assertion style from chai-library that checks that response is correct
                res.should.have.status(200); 
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                done();
            });
    });
});

// Second test-case (fetch from database):
describe('/GET movies', () => {
    it('Fetch all movies', (done) => {
        chai.request(app) // Starts the server (listening incoming requests)
            .get('/api/movies') // Add new movie, as test, so using object: "chai.request().post(/*MY_ENDPOINT*/)"
            // .end finally sends it and callback-function is called when response arrives
            .end((err, res) => {
                // should is a chainable assertion style from chai-library that checks that response is correct
                res.should.have.status(200); 
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
        });
    });
});