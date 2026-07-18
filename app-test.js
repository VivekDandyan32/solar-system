let mongoose = require("mongoose");
let server = require("./app");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion 
chai.should();
chai.use(chaiHttp); 

describe('Planets API Suite', () => {

    // --- NEW SEEDING LOGIC ---
    // This hook runs once before any of the 'it' blocks execute.
    // It clears the database and inserts exactly what your API expects.
    before(async function() {
        // We use the raw connection to bypass needing the exact Model path
        const collection = mongoose.connection.collection('planets');
        
        // 1. Wipe old data to prevent duplicate key errors
        await collection.deleteMany({});
        
        // 2. Insert the 8 planets your test cases are querying
        await collection.insertMany([
            { id: 1, name: 'Mercury' },
            { id: 2, name: 'Venus' },
            { id: 3, name: 'Earth' },
            { id: 4, name: 'Mars' },
            { id: 5, name: 'Jupiter' },
            { id: 6, name: 'Saturn' }, // Matches your .eql('Saturn') assertion
            { id: 7, name: 'Uranus' },
            { id: 8, name: 'Neptune' }
        ]);
        
        console.log("Dummy data successfully seeded into MongoDB Atlas.");
    });
    // -------------------------

    describe('Fetching Planet Details', () => {
        it('it should fetch a planet named Mercury', (done) => {
            let payload = {
                id: 1
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(1);
                    res.body.should.have.property('name').eql('Mercury');
                done();
              });
        });

        it('it should fetch a planet named Venus', (done) => {
            let payload = {
                id: 2
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(2);
                    res.body.should.have.property('name').eql('Venus');
                done();
              });
        });

        it('it should fetch a planet named Earth', (done) => {
            let payload = {
                id: 3
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(3);
                    res.body.should.have.property('name').eql('Earth');
                done();
              });
        });
        
        it('it should fetch a planet named Mars', (done) => {
            let payload = {
                id: 4
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(4);
                    res.body.should.have.property('name').eql('Mars');
                done();
              });
        });

        it('it should fetch a planet named Jupiter', (done) => {
            let payload = {
                id: 5
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(5);
                    res.body.should.have.property('name').eql('Jupiter');
                done();
              });
        });

        it('it should fetch a planet named Satrun', (done) => {
            let payload = {
                id: 6
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(6);
                    res.body.should.have.property('name').eql('Saturn');
                done();
              });
        });

        it('it should fetch a planet named Uranus', (done) => {
            let payload = {
                id: 7
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(7);
                    res.body.should.have.property('name').eql('Uranus');
                done();
              });
        });

        it('it should fetch a planet named Neptune', (done) => {
            let payload = {
                id: 8
            }
          chai.request(server)
              .post('/planet')
              .send(payload)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(8);
                    res.body.should.have.property('name').eql('Neptune');
                done();
              });
        });

    });        
});

//Use below test case to achieve coverage
describe('Testing Other Endpoints', () => {

    describe('it should fetch OS Details', () => {
        it('it should fetch OS details', (done) => {
          chai.request(server)
              .get('/os')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
    });

    describe('it should fetch Live Status', () => {
        it('it checks Liveness endpoint', (done) => {
          chai.request(server)
              .get('/live')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('live');
                done();
              });
        });
    });

    describe('it should fetch Ready Status', () => {
        it('it checks Readiness endpoint', (done) => {
          chai.request(server)
              .get('/ready')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('ready');
                done();
              });
        });
    });

    // --- NEW CLEANUP LOGIC ---
    // Ensures the pipeline runner shuts down cleanly
    after(async function() {
        await mongoose.disconnect();
        console.log("Database connection closed cleanly.");
    });
    // -------------------------
});