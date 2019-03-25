const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/user');

chai.use(chaiHttp);

let token;
let dummyUser;

describe('Endpoint testing for Users', function () {

  beforeEach(function (done) {
    let register = {
      name: 'dummy',
      email: 'dummy@mail.com',
      password: 'hello123'
    }
    User
      .create(register)
      .then((user) => {
        dummyUser = user;
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  afterEach(function (done) {
    User.deleteMany({}, (err) => {
      if (!err) {
        done();
      }
    });
  });

  describe('POST /register', function () {

    describe('on success', function () {

      it('should return an object with status code 201', function (done) {
        let newUser = {
          name: 'Arief',
          email: 'arrv@mail.com',
          password: 'mcd14045'
        }
        chai
          .request(app)
          .post('/register')
          .send(newUser)
          .end(function (err, response) {
            expect(err).to.be.null;
            expect(response).to.have.status(201);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('user');
            expect(response.body.user).to.have.property('_id');
            expect(response.body.user).to.have.property('name');
            expect(response.body.user).to.have.property('email');
            expect(response.body.user).to.have.property('password');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('You have successfully registered');
            done();
          });
      });

    });

    describe('on error', function () {

      it('should return error message name is required with status code 400', function (done) {
        let newUser = {
          name: '',
          email: 'arrv@mail.com',
          password: 'mcd14045'
        }
        chai
          .request(app)
          .post('/register')
          .send(newUser)
          .end(function (err, response) {
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('name');
            expect(response.body.name).to.equal('Name is required.');
            done();
          });
      });

      it('should return error message Email cannot be empty with status code 400', function (done) {
        let newUser = {
          name: 'Arief',
          email: '',
          password: 'mcd14045'
        }
        chai
          .request(app)
          .post('/register')
          .send(newUser)
          .end(function (err, response) {
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('email');
            expect(response.body.email).to.equal('Email is required.');
            done();
          });
      });

      it('should return error message Please provide a valid email address. with status code 400', function (done) {
        let newUser = {
          name: 'Arief',
          email: 'arrv',
          password: 'mcd14045'
        };
        chai
          .request(app)
          .post('/register')
          .send(newUser)
          .end(function (err, response) {
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('email');
            expect(response.body.email).to.equal('Please provide a valid email address.');
            done();
          });
      });

      it('should return error message Email is already exists. status code 400', function (done) {
        let newUser = {
          name: 'Arief',
          email: 'dummy@mail.com',
          password: 'mcd14045'
        };
        chai
          .request(app)
          .post('/register')
          .send(newUser)
          .end(function (err, response) {
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('email');
            expect(response.body.email).to.equal('Email is already exists.');
            done();
          });
      });

      it('should return error message Password is required. with status code 400', function (done) {
        let newUser = {
          name: 'Arief',
          email: 'arrv@mail.com',
          password: ''
        }
        chai
          .request(app)
          .post('/register')
          .send(newUser)
          .end(function (err, response) {
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('password');
            expect(response.body.password).to.equal('Password is required.');
            done();
          });
      });

      it('should return error message a password must be minimum 5 character with status code 400', function (done) {
        let newUser = {
          name: 'Arief',
          email: 'arrv@mail.com',
          password: '123'
        };
        chai
          .request(app)
          .post('/register')
          .send(newUser)
          .end(function (err, response) {
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('password');
            expect(response.body.password).to.equal('a password must be minimum 5 character.');
            done();
          });
      });

      it('should return error message a password should contain alphanumeric character with status code 400', function (done) {
        let newUser = {
          name: 'Arief',
          email: 'arrv@mail.com',
          password: '12345'
        };
        chai
          .request(app)
          .post('/register')
          .send(newUser)
          .end(function (err, response) {
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('password');
            expect(response.body.password).to.equal('a password should contain alphanumeric character.');
            done();
          });
      });

      it('should return error message Name, Email and Password cannot be empty. with status code 400', function (done) {
        let newUser = {
          name: '',
          email: '',
          password: ''
        }
        chai
          .request(app)
          .post('/register')
          .send(newUser)
          .end(function (err, response) {
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('Name, Email and Password cannot be empty.');
            done();
          });
      });

    });

  });

  describe('POST /login', function () {

    describe('on success', function () {

      it('should return an object of user logged in with token and status code 200', function (done) {
        // console.log(dummyUser.email, dummyUser.password);
        let userLogin = {
          email: 'dummy@mail.com',
          password: 'hello123'
        }
        chai
          .request(app)
          .post('/login')
          .send(userLogin)
          .end(function (err, response) {
            expect(err).to.be.null;
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('token');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('You have successfully logged in');
            token = response.body.token;
            done();
          });
      });

    });

    describe('on error', function () {

      it('should return error message Please provide a valid email and password with status code 404', function (done) {
        let userLogin = {
          email: '',
          password: 'hello123'
        }
        chai
          .request(app)
          .post('/login')
          .send(userLogin)
          .end(function (err, response) {
            expect(response).to.have.status(404);
            done();
          });
      });

      it('should return error message Please provide a valid email and password with status code 404', function (done) {
        let userLogin = {
          email: 'dummy@mail.com',
          password: ''
        }
        chai
          .request(app)
          .post('/login')
          .send(userLogin)
          .end(function (err, response) {
            expect(response).to.have.status(404);
            done();
          });
      });

    });

  });

  describe('GET /auth', function () {

    describe('on success', function () {

      it('should return an object of current user with status code 200', function (done) {
        let login = {
          email: 'dummy@mail.com',
          password: 'hello123'
        };
        chai
          .request(app)
          .get('/auth')
          .send(login)
          .set('token', token)
          .end(function (err, response) {
            expect(err).to.be.null;
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('object');
            done();
          });
      });

    });

    describe('on error', function () {

      it('should return error message You must login first. with status code 401', function (done) {
        let login = {
          email: 'dummy@mail.com',
          password: 'hello123'
        };
        chai
          .request(app)
          .get('/auth')
          .send(login)
          .end(function (err, response) {
            expect(response).to.have.status(401);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('You must login first.');
            done();
          });
      });

      it('should return error message jwt malformed / invalid token with status code 400', function (done) {
        let invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikfkdjhg89.eyJlbWFpbCI6ImR1bW15QG1haWwuY29tIiwiaWF0IjoxNTUyOTc1MTP8fQ.f6uafS8akE2Zei7zyKaAssi7GEOuvHCsdROtNAAvJ40'
        let login = {
          email: 'dummy@mail.com',
          password: 'hello123'
        };
        chai
          .request(app)
          .get('/auth')
          .send(login)
          .set('token', invalidToken)
          .end(function (err, response) {
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('message');
            done();
          });
      });

    });

  });

});