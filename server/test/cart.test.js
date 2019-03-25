const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

const Product = require('../models/product');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
let token;
let dummyProduct;


describe('Endpoint testing for Cart', function () {

  before(function (done) {
    let product_1 = {
      product_name: 'Lenovo Thinkpad T530',
      catalog: 'Lenovo',
      description: 'sample description',
      price: 250000,
      stock: 30
    };
    let product_2 = {
      product_name: 'iPhone X',
      catalog: 'iPhone',
      description: 'sample description',
      price: 1250000,
      stock: 20
    };
    let product_3 = {
      product_name: 'Asus ROG GL503GE',
      catalog: 'Asus',
      description: 'sample description',
      price: 1750000,
      stock: 0
    };
    Product.insertMany([product_1, product_2, product_3])
      .then(result => {
        dummyProduct = result
        done();
      })
      .catch(err => {
        console.log(err);
      })
  });

  before(function (done) {
    let tmpUser = {
      name: 'Arief',
      email: 'arrv@mail.com',
      password: 'mcd14045'
    };
    User
      .create(tmpUser)
      .then(user => {
        User.findOne({ email: user.email }).then(user => {
          let objUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password
          }
          token = jwt.sign(objUser, process.env.SECRET);
          done();
        });
      })
      .catch(err => {
        console.log(err);
      });
  });

  after(function (done) {
    Promise
      .all([
        Product.deleteMany({}),
        User.deleteMany({})
      ])
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
      })
  });

  describe('PATCH (add product to cart) /users/cart/:id', function () {

    describe('on success', function () {

      it('should return array of object 1st dummy product with status code 200', function (done) {
        let product = dummyProduct[0];
        let currentUser = {
          email: 'arrv@mail.com',
          password: 'mcd14045'
        };
        chai
          .request(app)
          .patch('/users/cart/' + product._id + '/add')
          .send(currentUser)
          .set('token', token)
          .end(function (err, response) {
            // console.log(response.body);
            expect(err).to.be.null;
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('array');
            expect(response.body[0]).to.have.property('_id');
            expect(response.body[0]).to.have.property('product_name');
            expect(response.body[0]).to.have.property('price');
            expect(response.body[0]).to.have.property('stock');
            expect(response.body[0].stock).to.equal(dummyProduct[0].stock - 1);
            done();
          });
      });

      it('should return array of object 1st and 2nd dummy product with status code 200', function (done) {
        let product = dummyProduct[1];
        let currentUser = {
          email: 'arrv@mail.com',
          password: 'mcd14045'
        };
        chai
          .request(app)
          .patch('/users/cart/' + product._id + '/add')
          .send(currentUser)
          .set('token', token)
          .end(function (err, response) {
            // console.log(response.body);
            expect(err).to.be.null;
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('array');
            expect(response.body[1]).to.have.property('_id');
            expect(response.body[1]).to.have.property('product_name');
            expect(response.body[1]).to.have.property('price');
            expect(response.body[1]).to.have.property('stock');
            expect(response.body[1].stock).to.equal(dummyProduct[1].stock - 1);
            done();
          });
      });

    });

    describe('on error', function () {

      it('should return error message Out of Stock with status code 400', function (done) {
        let product = dummyProduct[2];
        let currentUser = {
          email: 'arrv@mail.com',
          password: 'mcd14045'
        };
        chai
          .request(app)
          .patch('/users/cart/' + product._id + '/add')
          .send(currentUser)
          .set('token', token)
          .end(function (err, response) {
            // console.log(response.body)
            expect(response).to.have.status(400);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('Out of stock');
            done();
          });
      });

    });

  });

  describe('PATCH (remove product from cart) /users/cart/:id', function () {

    describe('on success', function () {

      it('should return array and remove the product with status code 200', function (done) {
        let productId = dummyProduct[0]._id;
        // console.log(productId);
        let currentUser = {
          email: 'arrv@mail.com',
          password: 'mcd14045'
        };
        chai
          .request(app)
          .patch('/users/cart/' + productId + '/remove')
          .send(currentUser)
          .set('token', token)
          .end(function (err, response) {
            // console.log(response.body);
            expect(err).to.be.null;
            expect(response).to.have.status(200);
            expect(response.body).to.be.an('array');
            done();
          });
      });

    });

  });

});